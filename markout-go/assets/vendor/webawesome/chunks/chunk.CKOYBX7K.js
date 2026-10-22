/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{WaRemoveEvent}from"./chunk.HPULLNVR.js";import{tag_styles_default}from"./chunk.DNBJR3U4.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{variants_styles_default}from"./chunk.UVLZVEH2.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{WebAwesomeElement,n,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaTag=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.variant="neutral",this.appearance="filled-outlined",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new WaRemoveEvent)}render(){return x`
      <slot part="content" class="content"></slot>

      ${this.withRemove?x`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};WaTag.css=[tag_styles_default,variants_styles_default,size_styles_default],__decorateClass([n({reflect:!0})],WaTag.prototype,"variant",2),__decorateClass([n({reflect:!0})],WaTag.prototype,"appearance",2),__decorateClass([n({reflect:!0})],WaTag.prototype,"size",2),__decorateClass([n({type:Boolean,reflect:!0})],WaTag.prototype,"pill",2),__decorateClass([n({attribute:"with-remove",type:Boolean})],WaTag.prototype,"withRemove",2),WaTag=__decorateClass([t("wa-tag")],WaTag);export{WaTag}