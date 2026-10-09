/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{WaShowEvent}from"./chunk.4ZAKP7NY.js";import{WaHideEvent}from"./chunk.MQODJ75V.js";import{WaAfterHideEvent}from"./chunk.3NKIHICW.js";import{WaAfterShowEvent}from"./chunk.PX3HMKF7.js";import{details_styles_default}from"./chunk.5DQYMPDO.js";import{waitForEvent}from"./chunk.F25QOBDY.js";import{animate,parseDuration}from"./chunk.L6CIKOFQ.js";import{WebAwesomeFormAssociatedElement}from"./chunk.I3XGXHPO.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{WebAwesomeElement,e,n,r,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaDetails=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.animationGeneration=0,this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(e=>{for(const t of e)t.type==="attributes"&&t.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(e){e.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(e){const t=e.composedPath(),n=t.some(e=>{if(!(e instanceof HTMLElement))return!1;const t=e.tagName?.toLowerCase();return!!["a","button","input","textarea","select"].includes(t)||e instanceof WebAwesomeFormAssociatedElement&&(!("disabled"in e)||!e.disabled)});if(n)return;e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;const e=this.getRootNode(),t=e.querySelectorAll(`wa-details[name="${this.name}"]`);t.forEach(e=>{e!==this&&e.open&&(e.open=!1)})}async handleOpenChange(){this.animationGeneration++;const e=this.animationGeneration;if(this.open){this.details.open=!0;const t=new WaShowEvent;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;const n=parseDuration(getComputedStyle(this.body).getPropertyValue("--show-duration"));if(await animate(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:n,easing:"linear"}),this.animationGeneration!==e)return;this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new WaAfterShowEvent)}else{const t=new WaHideEvent;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;const n=parseDuration(getComputedStyle(this.body).getPropertyValue("--hide-duration"));if(await animate(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:n,easing:"linear"}),this.animationGeneration!==e)return;this.body.style.height="0",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new WaAfterHideEvent)}}async show(){return this.open||this.disabled?0[0]:(this.open=!0,waitForEvent(this,"wa-after-show"))}async hide(){return!this.open||this.disabled?0[0]:(this.open=!1,waitForEvent(this,"wa-after-hide"))}render(){const e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return x`
      <details part="base">
        <summary
          part="header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary">${this.summary}</slot>

          <span part="icon">
            <slot name="expand-icon">
              <wa-icon library="system" variant="solid" name=${e?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${e?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${e2({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};WaDetails.css=details_styles_default,__decorateClass([e("details")],WaDetails.prototype,"details",2),__decorateClass([e("summary")],WaDetails.prototype,"header",2),__decorateClass([e(".body")],WaDetails.prototype,"body",2),__decorateClass([e(".expand-icon-slot")],WaDetails.prototype,"expandIconSlot",2),__decorateClass([r()],WaDetails.prototype,"isAnimating",2),__decorateClass([n({type:Boolean,reflect:!0})],WaDetails.prototype,"open",2),__decorateClass([n()],WaDetails.prototype,"summary",2),__decorateClass([n({reflect:!0})],WaDetails.prototype,"name",2),__decorateClass([n({type:Boolean,reflect:!0})],WaDetails.prototype,"disabled",2),__decorateClass([n({reflect:!0})],WaDetails.prototype,"appearance",2),__decorateClass([n({attribute:"icon-placement",reflect:!0})],WaDetails.prototype,"iconPlacement",2),__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaDetails.prototype,"handleOpenChange",1),WaDetails=__decorateClass([t("wa-details")],WaDetails);export{WaDetails}