/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Bundled license information:

lit-html/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/import{WaLazyChangeEvent}from"./chunk.ZSEFTQAO.js";import{WaLazyLoadEvent}from"./chunk.26QE47KB.js";import{WaCollapseEvent}from"./chunk.U36KZLSQ.js";import{WaExpandEvent}from"./chunk.FYKN76UA.js";import{WaAfterCollapseEvent}from"./chunk.AG44H7MD.js";import{WaAfterExpandEvent}from"./chunk.Q6XMGFWJ.js";import{tree_item_styles_default}from"./chunk.ICPDUSEI.js";import{animate,parseDuration}from"./chunk.L6CIKOFQ.js";import{l}from"./chunk.KZZR6Z6I.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{WebAwesomeElement,e,n,r,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";function n2(e,t,n){return e?t(e):n?.(e)}var WaTreeItem=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1,this.animationGeneration=0}static isTreeItem(e){return e instanceof Element&&e.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children"),this.updateIndentation()}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(e){this.dispatchEvent(new WaCollapseEvent);const t=parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));if(await animate(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.animationGeneration!==e)return;this.childrenContainer.hidden=!0,this.dispatchEvent(new WaAfterCollapseEvent)}isNestedItem(){const e=this.parentElement;return!!e&&WaTreeItem.isTreeItem(e)}updateIndentation(){let t=0,e=this.parentElement;for(;e;)WaTreeItem.isTreeItem(e)&&t++,e=e.parentElement;this.style.setProperty("--indent",`calc(${t} * var(--indent-size, 2em))`)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(e){this.dispatchEvent(new WaExpandEvent),this.childrenContainer.hidden=!1;const t=parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));if(await animate(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.animationGeneration!==e)return;this.childrenContainer.style.height="auto",this.dispatchEvent(new WaAfterExpandEvent)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand(this.animationGeneration)}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.animationGeneration++;const e=this.animationGeneration;this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new WaLazyLoadEvent)):this.animateExpand(e):this.animateCollapse(e)}handleLazyChange(){this.dispatchEvent(new WaLazyChangeEvent)}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(t=>WaTreeItem.isTreeItem(t)&&(e||!t.disabled)):[]}render(){const e=this.localize.dir()==="rtl",t=!this.loading&&(!this.isLeaf||this.lazy);return x`
      <div
        part="base"
        class="${e2({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-loading":this.loading,"tree-item-has-expand-button":t})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${e2({"expand-button":!0,"expand-button-visible":t})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${n2(this.loading,()=>x` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,()=>x`
                  <wa-icon name=${e?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${e?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${n2(this.selectable,()=>x`
              <wa-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="checkbox"
                ?disabled="${this.disabled}"
                ?checked="${l(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></wa-checkbox>
            `)}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};WaTreeItem.css=tree_item_styles_default,__decorateClass([r()],WaTreeItem.prototype,"indeterminate",2),__decorateClass([r()],WaTreeItem.prototype,"isLeaf",2),__decorateClass([r()],WaTreeItem.prototype,"loading",2),__decorateClass([r()],WaTreeItem.prototype,"selectable",2),__decorateClass([n({type:Boolean,reflect:!0})],WaTreeItem.prototype,"expanded",2),__decorateClass([n({type:Boolean,reflect:!0})],WaTreeItem.prototype,"selected",2),__decorateClass([n({type:Boolean,reflect:!0})],WaTreeItem.prototype,"disabled",2),__decorateClass([n({type:Boolean,reflect:!0})],WaTreeItem.prototype,"lazy",2),__decorateClass([e("slot:not([name])")],WaTreeItem.prototype,"defaultSlot",2),__decorateClass([e("slot[name=children]")],WaTreeItem.prototype,"childrenSlot",2),__decorateClass([e(".item")],WaTreeItem.prototype,"itemElement",2),__decorateClass([e(".children")],WaTreeItem.prototype,"childrenContainer",2),__decorateClass([e(".expand-button slot")],WaTreeItem.prototype,"expandButtonSlot",2),__decorateClass([watch("loading",{waitUntilFirstUpdate:!0})],WaTreeItem.prototype,"handleLoadingChange",1),__decorateClass([watch("disabled")],WaTreeItem.prototype,"handleDisabledChange",1),__decorateClass([watch("expanded")],WaTreeItem.prototype,"handleExpandedState",1),__decorateClass([watch("indeterminate")],WaTreeItem.prototype,"handleIndeterminateStateChange",1),__decorateClass([watch("selected")],WaTreeItem.prototype,"handleSelectedChange",1),__decorateClass([watch("expanded",{waitUntilFirstUpdate:!0})],WaTreeItem.prototype,"handleExpandedChange",1),__decorateClass([watch("expanded",{waitUntilFirstUpdate:!0})],WaTreeItem.prototype,"handleExpandAnimation",1),__decorateClass([watch("lazy",{waitUntilFirstUpdate:!0})],WaTreeItem.prototype,"handleLazyChange",1),WaTreeItem=__decorateClass([t("wa-tree-item")],WaTreeItem),WaTreeItem.disableWarning?.("change-in-update");export{WaTreeItem}