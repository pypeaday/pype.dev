/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Bundled license information:

lit-html/directives/map.js:
lit-html/directives/range.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/import{WaSlideChangeEvent}from"./chunk.EF25YJJE.js";import{clamp}from"./chunk.O6IZ4I7T.js";import{waitForEvent}from"./chunk.F25QOBDY.js";import{prefersReducedMotion}from"./chunk.L6CIKOFQ.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{AutoplayController}from"./chunk.6SNQOYNK.js";import{carousel_styles_default}from"./chunk.IYXV6LE3.js";import{o as o2}from"./chunk.BQNDCXAL.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{WebAwesomeElement,e,n,r,t,t2}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";(()=>{if(o)return;const t=(e,t)=>{let n=0;return function(...s){window.clearTimeout(n),n=window.setTimeout(()=>{e.call(this,...s)},t)}},e=(e,t,n)=>{const s=e[t];e[t]=function(...e){s.call(this,...e),n.call(this,s,...e)}},n="onscrollend"in window;if(!n){const n=new Set,s=new WeakMap,o=e=>{n.add(e.pointerId)},i=e=>{n.delete(e.pointerId)};document.addEventListener("pointerdown",o),document.addEventListener("pointerup",i),e(EventTarget.prototype,"addEventListener",function(e,o){if(o!=="scroll")return;const i=t(()=>{n.size?i():this.dispatchEvent(new Event("scrollend"))},100);e.call(this,"scroll",i,{passive:!0}),s.set(this,i)}),e(EventTarget.prototype,"removeEventListener",function(e,t){if(t!=="scroll")return;const n=s.get(this);n&&e.call(this,"scroll",n,{passive:!0})})}})();function*o3(e,t){if(0[0]!==e){let n=0;for(const s of e)yield t(s,n++)}}function*o4(e,t,n=1){const s=0[0]===t?0:e;t??(t=e);for(let e=s;n>0?e<t:t<e;e+=n)yield e}var WaCarousel=class extends WebAwesomeElement{constructor(){super(...arguments),this.loop=!1,this.slides=0,this.currentSlide=0,this.navigation=!1,this.pagination=!1,this.autoplay=!1,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation="horizontal",this.mouseDragging=!1,this.activeSlide=0,this.scrolling=!1,this.dragging=!1,this.autoplayController=new AutoplayController(this,()=>this.next()),this.dragStartPosition=[-1,-1],this.localize=new LocalizeController(this),this.pendingSlideChange=!1,this.handleMouseDrag=e=>{this.dragging||(this.scrollContainer.style.setProperty("scroll-snap-type","none"),this.dragging=!0,this.dragStartPosition=[e.clientX,e.clientY]),this.scrollContainer.scrollBy({left:-e.movementX,top:-e.movementY,behavior:"instant"})},this.handleMouseDragEnd=()=>{const e=this.scrollContainer;document.removeEventListener("pointermove",this.handleMouseDrag,{capture:!0});const t=e.scrollLeft,n=e.scrollTop;e.style.removeProperty("scroll-snap-type"),e.style.setProperty("overflow","hidden");const s=e.scrollLeft,o=e.scrollTop;e.style.removeProperty("overflow"),e.style.setProperty("scroll-snap-type","none"),e.scrollTo({left:t,top:n,behavior:"instant"}),requestAnimationFrame(async()=>{(t!==s||n!==o)&&(e.scrollTo({left:s,top:o,behavior:prefersReducedMotion()?"auto":"smooth"}),await waitForEvent(e,"scrollend")),e.style.removeProperty("scroll-snap-type"),this.dragging=!1,this.dragStartPosition=[-1,-1],this.handleScrollEnd()})},this.handleSlotChange=e=>{const t=e.some(e=>[...e.addedNodes,...e.removedNodes].some(e=>this.isCarouselItem(e)&&!e.hasAttribute("data-clone")));t&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),o||(this.setAttribute("role","region"),this.setAttribute("aria-label",this.localize.term("carousel")))}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.resizeObserver?.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:!0,subtree:!0}),this.resizeObserver=new ResizeObserver(()=>{(this.scrollContainer?.clientWidth||this.scrollContainer?.clientHeight)&&(this.synchronizeSlides(),this.resizeObserver?.disconnect(),this.resizeObserver=0[0])}),this.resizeObserver.observe(this)}willUpdate(e){(e.has("slidesPerMove")||e.has("slidesPerPage"))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){const{slidesPerPage:n,slidesPerMove:t,loop:s}=this,e=this.getSlides().length,o=s?e/t:(e-n)/t+1;return Math.ceil(o)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:e=!0}={}){return[...this.children].filter(t=>this.isCarouselItem(t)&&(!e||!t.hasAttribute("data-clone")))}handleClick(e){if(this.dragging&&this.dragStartPosition[0]>0&&this.dragStartPosition[1]>0){const t=Math.abs(this.dragStartPosition[0]-e.clientX),n=Math.abs(this.dragStartPosition[1]-e.clientY),s=(t*t+n*n)**.5;s>=10&&e.preventDefault()}}handleKeyDown(e){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)){const n=e.target,t=this.localize.dir()==="rtl",s=n.closest('[part~="pagination-item"]')!==null,o=e.key==="ArrowDown"||!t&&e.key==="ArrowRight"||t&&e.key==="ArrowLeft",i=e.key==="ArrowUp"||!t&&e.key==="ArrowLeft"||t&&e.key==="ArrowRight";e.preventDefault(),i&&this.previous(),o&&this.next(),e.key==="Home"&&this.goToSlide(0),e.key==="End"&&this.goToSlide(this.getSlides().length-1),s&&this.updateComplete.then(()=>{const e=this.shadowRoot?.querySelector('[part~="pagination-item-active"]');e&&e.focus()})}}handleMouseDragStart(e){const t=this.mouseDragging&&e.button===0;t&&(e.preventDefault(),document.addEventListener("pointermove",this.handleMouseDrag,{capture:!0,passive:!0}),document.addEventListener("pointerup",this.handleMouseDragEnd,{capture:!0,once:!0}))}handleScroll(){this.scrolling=!0,this.pendingSlideChange||this.synchronizeSlides()}synchronizeSlides(){const e=new IntersectionObserver(t=>{e.disconnect();for(const e of t){const n=e.target;n.toggleAttribute("inert",!e.isIntersecting),n.classList.toggle("--in-view",e.isIntersecting),n.setAttribute("aria-hidden",e.isIntersecting?"false":"true")}const n=t.find(e=>e.isIntersecting);if(!n)return;const i=this.getSlides({excludeClones:!1}),s=this.getSlides().length,o=i.indexOf(n.target),a=this.loop?o-this.slidesPerPage:o;if(n&&(this.activeSlide=(Math.ceil(a/this.slidesPerMove)*this.slidesPerMove+s)%s,!this.scrolling&&this.loop&&n.target.hasAttribute("data-clone"))){const e=Number(n.target.getAttribute("data-clone"));this.goToSlide(e,"instant")}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:!1}).forEach(t=>{e.observe(t)})}handleScrollEnd(){if(!this.scrolling||this.dragging)return;this.synchronizeSlides(),this.scrolling=!1,this.pendingSlideChange=!1,this.synchronizeSlides()}isCarouselItem(e){return e instanceof Element&&e.tagName.toLowerCase()==="wa-carousel-item"}initializeSlides(){this.getSlides({excludeClones:!1}).forEach((e,t)=>{e.classList.remove("--in-view"),e.classList.remove("--is-active"),e.setAttribute("aria-label",this.localize.term("slideNum",t+1)),e.hasAttribute("data-clone")&&e.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.goToSlide(this.activeSlide,"auto"),this.synchronizeSlides()}createClones(){const e=this.getSlides(),t=this.slidesPerPage,n=e.slice(-t),s=e.slice(0,t);n.reverse().forEach((t,n)=>{const s=t.cloneNode(!0);s.setAttribute("data-clone",String(e.length-n-1)),this.prepend(s)}),s.forEach((e,t)=>{const n=e.cloneNode(!0);n.setAttribute("data-clone",String(t)),this.append(n)})}handleSlideChange(){const e=this.getSlides();e.forEach((e,t)=>{e.classList.toggle("--is-active",t===this.activeSlide)}),this.hasUpdated&&this.dispatchEvent(new WaSlideChangeEvent({index:this.activeSlide,slide:e[this.activeSlide]}))}updateSlidesSnap(){const t=this.getSlides(),e=this.slidesPerMove;t.forEach((t,n)=>{const s=(n+e)%e===0;s?t.style.removeProperty("scroll-snap-align"):t.style.setProperty("scroll-snap-align","none")})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(e="smooth"){this.goToSlide(this.activeSlide-this.slidesPerMove,e)}next(e="smooth"){this.goToSlide(this.activeSlide+this.slidesPerMove,e)}goToSlide(e,t="smooth"){const{slidesPerPage:s,loop:o}=this,n=this.getSlides(),i=this.getSlides({excludeClones:!1});if(!n.length)return;const a=o?(e+n.length)%n.length:clamp(e,0,n.length-s);this.activeSlide=a;const r=this.localize.dir()==="rtl",c=clamp(e+(o?s:0)+(r?s-1:0),0,i.length-1),l=i[c];this.scrollToSlide(l,prefersReducedMotion()?"auto":t)}scrollToSlide(e,t="smooth"){this.pendingSlideChange=!0,window.requestAnimationFrame(()=>{if(!this.scrollContainer)return;const n=this.scrollContainer,s=n.getBoundingClientRect(),o=e.getBoundingClientRect(),i=o.left-s.left,a=o.top-s.top;i||a?(this.pendingSlideChange=!0,n.scrollTo({left:i+n.scrollLeft,top:a+n.scrollTop,behavior:t})):this.pendingSlideChange=!1})}render(){const{slidesPerMove:a,scrolling:r}=this;let n=0,s=0,e=!1,t=!1;this.hasUpdated&&(n=this.getPageCount(),s=this.getCurrentPage(),e=this.canScrollPrev(),t=this.canScrollNext());const i=o?this.dir==="rtl":this.localize.dir()==="rtl";return x`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${e2({slides:!0,"slides-horizontal":this.orientation==="horizontal","slides-vertical":this.orientation==="vertical","slides-dragging":this.dragging})}"
          style=${o2({"--slides-per-page":this.slidesPerPage})}
          aria-busy="${r?"true":"false"}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
          @click=${this.handleClick}
        >
          <slot @slotchange=${()=>this.requestUpdate()}></slot>
        </div>

        ${this.navigation?x`
              <div part="navigation" class="navigation">
                <button
                  part="navigation-button navigation-button-previous"
                  class="${e2({"navigation-button":!0,"navigation-button-previous":!0,"navigation-button-disabled":!e})}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${e?"false":"true"}"
                  @click=${e?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <wa-icon library="system" name="${i?"chevron-right":"chevron-left"}"></wa-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button-next"
                  class=${e2({"navigation-button":!0,"navigation-button-next":!0,"navigation-button-disabled":!t})}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${t?"false":"true"}"
                  @click=${t?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <wa-icon library="system" name="${i?"chevron-left":"chevron-right"}"></wa-icon>
                  </slot>
                </button>
              </div>
            `:""}
        ${this.pagination?x`
              <div part="pagination" role="tablist" class="pagination" aria-controls="scroll-container">
                ${o3(o4(n),e=>{const t=e===s;return x`
                    <button
                      part="pagination-item ${t?"pagination-item-active":""}"
                      class="${e2({"pagination-item":!0,"pagination-item-active":t})}"
                      role="tab"
                      aria-selected="${t?"true":"false"}"
                      aria-label="${this.localize.term("goToSlide",e+1,n)}"
                      tabindex=${t?"0":"-1"}
                      @click=${()=>this.goToSlide(e*a)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:x``}
      </div>
    `}};WaCarousel.css=carousel_styles_default,__decorateClass([n({type:Boolean,reflect:!0})],WaCarousel.prototype,"loop",2),__decorateClass([n({type:Number,reflect:!0})],WaCarousel.prototype,"slides",2),__decorateClass([n({type:Number,reflect:!0})],WaCarousel.prototype,"currentSlide",2),__decorateClass([n({type:Boolean,reflect:!0})],WaCarousel.prototype,"navigation",2),__decorateClass([n({type:Boolean,reflect:!0})],WaCarousel.prototype,"pagination",2),__decorateClass([n({type:Boolean,reflect:!0})],WaCarousel.prototype,"autoplay",2),__decorateClass([n({type:Number,attribute:"autoplay-interval"})],WaCarousel.prototype,"autoplayInterval",2),__decorateClass([n({type:Number,attribute:"slides-per-page"})],WaCarousel.prototype,"slidesPerPage",2),__decorateClass([n({type:Number,attribute:"slides-per-move"})],WaCarousel.prototype,"slidesPerMove",2),__decorateClass([n()],WaCarousel.prototype,"orientation",2),__decorateClass([n({type:Boolean,reflect:!0,attribute:"mouse-dragging"})],WaCarousel.prototype,"mouseDragging",2),__decorateClass([e(".slides")],WaCarousel.prototype,"scrollContainer",2),__decorateClass([e(".pagination")],WaCarousel.prototype,"paginationContainer",2),__decorateClass([r()],WaCarousel.prototype,"activeSlide",2),__decorateClass([r()],WaCarousel.prototype,"scrolling",2),__decorateClass([r()],WaCarousel.prototype,"dragging",2),__decorateClass([t2({passive:!0})],WaCarousel.prototype,"handleScroll",1),__decorateClass([watch("loop",{waitUntilFirstUpdate:!0}),watch("slidesPerPage",{waitUntilFirstUpdate:!0})],WaCarousel.prototype,"initializeSlides",1),__decorateClass([watch("activeSlide")],WaCarousel.prototype,"handleSlideChange",1),__decorateClass([watch("slidesPerMove")],WaCarousel.prototype,"updateSlidesSnap",1),__decorateClass([watch("autoplay")],WaCarousel.prototype,"handleAutoplayChange",1),WaCarousel=__decorateClass([t("wa-carousel")],WaCarousel);export{WaCarousel}