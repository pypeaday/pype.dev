/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{card_styles_default}from"./chunk.D2ESGZCU.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{WebAwesomeElement,n,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaCard=class extends WebAwesomeElement{constructor(){super(...arguments),this.hasSlotController=new HasSlotController(this,"footer","header","media","header-actions","footer-actions","actions"),this.appearance="outlined",this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.orientation="vertical"}willUpdate(){!this.withHeader&&this.hasSlotController.test("header")&&(this.withHeader=!0),!this.withMedia&&this.hasSlotController.test("media")&&(this.withMedia=!0),!this.withFooter&&this.hasSlotController.test("footer")&&(this.withFooter=!0)}render(){return this.orientation==="horizontal"?x`
        <slot name="media" part="media" class="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="actions" part="actions" class="actions"></slot>
      `:x`
      <slot name="media" part="media" class="media"></slot>

      ${this.hasSlotController.test("header-actions")?x` <header part="header" class="header has-actions">
            <slot name="header"></slot>
            <slot name="header-actions"></slot>
          </header>`:x` <header part="header" class="header">
            <slot name="header"></slot>
          </header>`}

      <div part="body" class="body"><slot></slot></div>
      ${this.hasSlotController.test("footer-actions")?x` <footer part="footer" class="footer has-actions">
            <slot name="footer"></slot>
            <slot name="footer-actions"></slot>
          </footer>`:x` <footer part="footer" class="footer">
            <slot name="footer"></slot>
          </footer>`}
    `}};WaCard.css=[size_styles_default,card_styles_default],__decorateClass([n({reflect:!0})],WaCard.prototype,"appearance",2),__decorateClass([n({attribute:"with-header",type:Boolean,reflect:!0})],WaCard.prototype,"withHeader",2),__decorateClass([n({attribute:"with-media",type:Boolean,reflect:!0})],WaCard.prototype,"withMedia",2),__decorateClass([n({attribute:"with-footer",type:Boolean,reflect:!0})],WaCard.prototype,"withFooter",2),__decorateClass([n({reflect:!0})],WaCard.prototype,"orientation",2),WaCard=__decorateClass([t("wa-card")],WaCard),WaCard.disableWarning?.("change-in-update");export{WaCard}