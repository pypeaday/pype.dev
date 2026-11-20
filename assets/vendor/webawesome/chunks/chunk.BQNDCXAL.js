/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Bundled license information:

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/import{e,i,t}from"./chunk.H23DVATU.js";import{T}from"./chunk.BKE5EYM3.js";var n="important",i2=" !"+n,o=e(class extends i{constructor(e){if(super(e),e.type!==t.ATTRIBUTE||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{const s=e[n];return s==null?t:t+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(e,[t]){const{style:s}=e.element;if(0[0]===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?s.removeProperty(e):s[e]=null);for(const o in t){const e=t[o];if(e!=null){this.ft.add(o);const t="string"==typeof e&&e.endsWith(i2);o.includes("-")||t?s.setProperty(o,t?e.slice(0,-11):e,t?n:""):s[o]=e}}return T}});export{o}