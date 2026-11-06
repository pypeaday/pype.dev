/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{dropdown_item_styles_default}from"./chunk.PWJU7FNZ.js";import{animateWithClass}from"./chunk.L6CIKOFQ.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{WebAwesomeElement,e,n,r,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaDropdownItem=class extends WebAwesomeElement{constructor(){super(...arguments),this.hasSlotController=new HasSlotController(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="medium",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))},this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener("click",this.handleClick,{capture:!0}),this.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseenter",this.handleMouseEnter),this.shadowRoot.removeEventListener("click",this.handleClick,{capture:!0}),this.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}firstUpdated(){this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(e){e.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),e.has("checked")&&(this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked"),this.customStates.set("checked",this.checked)),e.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled),this.style.pointerEvents=this.disabled?"none":""),e.has("type")&&(this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))),e.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){const e=this.submenuElement;if(!this.hasSubmenu||!e||!this.isConnected)return;this.notifyParentOfOpening(),e.showPopover?.(),e.hidden=!1,e.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await animateWithClass(e,"show"),setTimeout(()=>{const e=this.getSubmenuItems();e.length>0&&(e.forEach((e,t)=>e.active=t===0),e[0].focus({preventScroll:!0}))},0)}notifyParentOfOpening(){const t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);const e=this.parentElement;if(e){const t=[...e.children].filter(e=>e!==this&&e.localName==="wa-dropdown-item"&&e.getAttribute("slot")===this.getAttribute("slot")&&e.submenuOpen);t.forEach(e=>{e.submenuOpen=!1})}}async closeSubmenu(){const e=this.submenuElement;if(!this.hasSubmenu||!e)return;this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),e.hidden||(await animateWithClass(e,"hide"),e?.isConnected&&(e.hidden=!0,e.removeAttribute("data-visible"),e.hidePopover?.()))}getSubmenuItems(){return[...this.children].filter(e=>e.localName==="wa-dropdown-item"&&e.getAttribute("slot")==="submenu"&&!e.hasAttribute("disabled"))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return x`
      ${this.type==="checkbox"?x`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:""}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?x`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?x`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          `:""}
    `}};WaDropdownItem.css=dropdown_item_styles_default,__decorateClass([e("#submenu")],WaDropdownItem.prototype,"submenuElement",2),__decorateClass([n({type:Boolean})],WaDropdownItem.prototype,"active",2),__decorateClass([n({reflect:!0})],WaDropdownItem.prototype,"variant",2),__decorateClass([n({reflect:!0})],WaDropdownItem.prototype,"size",2),__decorateClass([n({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],WaDropdownItem.prototype,"checkboxAdjacent",2),__decorateClass([n({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],WaDropdownItem.prototype,"submenuAdjacent",2),__decorateClass([n()],WaDropdownItem.prototype,"value",2),__decorateClass([n({reflect:!0})],WaDropdownItem.prototype,"type",2),__decorateClass([n({type:Boolean})],WaDropdownItem.prototype,"checked",2),__decorateClass([n({type:Boolean,reflect:!0})],WaDropdownItem.prototype,"disabled",2),__decorateClass([n({type:Boolean,reflect:!0})],WaDropdownItem.prototype,"submenuOpen",2),__decorateClass([r()],WaDropdownItem.prototype,"hasSubmenu",2),WaDropdownItem=__decorateClass([t("wa-dropdown-item")],WaDropdownItem);export{WaDropdownItem}