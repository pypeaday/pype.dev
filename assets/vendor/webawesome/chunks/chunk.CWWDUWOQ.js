/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{RequiredValidator}from"./chunk.SDDRXMOC.js";import{form_control_styles_default}from"./chunk.346V4PTX.js";import{l}from"./chunk.KZZR6Z6I.js";import{checkbox_styles_default}from"./chunk.QRWQT2VJ.js";import{WebAwesomeFormAssociatedElement}from"./chunk.I3XGXHPO.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{o as o2}from"./chunk.3MSWQ3RG.js";import{watch}from"./chunk.PZAN6FPN.js";import{e,n,t}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaCheckbox=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.hasSlotController=new HasSlotController(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){const e=o?[]:[RequiredValidator({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...e]}get value(){const e=this._value||"on";return this.checked?e:null}set value(e){this._value=e}get checked(){return this.valueHasChanged?Boolean(this._checked):this._checked??this.defaultChecked}set checked(e){this._checked=Boolean(e),this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(e){super.willUpdate(e),(e.has("value")||e.has("checked")||e.has("defaultChecked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){const n=!!o||this.hasSlotController.test("hint"),e=!!this.hint||!!n,t=!this.checked&&this.indeterminate,s=t?"indeterminate":"check",i=t?"indeterminate":"check";return x`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${o2(this.name)}
            value=${o2(this._value)}
            .indeterminate=${l(this.indeterminate)}
            .checked=${l(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${i}-icon icon" library="system" name=${s}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${e2({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};WaCheckbox.css=[form_control_styles_default,size_styles_default,checkbox_styles_default],WaCheckbox.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0},__decorateClass([e('input[type="checkbox"]')],WaCheckbox.prototype,"input",2),__decorateClass([n()],WaCheckbox.prototype,"title",2),__decorateClass([n({reflect:!0})],WaCheckbox.prototype,"name",2),__decorateClass([n({reflect:!0})],WaCheckbox.prototype,"value",1),__decorateClass([n({reflect:!0})],WaCheckbox.prototype,"size",2),__decorateClass([n({type:Boolean})],WaCheckbox.prototype,"disabled",2),__decorateClass([n({type:Boolean,reflect:!0})],WaCheckbox.prototype,"indeterminate",2),__decorateClass([n({type:Boolean,attribute:!1})],WaCheckbox.prototype,"checked",1),__decorateClass([n({type:Boolean,reflect:!0,attribute:"checked"})],WaCheckbox.prototype,"defaultChecked",2),__decorateClass([n({type:Boolean,reflect:!0})],WaCheckbox.prototype,"required",2),__decorateClass([n()],WaCheckbox.prototype,"hint",2),__decorateClass([watch(["checked","defaultChecked"])],WaCheckbox.prototype,"handleDefaultCheckedChange",1),__decorateClass([watch(["checked","indeterminate"])],WaCheckbox.prototype,"handleStateChange",1),__decorateClass([watch("disabled")],WaCheckbox.prototype,"handleDisabledChange",1),WaCheckbox=__decorateClass([t("wa-checkbox")],WaCheckbox),WaCheckbox.disableWarning?.("change-in-update");export{WaCheckbox}