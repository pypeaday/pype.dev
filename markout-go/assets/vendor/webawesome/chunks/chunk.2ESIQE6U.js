/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{zoomable_frame_styles_default}from"./chunk.GRV2ULZ4.js";import{parseSpaceDelimitedTokens}from"./chunk.RMZ7BVDM.js";import{o as o2}from"./chunk.3MSWQ3RG.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{WebAwesomeElement,e,n,t}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var ColorSchemeController=class{constructor(e,t){this.handleTransitionEnd=()=>{this.onThemeChange()},(this.host=e).addController(this),this.onThemeChange=t,this.hiddenElement=document.createElement("div"),this.hiddenElement.setAttribute("aria-hidden","true"),Object.assign(this.hiddenElement.style,{position:"absolute",width:"0",height:"0",overflow:"hidden",pointerEvents:"none",opacity:"0",color:"var(--wa-color-surface-default, transparent)",transition:"color 0.001ms"})}hostConnected(){this.host.appendChild(this.hiddenElement),this.hiddenElement.addEventListener("transitionend",this.handleTransitionEnd)}hostDisconnected(){this.hiddenElement.removeEventListener("transitionend",this.handleTransitionEnd),this.hiddenElement.remove()}},WaZoomableFrame=class extends WebAwesomeElement{constructor(){super(),this.localize=new LocalizeController(this),this.availableZoomLevels=[],this.themeObserver=o?null:new MutationObserver(()=>this.syncTheme()),this.allowfullscreen=!1,this.loading="eager",this.zoom=1,this.zoomLevels="25% 50% 75% 100% 125% 150% 175% 200%",this.withoutControls=!1,this.withoutInteraction=!1,this.withThemeSync=!1,new ColorSchemeController(this,()=>this.syncTheme())}get contentWindow(){return this.iframe?.contentWindow||null}get contentDocument(){return this.iframe?.contentDocument||null}parseZoomLevels(e){const n=parseSpaceDelimitedTokens(e),t=[];for(const s of n){let e;if(s.endsWith("%")){const t=parseFloat(s.slice(0,-1));if(isNaN(t))continue;e=Math.max(0,t/100)}else{if(e=parseFloat(s),isNaN(e))continue;e=Math.max(0,e)}t.push(e)}return[...new Set(t)].sort((e,t)=>e-t)}getCurrentZoomIndex(){if(this.availableZoomLevels.length===0)return-1;let e=0,t=Math.abs(this.availableZoomLevels[0]-this.zoom);for(let n=1;n<this.availableZoomLevels.length;n++){const s=Math.abs(this.availableZoomLevels[n]-this.zoom);s<t&&(t=s,e=n)}return e}isZoomInDisabled(){if(this.availableZoomLevels.length===0)return!1;const e=this.getCurrentZoomIndex();return e>=this.availableZoomLevels.length-1}isZoomOutDisabled(){if(this.availableZoomLevels.length===0)return!1;const e=this.getCurrentZoomIndex();return e<=0}updated(e){if(e.has("zoom")&&this.style.setProperty("--zoom",`${this.zoom}`),e.has("zoomLevels")&&(this.availableZoomLevels=this.parseZoomLevels(this.zoomLevels),this.availableZoomLevels.length>0)){const e=this.getCurrentZoomIndex();Math.abs(this.availableZoomLevels[e]-this.zoom)>.001&&(this.zoom=this.availableZoomLevels[e])}e.has("withThemeSync")&&(this.withThemeSync?(this.themeObserver?.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),this.syncTheme()):this.themeObserver?.disconnect())}zoomIn(){if(this.availableZoomLevels.length===0){this.zoom=Math.min(this.zoom+.05,2);return}const e=this.getCurrentZoomIndex();e<this.availableZoomLevels.length-1&&(this.zoom=this.availableZoomLevels[e+1])}zoomOut(){if(this.availableZoomLevels.length===0){this.zoom=Math.max(this.zoom-.05,0);return}const e=this.getCurrentZoomIndex();e>0&&(this.zoom=this.availableZoomLevels[e-1])}disconnectedCallback(){super.disconnectedCallback(),this.themeObserver?.disconnect()}syncTheme(){if(!this.withThemeSync)return;try{const e=this.contentDocument?.documentElement;if(!e)return;const o=["wa-theme-","wa-brand-","wa-palette-"],n=new Set,i=new Set;let t=this,s=!1;for(;t;){s||(t.classList.contains("wa-dark")?(n.add("wa-dark"),s=!0):t.classList.contains("wa-light")&&(n.add("wa-light"),s=!0));for(const e of t.classList)o.some(t=>e.startsWith(t))&&i.add(e);t=t.parentElement}e.classList.toggle("wa-dark",n.has("wa-dark")),e.classList.toggle("wa-light",n.has("wa-light"));const a=Array.from(e.classList).filter(e=>o.some(t=>e.startsWith(t)));e.classList.remove(...a),e.classList.add(...i)}catch{}}handleLoad(){this.withThemeSync&&this.syncTheme(),this.dispatchEvent(new Event("load",{bubbles:!1,cancelable:!1,composed:!0}))}handleError(){this.dispatchEvent(new Event("error",{bubbles:!1,cancelable:!1,composed:!0}))}render(){return x`
      <div id="frame-container">
        <iframe
          id="iframe"
          part="iframe"
          ?inert=${this.withoutInteraction}
          ?allowfullscreen=${this.allowfullscreen}
          loading=${this.loading}
          referrerpolicy=${this.referrerpolicy}
          sandbox=${o2(this.sandbox??0[0])}
          src=${o2(this.src??0[0])}
          srcdoc=${o2(this.srcdoc??0[0])}
          @load=${this.handleLoad}
          @error=${this.handleError}
        ></iframe>
      </div>

      ${this.withoutControls?"":x`
            <div id="controls" part="controls">
              <button
                part="zoom-out-button"
                aria-label=${this.localize.term("zoomOut")}
                @click=${this.zoomOut}
                ?disabled=${this.isZoomOutDisabled()}
              >
                <slot name="zoom-out-icon">
                  <wa-icon name="minus" label="Zoom out"></wa-icon>
                </slot>
              </button>
              <span>${this.localize.number(this.zoom,{style:"percent",maximumFractionDigits:1})}</span>
              <button
                part="zoom-in-button"
                aria-label=${this.localize.term("zoomIn")}
                @click=${this.zoomIn}
                ?disabled=${this.isZoomInDisabled()}
              >
                <slot name="zoom-in-icon">
                  <wa-icon name="plus" label="Zoom in"></wa-icon>
                </slot>
              </button>
            </div>
          `}
    `}};WaZoomableFrame.css=zoomable_frame_styles_default,__decorateClass([e("#iframe")],WaZoomableFrame.prototype,"iframe",2),__decorateClass([n()],WaZoomableFrame.prototype,"src",2),__decorateClass([n()],WaZoomableFrame.prototype,"srcdoc",2),__decorateClass([n({type:Boolean})],WaZoomableFrame.prototype,"allowfullscreen",2),__decorateClass([n()],WaZoomableFrame.prototype,"loading",2),__decorateClass([n()],WaZoomableFrame.prototype,"referrerpolicy",2),__decorateClass([n()],WaZoomableFrame.prototype,"sandbox",2),__decorateClass([n({type:Number,reflect:!0})],WaZoomableFrame.prototype,"zoom",2),__decorateClass([n({attribute:"zoom-levels"})],WaZoomableFrame.prototype,"zoomLevels",2),__decorateClass([n({type:Boolean,attribute:"without-controls",reflect:!0})],WaZoomableFrame.prototype,"withoutControls",2),__decorateClass([n({type:Boolean,attribute:"without-interaction",reflect:!0})],WaZoomableFrame.prototype,"withoutInteraction",2),__decorateClass([n({type:Boolean,attribute:"with-theme-sync",reflect:!0})],WaZoomableFrame.prototype,"withThemeSync",2),WaZoomableFrame=__decorateClass([t("wa-zoomable-frame")],WaZoomableFrame);export{WaZoomableFrame}