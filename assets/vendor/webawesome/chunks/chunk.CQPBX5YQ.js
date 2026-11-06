/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{switch_styles_default}from"./chunk.MQLU5KE6.js";import{form_control_styles_default}from"./chunk.346V4PTX.js";import{l}from"./chunk.KZZR6Z6I.js";import{MirrorValidator}from"./chunk.R7QX4M6R.js";import{WebAwesomeFormAssociatedElement}from"./chunk.I3XGXHPO.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{o}from"./chunk.3MSWQ3RG.js";import{watch}from"./chunk.PZAN6FPN.js";import{e,n,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaSwitch=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.hasSlotController=new HasSlotController(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,MirrorValidator()]}get value(){return this._value??"on"}set value(e){this._value=e}get checked(){return this.valueHasChanged?Boolean(this._checked):this._checked??this.defaultChecked}set checked(e){this._checked=Boolean(e),this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(e){e.key==="ArrowLeft"&&(e.preventDefault(),this.checked=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),e.key==="ArrowRight"&&(e.preventDefault(),this.checked=!0,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(e){super.willUpdate(e),(e.has("value")||e.has("checked")||e.has("defaultChecked"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}setValue(e,t){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(e??"on",t)}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){const t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=!!this.hint||!!t;return x`
      <label
        part="base"
        class=${e2({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${o(this.name)}
          value=${o(this.value)}
          .checked=${l(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${e2({"has-slotted":e})}
        aria-hidden=${e?"false":"true"}
        >${this.hint}</slot
      >
    `}};WaSwitch.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0},WaSwitch.css=[form_control_styles_default,size_styles_default,switch_styles_default],__decorateClass([e('input[type="checkbox"]')],WaSwitch.prototype,"input",2),__decorateClass([n()],WaSwitch.prototype,"title",2),__decorateClass([n({reflect:!0})],WaSwitch.prototype,"name",2),__decorateClass([n({reflect:!0})],WaSwitch.prototype,"value",1),__decorateClass([n({reflect:!0})],WaSwitch.prototype,"size",2),__decorateClass([n({type:Boolean})],WaSwitch.prototype,"disabled",2),__decorateClass([n({type:Boolean,attribute:!1})],WaSwitch.prototype,"checked",1),__decorateClass([n({type:Boolean,attribute:"checked",reflect:!0})],WaSwitch.prototype,"defaultChecked",2),__decorateClass([n({type:Boolean,reflect:!0})],WaSwitch.prototype,"required",2),__decorateClass([n({attribute:"hint"})],WaSwitch.prototype,"hint",2),__decorateClass([n({attribute:"with-hint",type:Boolean})],WaSwitch.prototype,"withHint",2),__decorateClass([watch(["checked","defaultChecked"])],WaSwitch.prototype,"handleStateChange",1),__decorateClass([watch("disabled",{waitUntilFirstUpdate:!0})],WaSwitch.prototype,"handleDisabledChange",1),WaSwitch=__decorateClass([t("wa-switch")],WaSwitch),WaSwitch.disableWarning?.("change-in-update");export{WaSwitch}