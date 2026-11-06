/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{drag}from"./chunk.WYNTFJHW.js";import{comparison_styles_default}from"./chunk.3V4ARLUJ.js";import{clamp}from"./chunk.O6IZ4I7T.js";import{o}from"./chunk.BQNDCXAL.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{WebAwesomeElement,e,n,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaComparison=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.position=50}handleDrag(e){const{width:t}=this.getBoundingClientRect(),n=this.localize.dir()==="rtl";e.preventDefault(),drag(this,{onMove:e=>{this.customStates.set("dragging",!0),this.position=parseFloat(clamp(e/t*100,0,100).toFixed(2)),n&&(this.position=100-this.position)},onStop:()=>{this.customStates.set("dragging",!1)},initialEvent:e})}handleKeyDown(e){const t=this.matches(":dir(ltr)"),n=this.localize.dir()==="rtl";if(["ArrowLeft","ArrowRight","Home","End"].includes(e.key)){const o=e.shiftKey?10:1;let s=this.position;e.preventDefault(),(t&&e.key==="ArrowLeft"||n&&e.key==="ArrowRight")&&(s-=o),(t&&e.key==="ArrowRight"||n&&e.key==="ArrowLeft")&&(s+=o),e.key==="Home"&&(s=0),e.key==="End"&&(s=100),s=clamp(s,0,100),this.position=s}}handlePositionChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}render(){const e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return x`
      <div id="comparison" class="image" part="base">
        <div part="before" class="before">
          <slot name="before"></slot>
        </div>

        <div
          part="after"
          class="after"
          style=${o({clipPath:e?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
        >
          <slot name="after"></slot>
        </div>
      </div>

      <div
        part="divider"
        class="divider"
        style=${o({left:e?`${100-this.position}%`:`${this.position}%`})}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <div
          part="handle"
          class="handle"
          role="scrollbar"
          aria-valuenow=${this.position}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-controls="comparison"
          tabindex="0"
        >
          <slot name="handle">
            <wa-icon library="system" name="grip-vertical" variant="solid"></wa-icon>
          </slot>
        </div>
      </div>
    `}};WaComparison.css=comparison_styles_default,__decorateClass([e(".handle")],WaComparison.prototype,"handle",2),__decorateClass([n({type:Number,reflect:!0})],WaComparison.prototype,"position",2),__decorateClass([watch("position",{waitUntilFirstUpdate:!0})],WaComparison.prototype,"handlePositionChange",1),WaComparison=__decorateClass([t("wa-comparison")],WaComparison);export{WaComparison}