/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{breadcrumb_styles_default}from"./chunk.2UDUPMFW.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{WebAwesomeElement,e,n,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaBreadcrumb=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){const t=this.separatorSlot.assignedElements({flatten:!0})[0],e=t.cloneNode(!0);return[e,...e.querySelectorAll("[id]")].forEach(e=>e.removeAttribute("id")),e.setAttribute("data-default",""),e.slot="separator",e}handleSlotChange(){const e=[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>e.tagName.toLowerCase()==="wa-breadcrumb-item");e.forEach((t,n)=>{const s=t.querySelector('[slot="separator"]');s===null?t.append(this.getSeparator()):s.hasAttribute("data-default")&&s.replaceWith(this.getSeparator()),n===e.length-1?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),x`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <wa-icon
            name=${this.localize.dir()==="rtl"?"chevron-left":"chevron-right"}
            library="system"
            variant="solid"
          ></wa-icon>
        </slot>
      </span>
    `}};WaBreadcrumb.css=breadcrumb_styles_default,__decorateClass([e("slot")],WaBreadcrumb.prototype,"defaultSlot",2),__decorateClass([e('slot[name="separator"]')],WaBreadcrumb.prototype,"separatorSlot",2),__decorateClass([n()],WaBreadcrumb.prototype,"label",2),WaBreadcrumb=__decorateClass([t("wa-breadcrumb")],WaBreadcrumb);export{WaBreadcrumb}