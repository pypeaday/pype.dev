/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{o as o2}from"./chunk.2BXLTQVW.js";import{page_mobile_styles_default}from"./chunk.WKX3BKNK.js";import{page_styles_default}from"./chunk.2MOO23UE.js";import{visually_hidden_styles_default}from"./chunk.I4KXAHPX.js";import{l}from"./chunk.KZZR6Z6I.js";import{WebAwesomeElement,e,n,t}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";function toPx(e,t=document.documentElement){if(!Number.isNaN(Number(e)))return Number(e);if(!window.CSS||!CSS.registerProperty)return typeof e=="string"&&e.endsWith("px")?parseFloat(e):Number(e)||0;const n="--wa-length-resolver";if(!CSS.registerProperty.toString().includes(n))try{CSS.registerProperty({name:n,syntax:"<length>",inherits:!1,initialValue:"0px"})}catch{}const o=t.style.getPropertyValue(n);t.style.setProperty(n,e);const s=getComputedStyle(t)?.getPropertyValue(n);return t.style.setProperty(n,o),s?.endsWith("px")?parseFloat(s):Number(s)||0}function toLength(e){return Number.isNaN(Number(e))?e:`${e}px`}var WaPage=class extends WebAwesomeElement{constructor(){super(),this.headerResizeObserver=o?null:this.slotResizeObserver("header"),this.subheaderResizeObserver=o?null:this.slotResizeObserver("subheader"),this.bannerResizeObserver=o?null:this.slotResizeObserver("banner"),this.footerResizeObserver=o?null:this.slotResizeObserver("footer"),this.handleNavigationToggle=e=>{if(this.view==="desktop"){this.hideNavigation();return}const n=e.composedPath(),t=this.navigationToggleSlot;n.find(e=>e.hasAttribute?.("data-toggle-nav")||e.assignedSlot===t||e===t)&&(e.preventDefault(),this.toggleNavigation())},this.view="desktop",this.navOpen=!1,this.mobileBreakpoint="768px",this.navigationPlacement="start",this.disableNavigationToggle=!1,this.pageResizeObserver=o?null:new ResizeObserver(e=>{for(const t of e)if(t.contentBoxSize){const e=t.borderBoxSize[0],n=e.inlineSize,s=this.view;n>=toPx(this.mobileBreakpoint)?this.view="desktop":this.view="mobile",this.requestUpdate("view",s)}e.length>0&&this.updateAsideAndMenuHeights()}),this.updateNavigationToggleState=e=>{if(e){const t=e.target.name;if(!["navigation","navigation-header","navigation-footer"].includes(t))return}const t=Boolean(this.querySelector(":not([slot='toggle-navigation']) [data-toggle-nav]")),n=Boolean(this.querySelector('[slot="navigation"]'))||Boolean(this.querySelector('[slot="navigation-header"]'))||Boolean(this.querySelector('[slot="navigation-footer"]'));this.disableNavigationToggle=t||!n},this.updateAsideAndMenuHeights=()=>{const e=this.visiblePixelsInViewport(this.main);if(e==null)return;this.aside.style.setProperty("--main-height",`${e}px`),this.menu.style.setProperty("--main-height",`${e}px`)},o||this.addEventListener("click",this.handleNavigationToggle)}slotResizeObserver(e){return new ResizeObserver(t=>{for(const n of t)if(n.contentBoxSize){const t=n.borderBoxSize[0];this.style.setProperty(`--${e}-height`,`${t.blockSize}px`)}})}update(e){e.has("view")&&this.hideNavigation(),super.update(e)}connectedCallback(){super.connectedCallback(),o||(this.pageResizeObserver?.observe(this),document.addEventListener("scroll",this.updateAsideAndMenuHeights,{passive:!0}),this.updateAsideAndMenuHeights(),setTimeout(this.updateAsideAndMenuHeights),setTimeout(()=>{this.headerResizeObserver?.observe(this.header),this.subheaderResizeObserver?.observe(this.subheader),this.bannerResizeObserver?.observe(this.banner),this.footerResizeObserver?.observe(this.footer)}))}visiblePixelsInViewport(e){if(!e)return null;const{top:n,bottom:o}=e.getBoundingClientRect(),s=e.clientHeight,t=window.innerHeight;return Math.max(0,n>0?Math.min(s,t-n):Math.min(o,t))}firstUpdated(){if(!document.getElementById("main-content")){const e=document.createElement("div");e.id="main-content",e.slot="skip-to-content-target",this.prepend(e)}this.shadowRoot.addEventListener("slotchange",this.updateNavigationToggleState),this.updateNavigationToggleState()}disconnectedCallback(){super.disconnectedCallback(),this.pageResizeObserver?.unobserve(this),this.headerResizeObserver?.unobserve(this.header),this.subheaderResizeObserver?.unobserve(this.subheader),this.footerResizeObserver?.unobserve(this.footer),this.bannerResizeObserver?.unobserve(this.banner),document.removeEventListener("scroll",this.updateAsideAndMenuHeights)}showNavigation(){this.navOpen=!0}hideNavigation(){this.navOpen=!1}toggleNavigation(){this.navOpen=!this.navOpen}render(){return x`
      <a href="#main-content" part="skip-to-content" class="wa-visually-hidden">
        <slot name="skip-to-content">Skip to content</slot>
      </a>

      <!-- unsafeHTML needed for SSR until this is solved: https://github.com/lit/lit/issues/4696 -->
      ${o2(`
        <style id="mobile-styles">
          ${page_mobile_styles_default(toLength(this.mobileBreakpoint))}
        </style>
      `)}

      <div class="base" part="base">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>
        <div class="header" part="header">
          <slot name="navigation-toggle">
            <wa-button part="navigation-toggle" size="small" appearance="plain" variant="neutral">
              <slot name="navigation-toggle-icon">
                <wa-icon name="bars" part="navigation-toggle-icon" label="Toggle navigation drawer"></wa-icon>
              </slot>
            </wa-button>
          </slot>
          <slot name="header"></slot>
        </div>
        <div class="subheader" part="subheader">
          <slot name="subheader"></slot>
        </div>
        <div class="body" part="body">
          <div class="menu" part="menu">
            <slot name="menu">
              <nav name="navigation" class="navigation" part="navigation navigation-desktop">
                <!-- Add fallback divs so that CSS grid works properly. -->
                <slot name="desktop-navigation-header">
                  <slot name=${this.view==="desktop"?"navigation-header":"___"}><div></div></slot>
                </slot>
                <slot name="desktop-navigation">
                  <slot name=${this.view==="desktop"?"navigation":"____"}><div></div></slot>
                </slot>
                <slot name="desktop-navigation-footer">
                  <slot name=${this.view==="desktop"?"navigation-footer":"___"}><div></div></slot>
                </slot>
              </nav>
            </slot>
          </div>
          <div class="main" part="main">
            <div class="main-header" part="main-header">
              <slot name="main-header"></slot>
            </div>
            <div class="main-content" part="main-content">
              <slot name="skip-to-content-target"></slot>
              <slot></slot>
            </div>
            <div class="main-footer" part="main-footer">
              <slot name="main-footer"></slot>
            </div>
          </div>
          <div class="aside" part="aside">
            <slot name="aside"></slot>
          </div>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <wa-drawer
        part="drawer"
        placement=${this.navigationPlacement}
        light-dismiss
        ?open=${l(this.navOpen)}
        @wa-after-show=${()=>this.navOpen=this.navigationDrawer.open}
        @wa-after-hide=${()=>this.navOpen=this.navigationDrawer.open}
        exportparts="
          dialog:drawer__dialog,
          overlay:drawer__overlay,
          panel:drawer__panel,
          header:drawer__header,
          header-actions:drawer__header-actions,
          title:drawer__title,
          close-button:drawer__close-button,
          close-button__base:drawer__close-button__base,
          body:drawer__body,
          footer:drawer__footer
        "
        class="navigation-drawer"
      >
        <slot slot="label" part="navigation-header" name="mobile-navigation-header">
          <slot name=${this.view==="mobile"?"navigation-header":"___"}></slot>
        </slot>
        <slot name="mobile-navigation">
          <slot name=${this.view==="mobile"?"navigation":"____"}></slot>
        </slot>

        <slot slot="footer" name="mobile-navigation-footer">
          <slot part="navigation-footer" name=${this.view==="mobile"?"navigation-footer":"___"}></slot>
        </slot>
      </wa-drawer>
    `}};if(WaPage.css=[visually_hidden_styles_default,page_styles_default],__decorateClass([e("[part~='header']")],WaPage.prototype,"header",2),__decorateClass([e("[part~='menu']")],WaPage.prototype,"menu",2),__decorateClass([e("[part~='main']")],WaPage.prototype,"main",2),__decorateClass([e("[part~='aside']")],WaPage.prototype,"aside",2),__decorateClass([e("[part~='subheader']")],WaPage.prototype,"subheader",2),__decorateClass([e("[part~='footer']")],WaPage.prototype,"footer",2),__decorateClass([e("[part~='banner']")],WaPage.prototype,"banner",2),__decorateClass([e("[part~='drawer']")],WaPage.prototype,"navigationDrawer",2),__decorateClass([e("slot[name~='navigation-toggle']")],WaPage.prototype,"navigationToggleSlot",2),__decorateClass([n({attribute:"view",reflect:!0})],WaPage.prototype,"view",2),__decorateClass([n({attribute:"nav-open",reflect:!0,type:Boolean})],WaPage.prototype,"navOpen",2),__decorateClass([n({attribute:"mobile-breakpoint",type:String})],WaPage.prototype,"mobileBreakpoint",2),__decorateClass([n({attribute:"navigation-placement",reflect:!0})],WaPage.prototype,"navigationPlacement",2),__decorateClass([n({attribute:"disable-navigation-toggle",reflect:!0,type:Boolean})],WaPage.prototype,"disableNavigationToggle",2),WaPage=__decorateClass([t("wa-page")],WaPage),typeof CSSStyleSheet!="undefined"&&typeof document!="undefined"&&"adoptedStyleSheets"in document){const e=new CSSStyleSheet;e.replaceSync(`
  :is(html, body):has(wa-page) {
    min-height: 100%;
    padding: 0;
    margin: 0;
  }

    /**
    Because headers are sticky, this is needed to make sure page fragment anchors scroll down past the headers / subheaders and are visible.
    IE: \`<a href="#id-for-h2">\` anchors.
    */
    wa-page :is(*, *:after, *:before) {
    scroll-margin-top: var(--scroll-margin-top);
    }

    wa-page[view='desktop'] [data-toggle-nav] {
    display: none;
    }

    wa-page[view='mobile'] .wa-desktop-only, wa-page[view='desktop'] .wa-mobile-only {
    display: none !important;
    }
  `),document.adoptedStyleSheets=[...document.adoptedStyleSheets,e]}export{WaPage}