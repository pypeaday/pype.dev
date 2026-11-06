/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{WaTabHideEvent}from"./chunk.YBFCQDTA.js";import{WaTabShowEvent}from"./chunk.SKLR37OM.js";import{tab_group_styles_default}from"./chunk.FKKESQC6.js";import{scrollIntoView}from"./chunk.VQZ46MYI.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{WebAwesomeElement,e,n,r,t}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaTabGroup=class extends WebAwesomeElement{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new LocalizeController(this),this.hasScrollControls=!1,this.active="",this.placement="top",this.activation="auto",this.withoutScrollControls=!1}connectedCallback(){if(super.connectedCallback(),o)return;this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{e.some(e=>!["aria-labelledby","aria-controls"].includes(e.attributeName))&&setTimeout(()=>this.setAriaLabels());const t=e.filter(e=>{const t=e.target;return t.closest("wa-tab-group")===this});if(t.some(e=>e.attributeName==="disabled"))this.syncTabsAndPanels();else if(t.some(e=>e.attributeName==="active")){const n=t.filter(e=>e.attributeName==="active"&&e.target.tagName.toLowerCase()==="wa-tab").map(e=>e.target),e=n.find(e=>e.active);e&&e.closest("wa-tab-group")===this&&this.setActiveTab(e)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav);const e=new IntersectionObserver((e,t)=>{if(e[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){const e=this.tabs.find(e=>e.panel===this.active);e&&this.setActiveTab(e)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});t.unobserve(e[0].target)}});e.observe(this.tabGroup)})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){const e=this.shadowRoot.querySelector('slot[name="nav"]');return[...e.assignedElements()].filter(e=>e.tagName.toLowerCase()==="wa-tab")}getAllPanels(){return[...this.defaultSlot.assignedElements()].filter(e=>e.tagName.toLowerCase()==="wa-tab-panel")}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){const n=e.target,t=n.closest("wa-tab"),s=t?.closest("wa-tab-group");if(s!==this)return;t!==null&&this.setActiveTab(t,{scrollBehavior:"smooth"})}handleKeyDown(e){const n=e.target,t=n.closest("wa-tab"),s=t?.closest("wa-tab-group");if(s!==this)return;if(["Enter"," "].includes(e.key)){t!==null&&(this.setActiveTab(t,{scrollBehavior:"smooth"}),e.preventDefault());return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)){const n=this.tabs.find(e=>e.matches(":focus")),s=this.localize.dir()==="rtl";let t=null;if(n?.tagName.toLowerCase()==="wa-tab"){if(e.key==="Home")t=this.focusableTabs[0];else if(e.key==="End")t=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&e.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&e.key==="ArrowUp"){const e=this.tabs.findIndex(e=>e===n);t=this.findNextFocusableTab(e,"backward")}else if(["top","bottom"].includes(this.placement)&&e.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&e.key==="ArrowDown"){const e=this.tabs.findIndex(e=>e===n);t=this.findNextFocusableTab(e,"forward")}if(!t)return;t.tabIndex=0,t.focus({preventScroll:!0}),this.activation==="auto"?this.setActiveTab(t,{scrollBehavior:"smooth"}):this.tabs.forEach(e=>{e.tabIndex=e===t?0:-1}),["top","bottom"].includes(this.placement)&&scrollIntoView(t,this.nav,"horizontal"),e.preventDefault()}}}findNextFocusableTab(e,t){let n=null;const s=t==="forward"?1:-1;let o=e+s;for(;e<this.tabs.length;){if(n=this.tabs[o]||null,n===null){t==="forward"?n=this.focusableTabs[0]:n=this.focusableTabs[this.focusableTabs.length-1];break}if(!n.disabled)break;o+=s}return n}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(e,t){if(t={emitEvents:!0,scrollBehavior:"auto",...t},e.closest("wa-tab-group")!==this)return;if(e!==this.activeTab&&!e.disabled){const n=this.activeTab;this.active=e.panel,this.activeTab=e,this.tabs.forEach(e=>{e.active=e===this.activeTab,e.tabIndex=e===this.activeTab?0:-1}),this.panels.forEach(e=>e.active=e.name===this.activeTab?.panel),["top","bottom"].includes(this.placement)&&scrollIntoView(this.activeTab,this.nav,"horizontal",t.scrollBehavior),t.emitEvents&&(n&&this.dispatchEvent(new WaTabHideEvent({name:n.panel})),this.dispatchEvent(new WaTabShowEvent({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(e=>{const t=this.panels.find(t=>t.name===e.panel);t&&(e.setAttribute("aria-controls",t.getAttribute("id")),t.setAttribute("aria-labelledby",e.getAttribute("id")))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(e=>!e.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){const e=this.tabs.find(e=>e.panel===this.active);e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){const e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return x`
      <div
        part="base"
        class=${e2({"tab-group":!0,"tab-group-top":this.placement==="top","tab-group-bottom":this.placement==="bottom","tab-group-start":this.placement==="start","tab-group-end":this.placement==="end","tab-group-has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls?x`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${e?"chevron-right":"chevron-left"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToStart")}
                  ></wa-icon>
                </wa-button>
              `:""}

          <!-- We have a focus listener because in Firefox (and soon to be Chrome) overflow containers are focusable. -->
          <div class="nav" @focus=${()=>this.activeTab?.focus({preventScroll:!0})}>
            <div part="tabs" class="tabs" role="tablist">
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?x`
                <wa-button
                  part="scroll-button scroll-button-end"
                  class="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${e?"chevron-left":"chevron-right"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToEnd")}
                  ></wa-icon>
                </wa-button>
              `:""}
        </div>

        <div part="body" class="body"><slot @slotchange=${this.syncTabsAndPanels}></slot></div>
      </div>
    `}};WaTabGroup.css=tab_group_styles_default,__decorateClass([e(".tab-group")],WaTabGroup.prototype,"tabGroup",2),__decorateClass([e(".body slot")],WaTabGroup.prototype,"defaultSlot",2),__decorateClass([e(".nav")],WaTabGroup.prototype,"nav",2),__decorateClass([r()],WaTabGroup.prototype,"hasScrollControls",2),__decorateClass([n({reflect:!0})],WaTabGroup.prototype,"active",2),__decorateClass([n()],WaTabGroup.prototype,"placement",2),__decorateClass([n()],WaTabGroup.prototype,"activation",2),__decorateClass([n({attribute:"without-scroll-controls",type:Boolean})],WaTabGroup.prototype,"withoutScrollControls",2),__decorateClass([watch("active")],WaTabGroup.prototype,"updateActiveTab",1),__decorateClass([watch("withoutScrollControls",{waitUntilFirstUpdate:!0})],WaTabGroup.prototype,"updateScrollControls",1),WaTabGroup=__decorateClass([t("wa-tab-group")],WaTabGroup);export{WaTabGroup}