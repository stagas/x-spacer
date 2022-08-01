<h1>
x-spacer <a href="https://npmjs.org/package/x-spacer"><img src="https://img.shields.io/badge/npm-v1.0.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-203-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/x-spacer@1.0.0/dist/x-spacer.min.js"><img src="https://img.shields.io/badge/brotli-22.4K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

custom element horizontal/vertical resizable spacer of arbitrary number of children

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i x-spacer </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add x-spacer </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add x-spacer</code>
</td></tr></table>
</h4>

## Examples

<details id="example$web" title="web" open><summary><span><a href="#example$web">#</a></span>  <code><strong>web</strong></code></summary>  <ul>    <details id="source$web" title="web source code" ><summary><span><a href="#source$web">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/web.tsx">example/web.tsx</a>  <p>

```tsx
/** @jsxImportSource sigl */
import $ from 'sigl'

import { SpacerElement } from 'x-spacer'

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
        {items.map(item => <Item {x-spacer.item} />)}
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
```

</p>
</details></ul></details>

## API

<p>  <details id="SpacerElement$5" title="Class" open><summary><span><a href="#SpacerElement$5">#</a></span>  <code><strong>SpacerElement</strong></code>    </summary>  <a href="src/x-spacer.tsx#L72">src/x-spacer.tsx#L72</a>  <ul>        <p>  <details id="constructor$25" title="Constructor" ><summary><span><a href="#constructor$25">#</a></span>  <code><strong>constructor</strong></code><em>(args)</em>    </summary>    <ul>    <p>  <details id="new SpacerElement$26" title="ConstructorSignature" ><summary><span><a href="#new SpacerElement$26">#</a></span>  <code><strong>new SpacerElement</strong></code><em>()</em>    </summary>    <ul><p><a href="#SpacerElement$5">SpacerElement</a></p>      <p>  <details id="args$27" title="Parameter" ><summary><span><a href="#args$27">#</a></span>  <code><strong>args</strong></code>    </summary>    <ul><p>any  []</p>        </ul></details></p>  </ul></details></p>    </ul></details><details id="$$106" title="Property" ><summary><span><a href="#$$106">#</a></span>  <code><strong>$</strong></code>    </summary>  <a href="src/sigl/dist/types/sigl.d.ts#L25">src/sigl/dist/types/sigl.d.ts#L25</a>  <ul><p><span>Context</span>&lt;<a href="#SpacerElement$5">SpacerElement</a> &amp; <span>JsxContext</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>&gt; &amp; <span>Omit</span>&lt;{<p>    <details id="ctor$110" title="Parameter" ><summary><span><a href="#ctor$110">#</a></span>  <code><strong>ctor</strong></code>    </summary>    <ul><p><span>Class</span>&lt;<a href="#T$60">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctor)</em>  &nbsp;=&gt;  <ul><span>CleanClass</span>&lt;<a href="#T$60">T</a>&gt;</ul></p>  <details id="ctx$125" title="Parameter" ><summary><span><a href="#ctx$125">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><a href="#T$75">T</a> | <span>Class</span>&lt;<a href="#T$75">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctx)</em>  &nbsp;=&gt;  <ul><span>Wrapper</span>&lt;<a href="#T$75">T</a>&gt;</ul></p></p>} &amp; <span>__module</span> &amp; {<p>  <details id="Boolean$129" title="Property" ><summary><span><a href="#Boolean$129">#</a></span>  <code><strong>Boolean</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L9">src/sigl/dist/types/index.d.ts#L9</a>  <ul><p>undefined | boolean</p>        </ul></details><details id="Number$128" title="Property" ><summary><span><a href="#Number$128">#</a></span>  <code><strong>Number</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L8">src/sigl/dist/types/index.d.ts#L8</a>  <ul><p>undefined | number</p>        </ul></details><details id="String$127" title="Property" ><summary><span><a href="#String$127">#</a></span>  <code><strong>String</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L7">src/sigl/dist/types/index.d.ts#L7</a>  <ul><p>undefined | string</p>        </ul></details></p>}, <code>"transition"</code>&gt;&gt;</p>        </ul></details><details id="__#2@#offsetHeight$84" title="Property" ><summary><span><a href="#__#2@#offsetHeight$84">#</a></span>  <code><strong>__#2@#offsetHeight</strong></code>    </summary>  <a href="src/sigl/dist/types/mixins/observed.d.ts#L6">src/sigl/dist/types/mixins/observed.d.ts#L6</a>  <ul><p>number</p>        </ul></details><details id="__#2@#offsetLeft$81" title="Property" ><summary><span><a href="#__#2@#offsetLeft$81">#</a></span>  <code><strong>__#2@#offsetLeft</strong></code>    </summary>  <a href="src/sigl/dist/types/mixins/observed.d.ts#L3">src/sigl/dist/types/mixins/observed.d.ts#L3</a>  <ul><p>number</p>        </ul></details><details id="__#2@#offsetTop$82" title="Property" ><summary><span><a href="#__#2@#offsetTop$82">#</a></span>  <code><strong>__#2@#offsetTop</strong></code>    </summary>  <a href="src/sigl/dist/types/mixins/observed.d.ts#L4">src/sigl/dist/types/mixins/observed.d.ts#L4</a>  <ul><p>number</p>        </ul></details><details id="__#2@#offsetWidth$83" title="Property" ><summary><span><a href="#__#2@#offsetWidth$83">#</a></span>  <code><strong>__#2@#offsetWidth</strong></code>    </summary>  <a href="src/sigl/dist/types/mixins/observed.d.ts#L5">src/sigl/dist/types/mixins/observed.d.ts#L5</a>  <ul><p>number</p>        </ul></details><details id="context$130" title="Property" ><summary><span><a href="#context$130">#</a></span>  <code><strong>context</strong></code>    </summary>  <a href="src/sigl/dist/types/sigl.d.ts#L26">src/sigl/dist/types/sigl.d.ts#L26</a>  <ul><p><span>ContextClass</span>&lt;<a href="#SpacerElement$5">SpacerElement</a> &amp; <span>JsxContext</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>&gt; &amp; <span>Omit</span>&lt;{<p>    <details id="ctor$134" title="Parameter" ><summary><span><a href="#ctor$134">#</a></span>  <code><strong>ctor</strong></code>    </summary>    <ul><p><span>Class</span>&lt;<a href="#T$60">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctor)</em>  &nbsp;=&gt;  <ul><span>CleanClass</span>&lt;<a href="#T$60">T</a>&gt;</ul></p>  <details id="ctx$149" title="Parameter" ><summary><span><a href="#ctx$149">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><a href="#T$75">T</a> | <span>Class</span>&lt;<a href="#T$75">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctx)</em>  &nbsp;=&gt;  <ul><span>Wrapper</span>&lt;<a href="#T$75">T</a>&gt;</ul></p></p>} &amp; <span>__module</span> &amp; {<p>  <details id="Boolean$153" title="Property" ><summary><span><a href="#Boolean$153">#</a></span>  <code><strong>Boolean</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L9">src/sigl/dist/types/index.d.ts#L9</a>  <ul><p>undefined | boolean</p>        </ul></details><details id="Number$152" title="Property" ><summary><span><a href="#Number$152">#</a></span>  <code><strong>Number</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L8">src/sigl/dist/types/index.d.ts#L8</a>  <ul><p>undefined | number</p>        </ul></details><details id="String$151" title="Property" ><summary><span><a href="#String$151">#</a></span>  <code><strong>String</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L7">src/sigl/dist/types/index.d.ts#L7</a>  <ul><p>undefined | string</p>        </ul></details></p>}, <code>"transition"</code>&gt;&gt;</p>        </ul></details><details id="dim$42" title="Property" ><summary><span><a href="#dim$42">#</a></span>  <code><strong>dim</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L87">src/x-spacer.tsx#L87</a>  <ul><p><code>"height"</code> | <code>"width"</code></p>        </ul></details><details id="dispatch$91" title="Property" ><summary><span><a href="#dispatch$91">#</a></span>  <code><strong>dispatch</strong></code>    </summary>  <a href="src/sigl/dist/types/events.d.ts#L4">src/sigl/dist/types/events.d.ts#L4</a>  <ul><p><span>Dispatch</span>&lt;<details id="__type$92" title="Function" ><summary><span><a href="#__type$92">#</a></span>  <em>(name, detail, init)</em>    </summary>    <ul>    <p>    <details id="name$96" title="Parameter" ><summary><span><a href="#name$96">#</a></span>  <code><strong>name</strong></code>    </summary>    <ul><p><span>Event</span> | <span>Narrow</span>&lt;<a href="#K$94">K</a>, string&gt;</p>        </ul></details><details id="detail$97" title="Parameter" ><summary><span><a href="#detail$97">#</a></span>  <code><strong>detail</strong></code>    </summary>    <ul><p><a href="#E$95">E</a></p>        </ul></details><details id="init$98" title="Parameter" ><summary><span><a href="#init$98">#</a></span>  <code><strong>init</strong></code>    </summary>    <ul><p><span>CustomEventInit</span>&lt;any&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>K</span>, <span>E</span>&gt;<em>(name, detail, init)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details>&gt;</p>        </ul></details><details id="handleDown$50" title="Property" ><summary><span><a href="#handleDown$50">#</a></span>  <code><strong>handleDown</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L192">src/x-spacer.tsx#L192</a>  <ul><p><details id="__type$51" title="Function" ><summary><span><a href="#__type$51">#</a></span>  <em>(e, index)</em>    </summary>    <ul>    <p>    <details id="e$53" title="Parameter" ><summary><span><a href="#e$53">#</a></span>  <code><strong>e</strong></code>    </summary>    <ul><p><span>PointerEvent</span></p>        </ul></details><details id="index$54" title="Parameter" ><summary><span><a href="#index$54">#</a></span>  <code><strong>index</strong></code>    </summary>    <ul><p>number</p>        </ul></details>  <p><strong></strong><em>(e, index)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p>        </ul></details><details id="host$105" title="Property" ><summary><span><a href="#host$105">#</a></span>  <code><strong>host</strong></code>    </summary>  <a href="src/sigl/dist/types/sigl.d.ts#L24">src/sigl/dist/types/sigl.d.ts#L24</a>  <ul><p><a href="#SpacerElement$5">SpacerElement</a></p>        </ul></details><details id="items$39" title="Property" ><summary><span><a href="#items$39">#</a></span>  <code><strong>items</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L83">src/x-spacer.tsx#L83</a>  <ul><p><span>HTMLElement</span>  []</p>        </ul></details><details id="maxDim$43" title="Property" ><summary><span><a href="#maxDim$43">#</a></span>  <code><strong>maxDim</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L88">src/x-spacer.tsx#L88</a>  <ul><p><code>"maxHeight"</code> | <code>"maxWidth"</code></p>        </ul></details><details id="onmounted$103" title="Property" ><summary><span><a href="#onmounted$103">#</a></span>  <code><strong>onmounted</strong></code>    </summary>    <ul><p><span>EventHandler</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>, <span>CustomEvent</span>&lt;any&gt;&gt;</p>        </ul></details><details id="onunmounted$104" title="Property" ><summary><span><a href="#onunmounted$104">#</a></span>  <code><strong>onunmounted</strong></code>    </summary>    <ul><p><span>EventHandler</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>, <span>CustomEvent</span>&lt;any&gt;&gt;</p>        </ul></details><details id="ownRect$90" title="Property" ><summary><span><a href="#ownRect$90">#</a></span>  <code><strong>ownRect</strong></code>    </summary>  <a href="src/sigl/dist/types/mixins/observed.d.ts#L15">src/sigl/dist/types/mixins/observed.d.ts#L15</a>  <ul><p><span>Rect</span></p>        </ul></details><details id="pcts$38" title="Property" ><summary><span><a href="#pcts$38">#</a></span>  <code><strong>pcts</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>[]</code></span>  </summary>  <a href="src/x-spacer.tsx#L81">src/x-spacer.tsx#L81</a>  <ul><p>number  []</p>        </ul></details><details id="pos$88" title="Property" ><summary><span><a href="#pos$88">#</a></span>  <code><strong>pos</strong></code>    </summary>  <a href="src/sigl/dist/types/mixins/observed.d.ts#L13">src/sigl/dist/types/mixins/observed.d.ts#L13</a>  <ul><p><span>Point</span></p>        </ul></details><details id="position$41" title="Property" ><summary><span><a href="#position$41">#</a></span>  <code><strong>position</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L86">src/x-spacer.tsx#L86</a>  <ul><p><code>"top"</code> | <code>"left"</code></p>        </ul></details><details id="rect$87" title="Property" ><summary><span><a href="#rect$87">#</a></span>  <code><strong>rect</strong></code>    </summary>  <a href="src/sigl/dist/types/mixins/observed.d.ts#L12">src/sigl/dist/types/mixins/observed.d.ts#L12</a>  <ul><p><span>Rect</span></p>        </ul></details><details id="resizeItems$44" title="Property" ><summary><span><a href="#resizeItems$44">#</a></span>  <code><strong>resizeItems</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L90">src/x-spacer.tsx#L90</a>  <ul><p><span>Fn</span>&lt;[  named-tuple-member, named-tuple-member, named-tuple-member  ], void&gt;</p>        </ul></details><details id="resizeTo$45" title="Property" ><summary><span><a href="#resizeTo$45">#</a></span>  <code><strong>resizeTo</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L169">src/x-spacer.tsx#L169</a>  <ul><p><details id="__type$46" title="Function" ><summary><span><a href="#__type$46">#</a></span>  <em>(index, size)</em>    </summary>    <ul>    <p>    <details id="index$48" title="Parameter" ><summary><span><a href="#index$48">#</a></span>  <code><strong>index</strong></code>    </summary>    <ul><p>number</p>        </ul></details><details id="size$49" title="Parameter" ><summary><span><a href="#size$49">#</a></span>  <code><strong>size</strong></code>    </summary>    <ul><p>number</p>        </ul></details>  <p><strong></strong><em>(index, size)</em>  &nbsp;=&gt;  <ul><code>true</code></ul></p></p>    </ul></details></p>        </ul></details><details id="reverseOnOrientationChange$36" title="Property" ><summary><span><a href="#reverseOnOrientationChange$36">#</a></span>  <code><strong>reverseOnOrientationChange</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>  </summary>  <a href="src/x-spacer.tsx#L78">src/x-spacer.tsx#L78</a>  <ul><p>boolean</p>        </ul></details><details id="root$28" title="Property" ><summary><span><a href="#root$28">#</a></span>  <code><strong>root</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L73">src/x-spacer.tsx#L73</a>  <ul><p><span>ShadowRoot</span></p>        </ul></details><details id="size$89" title="Property" ><summary><span><a href="#size$89">#</a></span>  <code><strong>size</strong></code>    </summary>  <a href="src/sigl/dist/types/mixins/observed.d.ts#L14">src/sigl/dist/types/mixins/observed.d.ts#L14</a>  <ul><p><span>Point</span></p>        </ul></details><details id="sizes$37" title="Property" ><summary><span><a href="#sizes$37">#</a></span>  <code><strong>sizes</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>[]</code></span>  </summary>  <a href="src/x-spacer.tsx#L80">src/x-spacer.tsx#L80</a>  <ul><p>number  []</p>        </ul></details><details id="state$29" title="Property" ><summary><span><a href="#state$29">#</a></span>  <code><strong>state</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L75">src/x-spacer.tsx#L75</a>  <ul><p><span>State</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>, {<p>  <details id="Idle$31" title="Property" ><summary><span><a href="#Idle$31">#</a></span>  <code><strong>Idle</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'spaceridle'</code></span>  </summary>    <ul><p>string</p>        </ul></details><details id="Resizing$32" title="Property" ><summary><span><a href="#Resizing$32">#</a></span>  <code><strong>Resizing</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'spacerresizing'</code></span>  </summary>    <ul><p>string</p>        </ul></details></p>}, string&gt; &amp; <span>EventMethods</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>, {}&gt; &amp; <span>InlineEventMap</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>, {}&gt;</p>        </ul></details><details id="surface$40" title="Property" ><summary><span><a href="#surface$40">#</a></span>  <code><strong>surface</strong></code>    </summary>  <a href="src/x-spacer.tsx#L84">src/x-spacer.tsx#L84</a>  <ul><p><span>SurfaceElement</span></p>        </ul></details><details id="vertical$35" title="Property" ><summary><span><a href="#vertical$35">#</a></span>  <code><strong>vertical</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>  </summary>  <a href="src/x-spacer.tsx#L76">src/x-spacer.tsx#L76</a>  <ul><p>boolean</p>        </ul></details><details id="__#2@#updateOffsets$85" title="Method" ><summary><span><a href="#__#2@#updateOffsets$85">#</a></span>  <code><strong>__#2@#updateOffsets</strong></code><em>()</em>    </summary>    <ul>    <p>      <p><strong>__#2@#updateOffsets</strong><em>()</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="created$154" title="Method" ><summary><span><a href="#created$154">#</a></span>  <code><strong>created</strong></code><em>(ctx)</em>    </summary>    <ul>    <p>    <details id="ctx$156" title="Parameter" ><summary><span><a href="#ctx$156">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><span>Context</span>&lt;<a href="#SpacerElement$5">SpacerElement</a> &amp; <span>JsxContext</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>&gt; &amp; <span>Omit</span>&lt;{<p>    <details id="ctor$160" title="Parameter" ><summary><span><a href="#ctor$160">#</a></span>  <code><strong>ctor</strong></code>    </summary>    <ul><p><span>Class</span>&lt;<a href="#T$60">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctor)</em>  &nbsp;=&gt;  <ul><span>CleanClass</span>&lt;<a href="#T$60">T</a>&gt;</ul></p>  <details id="ctx$175" title="Parameter" ><summary><span><a href="#ctx$175">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><a href="#T$75">T</a> | <span>Class</span>&lt;<a href="#T$75">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctx)</em>  &nbsp;=&gt;  <ul><span>Wrapper</span>&lt;<a href="#T$75">T</a>&gt;</ul></p></p>} &amp; <span>__module</span> &amp; {<p>  <details id="Boolean$179" title="Property" ><summary><span><a href="#Boolean$179">#</a></span>  <code><strong>Boolean</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L9">src/sigl/dist/types/index.d.ts#L9</a>  <ul><p>undefined | boolean</p>        </ul></details><details id="Number$178" title="Property" ><summary><span><a href="#Number$178">#</a></span>  <code><strong>Number</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L8">src/sigl/dist/types/index.d.ts#L8</a>  <ul><p>undefined | number</p>        </ul></details><details id="String$177" title="Property" ><summary><span><a href="#String$177">#</a></span>  <code><strong>String</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L7">src/sigl/dist/types/index.d.ts#L7</a>  <ul><p>undefined | string</p>        </ul></details></p>}, <code>"transition"</code>&gt;&gt;</p>        </ul></details>  <p><strong>created</strong><em>(ctx)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="mounted$55" title="Method" ><summary><span><a href="#mounted$55">#</a></span>  <code><strong>mounted</strong></code><em>($)</em>    </summary>  <a href="src/x-spacer.tsx#L241">src/x-spacer.tsx#L241</a>  <ul>    <p>    <details id="$$57" title="Parameter" ><summary><span><a href="#$$57">#</a></span>  <code><strong>$</strong></code>    </summary>    <ul><p><span>Context</span>&lt;<a href="#SpacerElement$5">SpacerElement</a> &amp; <span>JsxContext</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>&gt; &amp; <span>Omit</span>&lt;{<p>    <details id="ctor$61" title="Parameter" ><summary><span><a href="#ctor$61">#</a></span>  <code><strong>ctor</strong></code>    </summary>    <ul><p><span>Class</span>&lt;<a href="#T$60">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctor)</em>  &nbsp;=&gt;  <ul><span>CleanClass</span>&lt;<a href="#T$60">T</a>&gt;</ul></p>  <details id="ctx$76" title="Parameter" ><summary><span><a href="#ctx$76">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><a href="#T$75">T</a> | <span>Class</span>&lt;<a href="#T$75">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctx)</em>  &nbsp;=&gt;  <ul><span>Wrapper</span>&lt;<a href="#T$75">T</a>&gt;</ul></p></p>} &amp; <span>__module</span> &amp; {<p>  <details id="Boolean$80" title="Property" ><summary><span><a href="#Boolean$80">#</a></span>  <code><strong>Boolean</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L9">src/sigl/dist/types/index.d.ts#L9</a>  <ul><p>undefined | boolean</p>        </ul></details><details id="Number$79" title="Property" ><summary><span><a href="#Number$79">#</a></span>  <code><strong>Number</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L8">src/sigl/dist/types/index.d.ts#L8</a>  <ul><p>undefined | number</p>        </ul></details><details id="String$78" title="Property" ><summary><span><a href="#String$78">#</a></span>  <code><strong>String</strong></code>    </summary>  <a href="src/sigl/dist/types/index.d.ts#L7">src/sigl/dist/types/index.d.ts#L7</a>  <ul><p>undefined | string</p>        </ul></details></p>}, <code>"transition"</code>&gt;&gt;</p>        </ul></details>  <p><strong>mounted</strong><em>($)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="on$99" title="Method" ><summary><span><a href="#on$99">#</a></span>  <code><strong>on</strong></code><em>(name)</em>    </summary>    <ul>    <p>    <details id="name$102" title="Parameter" ><summary><span><a href="#name$102">#</a></span>  <code><strong>name</strong></code>    </summary>    <ul><p><a href="#K$101">K</a></p>        </ul></details>  <p><strong>on</strong>&lt;<span>K</span>&gt;<em>(name)</em>  &nbsp;=&gt;  <ul><span>On</span>&lt;<span>Fn</span>&lt;[  <span>EventHandler</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>, <span>LifecycleEvents</span> &amp; object  [<a href="#K$101">K</a>]&gt;  ], <span>Off</span>&gt;&gt;</ul></p></p>    </ul></details><details id="toJSON$180" title="Method" ><summary><span><a href="#toJSON$180">#</a></span>  <code><strong>toJSON</strong></code><em>()</em>    </summary>    <ul>    <p>      <p><strong>toJSON</strong><em>()</em>  &nbsp;=&gt;  <ul><span>Pick</span>&lt;<a href="#SpacerElement$5">SpacerElement</a>, keyof     <a href="#SpacerElement$5">SpacerElement</a>&gt;</ul></p></p>    </ul></details></p></ul></details><details id="SpacerState$1" title="Variable" open><summary><span><a href="#SpacerState$1">#</a></span>  <code><strong>SpacerState</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-spacer.tsx#L52">src/x-spacer.tsx#L52</a>  <ul><p>{<p>  <details id="Idle$3" title="Property" ><summary><span><a href="#Idle$3">#</a></span>  <code><strong>Idle</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'spaceridle'</code></span>  </summary>    <ul><p>string</p>        </ul></details><details id="Resizing$4" title="Property" ><summary><span><a href="#Resizing$4">#</a></span>  <code><strong>Resizing</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'spacerresizing'</code></span>  </summary>    <ul><p>string</p>        </ul></details></p>}</p>        </ul></details></p>

## Credits

- [sigl](https://npmjs.org/package/sigl) by [stagas](https://github.com/stagas) &ndash; Web framework
- [x-surface](https://npmjs.org/package/x-surface) by [stagas](https://github.com/stagas) &ndash; Infinitely pannable and zoomable HTML surface as a Web Component.

## Contributing

[Fork](https://github.com/stagas/x-spacer/fork) or [edit](https://github.dev/stagas/x-spacer) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
