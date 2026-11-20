/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Bundled license information:

@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/import{f,i,i2,o,u}from"./chunk.7OBLIRXR.js";import{__decorateClass,__privateAdd,__privateGet,__privateSet}from"./chunk.JHZRD2LV.js";var e,host_styles_default,_hasRecordedInitialProperties,WebAwesomeElement,t=e=>(t,n)=>{0[0]!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},o2={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f},r=(e=o2,t,n)=>{const{kind:s,metadata:i}=n;let o=globalThis.litPropertyMetadata.get(i);if(0[0]===o&&globalThis.litPropertyMetadata.set(i,o=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),"accessor"===s){const{name:s}=n;return{set(n){const o=t.get.call(this);t.set.call(this,n),this.requestUpdate(s,o,e)},init(t){return 0[0]!==t&&this.C(s,0[0],e,t),t}}}if("setter"===s){const{name:s}=n;return function(n){const o=this[s];t.call(this,n),this.requestUpdate(s,o,e)}}throw Error("Unsupported decorator location: "+s)};function n(e){return(t,n)=>"object"==typeof n?r(e,t,n):((e,t,n)=>{const s=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),s?Object.getOwnPropertyDescriptor(t,n):0[0]})(e,t,n)}function r2(e){return n({...e,state:!0,attribute:!1})}function t2(e){return(t,n)=>{const s="function"==typeof t?t:t[n];Object.assign(s,e)}}e=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,n),n);function e2(t,n){return(s,o,i)=>{const a=e=>e.renderRoot?.querySelector(t)??null;if(n){const{get:t,set:n}="object"==typeof o?s:i??(()=>{const e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return e(s,o,{get(){let e=t.call(this);return 0[0]===e&&(e=a(this),(null!==e||this.hasUpdated)&&n.call(this,e)),e}})}return e(s,o,{get(){return a(this)}})}}function r3(t){return(n,s)=>e(n,s,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(t)??null}})}host_styles_default=i`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,WebAwesomeElement=class extends i2{constructor(){super(),__privateAdd(this,_hasRecordedInitialProperties,!1),this.initialReflectedProperties=new Map,this.didSSR=o||Boolean(this.shadowRoot),this.customStates={set:(e,t)=>{if(!Boolean(this.internals?.states))return;try{t?this.internals.states.add(e):this.internals.states.delete(e)}catch(e){if(String(e).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw e}},has:e=>{if(!Boolean(this.internals?.states))return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[n,t]of e.elementProperties)t.default==="inherit"&&t.initial!==0[0]&&typeof n=="string"&&this.customStates.set(`initial-${n}-${t.initial}`,!0)}static get styles(){const e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[host_styles_default,...e]}connectedCallback(){super.connectedCallback(),o||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))}attributeChangedCallback(e,t,n){__privateGet(this,_hasRecordedInitialProperties)||(this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&this[t]!=null&&this.initialReflectedProperties.set(t,this[t])}),__privateSet(this,_hasRecordedInitialProperties,!0)),super.attributeChangedCallback(e,t,n)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,n)=>{e.has(n)&&this[n]==null&&(this[n]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(e){if(this.didSSR&&!this.hasUpdated){const t=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});t.error=e,this.dispatchEvent(t)}throw e}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}},_hasRecordedInitialProperties=new WeakMap,__decorateClass([n()],WebAwesomeElement.prototype,"dir",2),__decorateClass([n()],WebAwesomeElement.prototype,"lang",2),__decorateClass([n({type:Boolean,reflect:!0,attribute:"did-ssr"})],WebAwesomeElement.prototype,"didSSR",2);export{t,n,r2 as r,t2,e2 as e,r3 as r2,host_styles_default,WebAwesomeElement}