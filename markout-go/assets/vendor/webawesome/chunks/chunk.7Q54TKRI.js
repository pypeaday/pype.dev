/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{scroller_styles_default}from"./chunk.A4KPVHRW.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{WebAwesomeElement,e,n,r,t,t2}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaScroller=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.resizeObserver=null,this.canScroll=!1,this.orientation="horizontal",this.withoutScrollbar=!1,this.withoutShadow=!1}connectedCallback(){super.connectedCallback(),o||(this.resizeObserver=new ResizeObserver(()=>this.updateScroll()),this.resizeObserver.observe(this))}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}handleKeyDown(e){e.key==="Home"&&(e.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?0:0[0],top:this.orientation==="vertical"?0:0[0]})),e.key==="End"&&(e.preventDefault(),this.content.scrollTo({left:this.orientation==="horizontal"?this.content.scrollWidth:0[0],top:this.orientation==="vertical"?this.content.scrollHeight:0[0]}))}handleSlotChange(){this.updateScroll()}updateScroll(){if(this.orientation==="horizontal"){const n=Math.ceil(this.content.clientWidth),t=Math.abs(Math.ceil(this.content.scrollLeft)),s=Math.ceil(this.content.scrollWidth),e=s-n;this.canScroll=e>0;const o=Math.min(1,t/(e*.05)),i=Math.min(1,(e-t)/(e*.05));this.style.setProperty("--start-shadow-opacity",String(o||0)),this.style.setProperty("--end-shadow-opacity",String(i||0))}else{const n=Math.ceil(this.content.clientHeight),t=Math.abs(Math.ceil(this.content.scrollTop)),s=Math.ceil(this.content.scrollHeight),e=s-n;this.canScroll=e>0;const o=Math.min(1,t/(e*.05)),i=Math.min(1,(e-t)/(e*.05));this.style.setProperty("--start-shadow-opacity",String(o||0)),this.style.setProperty("--end-shadow-opacity",String(i||0))}}render(){return x`
      ${this.withoutShadow?"":x`
            <div id="start-shadow" part="start-shadow" aria-hidden="true"></div>
            <div id="end-shadow" part="end-shadow" aria-hidden="true"></div>
          `}

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term("scrollableRegion")}
        aria-orientation=${this.orientation}
        tabindex=${this.canScroll?"0":"-1"}
        @keydown=${this.handleKeyDown}
        @scroll=${this.updateScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};WaScroller.css=[scroller_styles_default],__decorateClass([e("#content")],WaScroller.prototype,"content",2),__decorateClass([r()],WaScroller.prototype,"canScroll",2),__decorateClass([n({reflect:!0})],WaScroller.prototype,"orientation",2),__decorateClass([n({attribute:"without-scrollbar",type:Boolean,reflect:!0})],WaScroller.prototype,"withoutScrollbar",2),__decorateClass([n({attribute:"without-shadow",type:Boolean,reflect:!0})],WaScroller.prototype,"withoutShadow",2),__decorateClass([t2({passive:!0})],WaScroller.prototype,"updateScroll",1),WaScroller=__decorateClass([t("wa-scroller")],WaScroller);export{WaScroller}