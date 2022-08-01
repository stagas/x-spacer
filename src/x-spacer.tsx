/** @jsxImportSource sigl */
import $ from 'sigl'

import { SurfaceCursorState, SurfaceElement, SurfaceState } from 'x-surface'

const css = /*css*/ `
:host {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

:host(:not([vertical])) {
  flex-flow: row nowrap;
  width: 100%;
}
:host([vertical]) {
  flex-flow: column nowrap;
  height: 100%;
}

::slotted(*) {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

[part=handle] {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

:host(:not([vertical])) [part=handle] {
  width: 11px;
  height: 100%;
  margin-left: -5.5px;
  cursor: col-resize;
}

:host([vertical]) [part=handle] {
  width: 100%;
  height: 11px;
  margin-top: -5.5px;
  cursor: row-resize;
}
`

export const SpacerState = {
  Idle: 'spaceridle',
  Resizing: 'spacerresizing',
}

export interface SpacerElement extends $.Element<SpacerElement> {}

const other = {
  width: 'height',
  height: 'width',
  maxWidth: 'maxHeight',
  maxHeight: 'maxWidth',
  top: 'left',
  left: 'top',
} as const

// TODO: this needs a rewrite because it was intended for different
// behavior than the one it ended up, so the code is a bit of a mess.

@$.element()
export class SpacerElement extends $.mix(HTMLElement, $.mixins.observed()) {
  root = $(this).shadow()

  @$.attr() state = $(this).state(SpacerState)
  @$.attr() vertical = false

  reverseOnOrientationChange = false

  sizes: number[] = []
  @$.out() pcts: number[] = []

  items = $(this).slotted.elements() as HTMLElement[]
  surface?: SurfaceElement

  position: 'top' | 'left' = $(this).reduce(({ vertical }) => vertical ? 'top' : 'left')
  dim: 'height' | 'width' = $(this).reduce(({ vertical }) => vertical ? 'height' : 'width')
  maxDim: 'maxHeight' | 'maxWidth' = $(this).reduce(({ vertical }) => vertical ? 'maxHeight' : 'maxWidth')

  resizeItems = $(this).reduce(({ $, root }) =>
    $.callback(({ sizes, pcts, dim, maxDim, position, items, size }) =>
      (update = true, maximize = false, refit = false) => {
        if (!items) return

        const ownSize = size[dim]
        const handles = root.querySelectorAll<HTMLElement>(/*css*/ `[part=handle]`)

        let sum = 0

        if (update || refit) {
          let pct = 100 / items.length
          for (const [i, el] of items.entries()) {
            if (pcts[i] != null) {
              pct = Math.max(0, Math.min(100, pcts[i]))
            } else {
              pcts[i] = pct
            }
            // if (sizes[i] != null) {
            //   const elSize = Math.max(0, sizes[i])
            //   sum += elSize
            //   pct = pcts[i] = (elSize / ownSize) * 100
            // }

            // try to fit, not perfect but good enough
            if (!el.style[dim] || refit) {
              el.style[maxDim] = el.style[dim] = pct + '%'
              el.style[other[maxDim]] = el.style[other[dim]] = '100%'
            }
          }
        }

        sum = 0

        for (const [i, el] of items.entries()) {
          // if (update || sizes[i] == null) {
          //   sizes[i] = $.Rect.fromElement(el)[dim]
          //   console.log(i, sizes[i])
          // }
          if (update || sizes[i] == null) {
            sizes[i] = (pcts[i] / 100) * ownSize
          }

          const elSize = sizes[i]
          sum += elSize

          if (maximize) {
            const elPct = (elSize / ownSize) * 100
            el.style[maxDim] = el.style[dim] = elPct + '%'
            el.style[other[maxDim]] = el.style[other[dim]] = '100%'
            pcts[i] = elPct
          }

          if (handles[i]) {
            // 1  0.5
            //    99.5

            //  1 0.5
            //    98.5
            //  2 1.5
            //    99.5

            //  1 0.5
            //    97.5
            //  2 1.5
            //    98.5
            //  3 2.5
            //    97.5

            // we don't want the handles overlapping so we scale them differently
            const handleSize = (sum / ownSize) * (100 - (items.length - 1))
            handles[i].style[position] = ((handleSize + i) + 0.5) + '%'
            handles[i].style[other[position]] = '0'
          }
        }
      }
    )
  )

  resizeTo = $(this).reduce(({ sizes, resizeItems }) =>
    (index: number, size: number) => {
      let diff = sizes[index] - size

      if (diff > 0 && diff > sizes[index]) {
        diff = sizes[index]
      }

      if (diff < 0 && Math.abs(diff) > sizes[index + 1]) {
        diff = -sizes[index + 1]
      }

      if (sizes[index] >= diff + 0) {
        sizes[index] -= diff
        sizes[index + 1] += diff
      }

      resizeItems(false, true)

      return true
    }
  )

  handleDown = $(this).reduce(({ $, host, sizes, surface, vertical, size, position, dim, resizeTo }) =>
    (e: PointerEvent, index: number) => {
      if (
        !$.state.isIdle || (!surface.state.isIdle && !surface.state.is(SurfaceState.FullSize))
        || !surface.cursorState.isIdle
      )
        return

      const isFullSize = surface.state.is(SurfaceState.FullSize)

      $.state.push(SpacerState.Resizing)
      if (!isFullSize) {
        surface.state.push(SurfaceState.Overlay)
      }
      surface.cursorState.push(SurfaceCursorState[`${vertical ? 'NS' : 'EW'}Resize`])

      const sumRest: number = sizes.slice(0, index).reduce((p, n) => p + n, 0)
      let currSize = sumRest + sizes[index]

      const pageAxis = vertical ? 'pageY' : 'pageX'
      const rect = host.getBoundingClientRect()
      const offset = rect[position]
      let prev = e[pageAxis] - offset

      const moveHandler = (e: PointerEvent) => {
        const pos = e[pageAxis] - offset
        const diff = (prev - pos) / (isFullSize ? 1 : surface.matrix.a)
        const newSize = Math.max(0, Math.min(size[dim], currSize - diff))
        if (newSize - sumRest != sizes[index]) {
          if (resizeTo(index, newSize - sumRest)) {
            prev = Math.max(0, Math.min(rect[dim], pos))
            currSize = newSize
          }
        }
      }

      const off = $.on(window).pointermove.capture.prevent.stop(moveHandler)
      $.on(window).pointerup.once.capture.prevent.stop(() => {
        off()
        $.state.pop(SpacerState.Resizing)
        if (!isFullSize) {
          surface.state.pop(SurfaceState.Overlay)
        } else {
          surface.cursorState.pop(surface.cursorState.current)
        }
      })
    }
  )

  mounted($: SpacerElement['$']) {
    $.effect.raf(({ vertical: _, resizeItems, reverseOnOrientationChange }) => {
      // heuristic so it doesn't refit on the initial 'vertical' assignment
      if ($.sizes.length) {
        if (reverseOnOrientationChange) {
          $.pcts = $.pcts.reverse()
          $.sizes = $.sizes.reverse()
        }
        resizeItems(true, false, true)
      }
    })

    $.effect.raf(({ items: _0, size: _1, resizeItems }) => {
      resizeItems()
    })

    const Handles = $.part(({ items, handleDown }) =>
      Array.from({ length: items.length - 1 }).map((_, i) => (
        <div
          key={i}
          part="handle"
          onpointerdown={$.event.prevent.stop(e => handleDown(e, i))}
        >
        </div>
      ))
    )

    $.render(() => (
      <>
        <style>{css}</style>

        <slot></slot>

        <Handles />
      </>
    ))
  }
}
