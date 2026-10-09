/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{select_styles_default}from"./chunk.SY6FPYGW.js";import{o as o2}from"./chunk.2BXLTQVW.js";import{scrollIntoView}from"./chunk.VQZ46MYI.js";import{WaClearEvent}from"./chunk.JTOY5KP3.js";import{isTopDismissible,registerDismissible,unregisterDismissible}from"./chunk.52WA2DJO.js";import{WaShowEvent}from"./chunk.4ZAKP7NY.js";import{WaHideEvent}from"./chunk.MQODJ75V.js";import{WaAfterHideEvent}from"./chunk.3NKIHICW.js";import{WaAfterShowEvent}from"./chunk.PX3HMKF7.js";import{waitForEvent}from"./chunk.F25QOBDY.js";import{animateWithClass}from"./chunk.L6CIKOFQ.js";import{RequiredValidator}from"./chunk.SDDRXMOC.js";import{form_control_styles_default}from"./chunk.346V4PTX.js";import{WebAwesomeFormAssociatedElement}from"./chunk.I3XGXHPO.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{e,n,r,t}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaSelect=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.cachedOptions=null,this.hasSlotController=new HasSlotController(this,"hint","label"),this.localize=new LocalizeController(this),this.selectionOrder=new Map,this.typeToSelectString="",this.slotChangePending=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=e=>x`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${e.value}
          @wa-remove=${t=>this.handleTagRemove(t,e)}
        >
          ${e.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=e=>{const t=e.composedPath();this&&!t.includes(this)&&this.hide()},this.handleDocumentKeyDown=e=>{const t=e.target,n=t.closest('[part~="clear-button"]')!==null,s=t.closest("wa-button")!==null;if(n||s)return;if(e.key==="Escape"&&this.open&&isTopDismissible(this)&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),e.key==="Enter"||e.key===" "&&this.typeToSelectString===""){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){const n=this.getAllOptions(),s=n.indexOf(this.currentOption);let t=Math.max(0,s);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(t=s+1,t>n.length-1&&(t=0)):e.key==="ArrowUp"?(t=s-1,t<0&&(t=n.length-1)):e.key==="Home"?t=0:e.key==="End"&&(t=n.length-1),this.setCurrentOption(n[t])}if(e.key?.length===1||e.key==="Backspace"){const t=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key==="Backspace")return;this.show()}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(const e of t){const n=e.label.toLowerCase();if(n.startsWith(this.typeToSelectString)){this.setCurrentOption(e);break}}}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this&&!t.includes(this)&&this.hide()}}static get validators(){const e=o?[]:[RequiredValidator({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...e]}get validationTarget(){return this.valueInput}set defaultValue(e){this._defaultValue=this.convertDefaultValue(e)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(e,t){return e==null&&t==null||e!=null&&t!=null&&e.length===t.length&&e.every((e,n)=>e===t[n])}convertDefaultValue(e){const t=this.multiple||this.hasAttribute("multiple");return!t&&Array.isArray(e)&&(e=e[0]),e}set value(e){let t=this.value;e instanceof FormData&&(e=e.getAll(this.name)),e!=null&&!Array.isArray(e)&&(e=[e]);const n=this._value;this._value=e??null,this.rawValuesEqual(n,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",t))}get value(){let e=this._value??this.defaultValue??null;e!=null&&(e=Array.isArray(e)?e:[e]),this.optionValues=new Set(this.getAllOptions().filter(e=>!e.disabled).map(e=>e.value));let t=e;return e!=null&&(t=e.filter(e=>this.optionValues.has(e)),t=this.multiple?t:t[0],t=t??null),t}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){const t=this.getAllOptions(),e=t.filter(e=>e.hasAttribute("selected")||e.defaultSelected);if(e.length>0){const t=e.map(e=>e.value);this._defaultValue=this.multiple?t:t[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),registerDismissible(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),unregisterDismissible(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(e){e.preventDefault()}handleComboboxMouseDown(e){const t=e.composedPath(),n=t.some(e=>e instanceof Element&&e.tagName.toLowerCase()==="wa-button");if(this.disabled||n)return;e.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open}handleComboboxKeyDown(e){e.stopPropagation(),this.handleDocumentKeyDown(e)}handleClearClick(e){e.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,this.value!==null&&(this.displayLabel="",this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new WaClearEvent),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault()}handleOptionClick(e){const n=e.target,t=n.closest("wa-option");t&&!t.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(t):this.setSelectedOptions(t),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){if(this.slotChangePending)return;this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()})}processSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.cachedOptions=null;const t=this.getAllOptions();this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);const n=t.filter(t=>e.includes(t.value));this.setSelectedOptions(n)}handleTagRemove(e,t){if(e.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let n=t;if(!n){const t=e.target.closest("wa-tag[data-value]");if(t){const e=t.dataset.value;n=this.selectedOptions.find(t=>t.value===e)}}n&&(this.toggleOptionSelection(n,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(e){const t=this.getAllOptions();t.forEach(e=>{e.current=!1,e.tabIndex=-1}),e&&(this.currentOption=e,e.current=!0,e.tabIndex=0,e.focus({preventScroll:!0}))}setSelectedOptions(e){const n=this.getAllOptions(),t=Array.isArray(e)?e:[e];n.forEach(e=>{if(t.includes(e))return;e.selected=!1}),t.length&&t.forEach(e=>e.selected=!0),this.selectionChanged()}toggleOptionSelection(e,t){t===!0||t===!1?e.selected=t:e.selected=!e.selected,this.selectionChanged()}selectionChanged(){const n=this.getAllOptions(),e=n.filter(e=>{if(!this.hasInteracted&&!this.valueHasChanged){const t=this.defaultValue,n=Array.isArray(t)?t:[t];return e.hasAttribute("selected")||e.defaultSelected||e.selected||n?.includes(e.value)}return e.selected}),s=new Set(e.map(e=>e.value));for(const e of this.selectionOrder.keys())s.has(e)||this.selectionOrder.delete(e);const o=this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1;let i=o+1;for(const t of e)this.selectionOrder.has(t.value)||this.selectionOrder.set(t.value,i++);this.selectedOptions=e.sort((e,t)=>{const n=this.selectionOrder.get(e.value)??0,s=this.selectionOrder.get(t.value)??0;return n-s});let t=new Set(this.selectedOptions.map(e=>e.value));if(t.size>0||this._value){const e=this._value;if(this._value==null){let e=this.defaultValue??[];this._value=Array.isArray(e)?e:[e]}this._value=this._value?.filter(e=>!this.optionValues?.has(e))??null,this._value?.unshift(...t),this.requestUpdate("value",e)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const e=this.selectedOptions[0];this.displayLabel=e?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){const n=this.getTag(e,t);return n?typeof n=="string"?o2(n):n:null}return t===this.maxOptionsVisible?x`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-t}</wa-tag
          >
        `:null})}updated(e){super.updated(e),(e.has("value")||e.has("displayLabel"))&&this.customStates.set("blank",!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value],n=e.filter(e=>t.includes(e.value));this.setSelectedOptions(n),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const e=new WaShowEvent;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await animateWithClass(this.popup.popup,"show"),this.currentOption&&scrollIntoView(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new WaAfterShowEvent)}else{const e=new WaHideEvent;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await animateWithClass(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new WaAfterHideEvent)}}async show(){return this.open||this.disabled?(this.open=!1,0[0]):(this.open=!0,waitForEvent(this,"wa-after-show"))}async hide(){return!this.open||this.disabled?(this.open=!1,0[0]):(this.open=!1,waitForEvent(this,"wa-after-hide"))}focus(e){this.displayInput.focus(e)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const n=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,s=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=!!this.label||!!n,t=!!this.hint||!!s,i=(this.hasUpdated||o)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return x`
      <div
        part="form-control"
        class=${e2({"form-control":!0,"form-control-has-label":e})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${e2({label:!0,"has-label":e})}
          aria-hidden=${e?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${e2({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?x`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${i?x`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${e2({"has-slotted":t})}
          aria-hidden=${t?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};WaSelect.css=[select_styles_default,form_control_styles_default,size_styles_default],__decorateClass([e(".select")],WaSelect.prototype,"popup",2),__decorateClass([e(".combobox")],WaSelect.prototype,"combobox",2),__decorateClass([e(".display-input")],WaSelect.prototype,"displayInput",2),__decorateClass([e(".value-input")],WaSelect.prototype,"valueInput",2),__decorateClass([e(".listbox")],WaSelect.prototype,"listbox",2),__decorateClass([r()],WaSelect.prototype,"displayLabel",2),__decorateClass([r()],WaSelect.prototype,"currentOption",2),__decorateClass([r()],WaSelect.prototype,"selectedOptions",2),__decorateClass([n({reflect:!0})],WaSelect.prototype,"name",2),__decorateClass([n({attribute:!1})],WaSelect.prototype,"defaultValue",1),__decorateClass([n({attribute:"value",reflect:!1})],WaSelect.prototype,"value",1),__decorateClass([n({reflect:!0})],WaSelect.prototype,"size",2),__decorateClass([n()],WaSelect.prototype,"placeholder",2),__decorateClass([n({type:Boolean,reflect:!0})],WaSelect.prototype,"multiple",2),__decorateClass([n({attribute:"max-options-visible",type:Number})],WaSelect.prototype,"maxOptionsVisible",2),__decorateClass([n({type:Boolean})],WaSelect.prototype,"disabled",2),__decorateClass([n({attribute:"with-clear",type:Boolean})],WaSelect.prototype,"withClear",2),__decorateClass([n({type:Boolean,reflect:!0})],WaSelect.prototype,"open",2),__decorateClass([n({reflect:!0})],WaSelect.prototype,"appearance",2),__decorateClass([n({type:Boolean,reflect:!0})],WaSelect.prototype,"pill",2),__decorateClass([n()],WaSelect.prototype,"label",2),__decorateClass([n({reflect:!0})],WaSelect.prototype,"placement",2),__decorateClass([n({attribute:"hint"})],WaSelect.prototype,"hint",2),__decorateClass([n({attribute:"with-label",type:Boolean})],WaSelect.prototype,"withLabel",2),__decorateClass([n({attribute:"with-hint",type:Boolean})],WaSelect.prototype,"withHint",2),__decorateClass([n({type:Boolean,reflect:!0})],WaSelect.prototype,"required",2),__decorateClass([n({attribute:!1})],WaSelect.prototype,"getTag",2),__decorateClass([watch("disabled",{waitUntilFirstUpdate:!0})],WaSelect.prototype,"handleDisabledChange",1),__decorateClass([watch("value",{waitUntilFirstUpdate:!0})],WaSelect.prototype,"handleValueChange",1),__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaSelect.prototype,"handleOpenChange",1),WaSelect=__decorateClass([t("wa-select")],WaSelect),WaSelect.disableWarning?.("change-in-update");export{WaSelect}