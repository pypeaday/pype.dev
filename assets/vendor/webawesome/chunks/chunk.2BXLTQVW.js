/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Bundled license information:

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/import{e,i,t}from"./chunk.H23DVATU.js";import{E,T}from"./chunk.BKE5EYM3.js";var o,e2=class extends i{constructor(e){if(super(e),this.it=E,e.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===E||e==null)return this._t=0[0],this.it=e;if(e===T)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};e2.directiveName="unsafeHTML",e2.resultType=1,o=e(e2);export{o}