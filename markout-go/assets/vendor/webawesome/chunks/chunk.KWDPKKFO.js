/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Bundled license information:

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/import{e,i,t}from"./chunk.H23DVATU.js";import{T}from"./chunk.BKE5EYM3.js";var e2=e(class extends i{constructor(e){if(super(e),e.type!==t.ATTRIBUTE||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(0[0]===this.st){this.st=new Set,0[0]!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const n=e.element.classList;for(const e of this.st)e in t||(n.remove(e),this.st.delete(e));for(const e in t){const s=!!t[e];s===this.st.has(e)||this.nt?.has(e)||(s?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return T}});export{e2 as e}