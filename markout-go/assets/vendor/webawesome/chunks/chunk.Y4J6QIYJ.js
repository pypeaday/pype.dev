/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{lockBodyScrolling,unlockBodyScrolling}from"./chunk.VQZ46MYI.js";import{parseSpaceDelimitedTokens}from"./chunk.RMZ7BVDM.js";import{drawer_styles_default}from"./chunk.P7AOIZJ4.js";import{isTopDismissible,registerDismissible,unregisterDismissible}from"./chunk.52WA2DJO.js";import{WaShowEvent}from"./chunk.4ZAKP7NY.js";import{WaHideEvent}from"./chunk.MQODJ75V.js";import{WaAfterHideEvent}from"./chunk.3NKIHICW.js";import{WaAfterShowEvent}from"./chunk.PX3HMKF7.js";import{animateWithClass}from"./chunk.L6CIKOFQ.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{WebAwesomeElement,e,n,t}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaDrawer=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.hasSlotController=new HasSlotController(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.withFooter=!1,this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.open&&isTopDismissible(this)&&(e.preventDefault(),e.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){if(o)return;this.open&&(this.addOpenListeners(),this.drawer.showModal(),lockBodyScrolling(this))}disconnectedCallback(){super.disconnectedCallback(),unlockBodyScrolling(this),this.removeOpenListeners()}async requestClose(e){const t=new WaHideEvent({source:e});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0,animateWithClass(this.drawer,"pulse");return}this.removeOpenListeners(),await animateWithClass(this.drawer,"hide"),this.open=!1,this.drawer.close(),unlockBodyScrolling(this);const n=this.originalTrigger;typeof n?.focus=="function"&&setTimeout(()=>n.focus()),this.dispatchEvent(new WaAfterHideEvent)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),registerDismissible(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),unregisterDismissible(this)}handleDialogCancel(e){e.preventDefault(),!this.drawer.classList.contains("hide")&&e.target===this.drawer&&isTopDismissible(this)&&this.requestClose(this.drawer)}handleDialogClick(e){const n=e.target,t=n.closest('[data-drawer="close"]');t&&(e.stopPropagation(),this.requestClose(t))}async handleDialogPointerDown(e){e.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await animateWithClass(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){const e=new WaShowEvent;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),lockBodyScrolling(this),requestAnimationFrame(()=>{const e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.drawer.focus()}),await animateWithClass(this.drawer,"show"),this.dispatchEvent(new WaAfterShowEvent)}render(){const e=!this.withoutHeader,t=this.hasUpdated?this.hasSlotController.test("footer"):this.withFooter;return x`
      <dialog
        part="dialog"
        class=${e2({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${e?x`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(8203)} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${e=>this.requestClose(e.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${t?x`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};WaDrawer.css=drawer_styles_default,__decorateClass([e(".drawer")],WaDrawer.prototype,"drawer",2),__decorateClass([n({type:Boolean,reflect:!0})],WaDrawer.prototype,"open",2),__decorateClass([n({reflect:!0})],WaDrawer.prototype,"label",2),__decorateClass([n({reflect:!0})],WaDrawer.prototype,"placement",2),__decorateClass([n({attribute:"without-header",type:Boolean,reflect:!0})],WaDrawer.prototype,"withoutHeader",2),__decorateClass([n({attribute:"light-dismiss",type:Boolean})],WaDrawer.prototype,"lightDismiss",2),__decorateClass([n({attribute:"with-footer",type:Boolean})],WaDrawer.prototype,"withFooter",2),__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaDrawer.prototype,"handleOpenChange",1),WaDrawer=__decorateClass([t("wa-drawer")],WaDrawer),o||(document.addEventListener("click",e=>{const t=e.target.closest("[data-drawer]");if(t instanceof Element){const[n,e]=parseSpaceDelimitedTokens(t.getAttribute("data-drawer")||"");if(n==="open"&&e?.length){const s=t.getRootNode(),n=s.getElementById(e);n?.localName==="wa-drawer"?n.open=!0:console.warn(`A drawer with an ID of "${e}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{}));export{WaDrawer}