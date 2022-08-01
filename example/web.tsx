/** @jsxImportSource sigl */
import $ from 'sigl'

import { SpacerElement } from '../src'

const horiz = ['#040', '#004', '#505', '#770']
const vert = ['#040', '#004', '#505', '#770']

import { Rect } from 'sigl'
import { SurfaceElement, SurfaceItemElement, SurfaceMoveElement, SurfaceResizeElement } from 'x-surface'

interface ItemElement extends $.Element<ItemElement> {}

@$.element()
class ItemElement extends $(SurfaceItemElement) {
  SurfaceMove = $.element(SurfaceMoveElement)
  SurfaceResize = $.element(SurfaceResizeElement)
  Spacer = $.element(SpacerElement)
  mounted($: ItemElement['$']) {
    $.render(({ host, surface, Spacer, SurfaceMove, SurfaceResize }) => (
      <>
        <style>
          {/*css*/ `
          :host {
            box-sizing: border-box;
            border: 2px solid pink;
            display: block;
            position: absolute;
          }

          ${SurfaceMove} {
            background: #067;
            width: 100%;
            height: 20px;
            position: absolute;
          }

          ${SurfaceResize} {
            background: #ba2;
            position: absolute;
            right: 0;
            bottom: 0;
            width: 20px;
            height: 20px;
          }

          ${Spacer}::part(handle) {
            background: #0003;
          }

          div {
            display: flex;
            width: 100%;
            height: 100%;
          }
          `}
        </style>
        <SurfaceMove surface={surface} dest={host} />
        <SurfaceResize surface={surface} dest={host} />

        <Spacer vertical surface={surface}>
          <div style="background: #330">
            <Spacer surface={surface}>
              {horiz.map(x => <div style={'background:' + x}></div>)}
            </Spacer>
          </div>
          {vert.map(x => <div style={'background:' + x}></div>)}
        </Spacer>
      </>
    ))
  }
}

interface SceneElement extends $.Element<SceneElement> {}

@$.element()
class SceneElement extends HTMLElement {
  Surface = $.element(SurfaceElement)
  Item = $.element(ItemElement)

  items = new $.RefSet<ItemElement>([
    { rect: new Rect(0, 0, 500, 500) },
    { rect: new Rect(700, 0, 500, 500) },
  ])

  mounted($: SceneElement['$']) {
    $.render(({ Surface, Item, items }) => (
      <Surface>
        {items.map(item => <Item {...item} />)}
      </Surface>
    ))
  }
}

const Scene = $.element(SceneElement)

$.render(
  <>
    <style>
      {/*css*/ `
      ${Scene} {
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
      }
    `}
    </style>
    <Scene />
  </>,
  document.body
)
