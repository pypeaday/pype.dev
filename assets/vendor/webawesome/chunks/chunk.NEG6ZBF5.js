/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{number_input_styles_default}from"./chunk.BEORUVOT.js";import{submitOnEnter}from"./chunk.DOFHHKB4.js";import{form_control_styles_default}from"./chunk.346V4PTX.js";import{l}from"./chunk.KZZR6Z6I.js";import{MirrorValidator}from"./chunk.R7QX4M6R.js";import{WebAwesomeFormAssociatedElement}from"./chunk.I3XGXHPO.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{o}from"./chunk.3MSWQ3RG.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{e,n,r,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaNumberInput=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new HasSlotController(this,"hint","label"),this.localize=new LocalizeController(this),this.title="",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.placeholder="",this.readonly=!1,this.required=!1,this.step=1,this.withoutSteppers=!1,this.inputmode="numeric",this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,MirrorValidator()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){if(this._value===e)return;this.valueHasChanged=!0,this._value=e}get isAtMin(){if(this.min===0[0])return!1;const e=parseFloat(this.value||"");return!isNaN(e)&&e<=this.min}get isAtMax(){if(this.max===0[0])return!1;const e=parseFloat(this.value||"");return!isNaN(e)&&e>=this.max}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleInput(){this.value=this.input.value}handleKeyDown(e){submitOnEnter(e,this),(e.key==="ArrowUp"||e.key==="ArrowDown")&&requestAnimationFrame(()=>{this.value!==this.input.value&&(this.value=this.input.value)})}handleStepperPointerUp(e,t){if(this.disabled||this.readonly)return;e==="up"?this.input.stepUp():this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),t.pointerType!=="touch"&&this.input.focus()}handleStepperPointerDown(e){if(e.pointerType==="touch")return;e.preventDefault(),this.input.focus()}updated(e){super.updated(e),e.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const n=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,s=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=!!this.label||!!n,t=!!this.hint||!!s;return x`
      <label
        part="form-control-label label"
        class=${e2({label:!0,"has-label":e})}
        for="input"
        aria-hidden=${e?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="number-field">
        ${this.withoutSteppers?"":x`
              <button
                part="stepper stepper-decrement"
                class="stepper stepper-decrement"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("decrement")}
                ?disabled=${this.disabled||this.readonly||this.isAtMin}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${e=>this.handleStepperPointerUp("down",e)}
              >
                <slot name="decrement-icon">
                  <wa-icon name="minus" library="system"></wa-icon>
                </slot>
              </button>
            `}

        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type="number"
          inputmode=${o(this.inputmode)}
          title=${this.title}
          name=${o(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o(this.placeholder)}
          min=${o(this.min)}
          max=${o(this.max)}
          step=${o(this.step)}
          .value=${l(this.value??"")}
          autocomplete=${o(this.autocomplete)}
          ?autofocus=${this.autofocus}
          enterkeyhint=${o(this.enterkeyhint)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end" part="end" class="end"></slot>

        ${this.withoutSteppers?"":x`
              <button
                part="stepper stepper-increment"
                class="stepper stepper-increment"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("increment")}
                ?disabled=${this.disabled||this.readonly||this.isAtMax}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${e=>this.handleStepperPointerUp("up",e)}
              >
                <slot name="increment-icon">
                  <wa-icon name="plus" library="system"></wa-icon>
                </slot>
              </button>
            `}
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${e2({"has-slotted":t})}
        aria-hidden=${t?"false":"true"}
        >${this.hint}</slot
      >
    `}};WaNumberInput.css=[size_styles_default,form_control_styles_default,number_input_styles_default],WaNumberInput.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0},__decorateClass([e("input")],WaNumberInput.prototype,"input",2),__decorateClass([n()],WaNumberInput.prototype,"title",2),__decorateClass([r()],WaNumberInput.prototype,"value",1),__decorateClass([n({attribute:"value",reflect:!0})],WaNumberInput.prototype,"defaultValue",2),__decorateClass([n({reflect:!0})],WaNumberInput.prototype,"size",2),__decorateClass([n({reflect:!0})],WaNumberInput.prototype,"appearance",2),__decorateClass([n({type:Boolean,reflect:!0})],WaNumberInput.prototype,"pill",2),__decorateClass([n()],WaNumberInput.prototype,"label",2),__decorateClass([n({attribute:"hint"})],WaNumberInput.prototype,"hint",2),__decorateClass([n()],WaNumberInput.prototype,"placeholder",2),__decorateClass([n({type:Boolean,reflect:!0})],WaNumberInput.prototype,"readonly",2),__decorateClass([n({type:Boolean,reflect:!0})],WaNumberInput.prototype,"required",2),__decorateClass([n({type:Number})],WaNumberInput.prototype,"min",2),__decorateClass([n({type:Number})],WaNumberInput.prototype,"max",2),__decorateClass([n()],WaNumberInput.prototype,"step",2),__decorateClass([n({attribute:"without-steppers",type:Boolean})],WaNumberInput.prototype,"withoutSteppers",2),__decorateClass([n()],WaNumberInput.prototype,"autocomplete",2),__decorateClass([n({type:Boolean})],WaNumberInput.prototype,"autofocus",2),__decorateClass([n()],WaNumberInput.prototype,"enterkeyhint",2),__decorateClass([n()],WaNumberInput.prototype,"inputmode",2),__decorateClass([n({attribute:"with-label",type:Boolean})],WaNumberInput.prototype,"withLabel",2),__decorateClass([n({attribute:"with-hint",type:Boolean})],WaNumberInput.prototype,"withHint",2),__decorateClass([watch("step",{waitUntilFirstUpdate:!0})],WaNumberInput.prototype,"handleStepChange",1),WaNumberInput=__decorateClass([t("wa-number-input")],WaNumberInput),WaNumberInput.disableWarning?.("change-in-update");export{WaNumberInput}