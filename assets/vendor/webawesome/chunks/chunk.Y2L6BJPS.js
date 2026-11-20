/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{WaClearEvent}from"./chunk.JTOY5KP3.js";import{submitOnEnter}from"./chunk.DOFHHKB4.js";import{input_styles_default}from"./chunk.BE5VT7MB.js";import{form_control_styles_default}from"./chunk.346V4PTX.js";import{l}from"./chunk.KZZR6Z6I.js";import{MirrorValidator}from"./chunk.R7QX4M6R.js";import{WebAwesomeFormAssociatedElement}from"./chunk.I3XGXHPO.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{o as o2}from"./chunk.3MSWQ3RG.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{e,n,r,t}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaInput=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new HasSlotController(this,"hint","label"),this.localize=new LocalizeController(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,MirrorValidator()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){if(this._value===e)return;this.valueHasChanged=!0,this._value=e}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new WaClearEvent),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(e){submitOnEnter(e,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(e){super.updated(e),(e.has("value")||e.has("defaultValue"))&&(this.customStates.set("blank",!this.value),this.updateValidity())}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,n="none"){this.input.setSelectionRange(e,t,n)}setRangeText(e,t,n,s="preserve"){const o=t??this.input.selectionStart,i=n??this.input.selectionEnd;this.input.setRangeText(e,o,i,s),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){const n=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,s=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=!!this.label||!!n,t=!!this.hint||!!s,i=this.withClear&&!this.disabled&&!this.readonly,a=(o||this.hasUpdated)&&i&&(typeof this.value=="number"||this.value&&this.value.length>0);return x`
      <label
        part="form-control-label label"
        class=${e2({label:!0,"has-label":e})}
        for="input"
        aria-hidden=${e?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${o2(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o2(this.placeholder)}
          minlength=${o2(this.minlength)}
          maxlength=${o2(this.maxlength)}
          min=${o2(this.min)}
          max=${o2(this.max)}
          step=${o2(this.step)}
          .value=${l(this.value??"")}
          autocapitalize=${o2(this.autocapitalize)}
          autocomplete=${o2(this.autocomplete)}
          autocorrect=${this.autocorrect?"on":"off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${o2(this.pattern)}
          enterkeyhint=${o2(this.enterkeyhint)}
          inputmode=${o2(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${a?x`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:""}
        ${this.passwordToggle&&!this.disabled?x`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?x`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:x`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${e2({"has-slotted":t})}
        aria-hidden=${t?"false":"true"}
        >${this.hint}</slot
      >
    `}};WaInput.css=[size_styles_default,form_control_styles_default,input_styles_default],WaInput.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0},__decorateClass([e("input")],WaInput.prototype,"input",2),__decorateClass([n()],WaInput.prototype,"title",2),__decorateClass([n({reflect:!0})],WaInput.prototype,"type",2),__decorateClass([r()],WaInput.prototype,"value",1),__decorateClass([n({attribute:"value",reflect:!0})],WaInput.prototype,"defaultValue",2),__decorateClass([n({reflect:!0})],WaInput.prototype,"size",2),__decorateClass([n({reflect:!0})],WaInput.prototype,"appearance",2),__decorateClass([n({type:Boolean,reflect:!0})],WaInput.prototype,"pill",2),__decorateClass([n()],WaInput.prototype,"label",2),__decorateClass([n({attribute:"hint"})],WaInput.prototype,"hint",2),__decorateClass([n({attribute:"with-clear",type:Boolean})],WaInput.prototype,"withClear",2),__decorateClass([n()],WaInput.prototype,"placeholder",2),__decorateClass([n({type:Boolean,reflect:!0})],WaInput.prototype,"readonly",2),__decorateClass([n({attribute:"password-toggle",type:Boolean})],WaInput.prototype,"passwordToggle",2),__decorateClass([n({attribute:"password-visible",type:Boolean})],WaInput.prototype,"passwordVisible",2),__decorateClass([n({attribute:"without-spin-buttons",type:Boolean,reflect:!0})],WaInput.prototype,"withoutSpinButtons",2),__decorateClass([n({type:Boolean,reflect:!0})],WaInput.prototype,"required",2),__decorateClass([n()],WaInput.prototype,"pattern",2),__decorateClass([n({type:Number})],WaInput.prototype,"minlength",2),__decorateClass([n({type:Number})],WaInput.prototype,"maxlength",2),__decorateClass([n()],WaInput.prototype,"min",2),__decorateClass([n()],WaInput.prototype,"max",2),__decorateClass([n()],WaInput.prototype,"step",2),__decorateClass([n()],WaInput.prototype,"autocapitalize",2),__decorateClass([n({type:Boolean,converter:{fromAttribute:e=>!!e&&e!=="off",toAttribute:e=>e?"on":"off"}})],WaInput.prototype,"autocorrect",2),__decorateClass([n()],WaInput.prototype,"autocomplete",2),__decorateClass([n({type:Boolean})],WaInput.prototype,"autofocus",2),__decorateClass([n()],WaInput.prototype,"enterkeyhint",2),__decorateClass([n({type:Boolean,converter:{fromAttribute:e=>!!e&&e!=="false",toAttribute:e=>e?"true":"false"}})],WaInput.prototype,"spellcheck",2),__decorateClass([n()],WaInput.prototype,"inputmode",2),__decorateClass([n({attribute:"with-label",type:Boolean})],WaInput.prototype,"withLabel",2),__decorateClass([n({attribute:"with-hint",type:Boolean})],WaInput.prototype,"withHint",2),__decorateClass([watch("step",{waitUntilFirstUpdate:!0})],WaInput.prototype,"handleStepChange",1),WaInput=__decorateClass([t("wa-input")],WaInput),WaInput.disableWarning?.("change-in-update");export{WaInput}