/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Bundled license information:

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/import{e,i,t}from"./chunk.H23DVATU.js";import{f,m}from"./chunk.T3OVPJUT.js";import{E,T}from"./chunk.BKE5EYM3.js";var l=e(class extends i{constructor(e){if(super(e),e.type!==t.PROPERTY&&e.type!==t.ATTRIBUTE&&e.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!f(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[n]){if(n===T||n===E)return n;const s=e.element,o=e.name;if(e.type===t.PROPERTY){if(n===s[o])return T}else if(e.type===t.BOOLEAN_ATTRIBUTE){if(!!n===s.hasAttribute(o))return T}else if(e.type===t.ATTRIBUTE&&s.getAttribute(o)===n+"")return T;return m(e),n}});export{l}