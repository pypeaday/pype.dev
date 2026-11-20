/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{button_group_styles_default}from"./chunk.IYHS4N4A.js";import{WebAwesomeElement,e,n,r,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaButtonGroup=class extends WebAwesomeElement{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal"}updated(e){super.updated(e),e.has("orientation")&&this.setAttribute("aria-orientation",this.orientation)}handleFocus(e){const t=findButton(e.target);t?.classList.add("button-focus")}handleBlur(e){const t=findButton(e.target);t?.classList.remove("button-focus")}handleMouseOver(e){const t=findButton(e.target);t?.classList.add("button-hover")}handleMouseOut(e){const t=findButton(e.target);t?.classList.remove("button-hover")}render(){return x`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      ></slot>
    `}};WaButtonGroup.css=[button_group_styles_default],__decorateClass([e("slot")],WaButtonGroup.prototype,"defaultSlot",2),__decorateClass([r()],WaButtonGroup.prototype,"disableRole",2),__decorateClass([r()],WaButtonGroup.prototype,"hasOutlined",2),__decorateClass([n()],WaButtonGroup.prototype,"label",2),__decorateClass([n({reflect:!0})],WaButtonGroup.prototype,"orientation",2),WaButtonGroup=__decorateClass([t("wa-button-group")],WaButtonGroup);function findButton(e){const t="wa-button, wa-radio-button";return e.closest(t)??e.querySelector(t)}export{WaButtonGroup}