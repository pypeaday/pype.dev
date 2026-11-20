/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{textarea_styles_default}from"./chunk.YRQJ7CY4.js";import{visually_hidden_styles_default}from"./chunk.I4KXAHPX.js";import{form_control_styles_default}from"./chunk.346V4PTX.js";import{l}from"./chunk.KZZR6Z6I.js";import{MirrorValidator}from"./chunk.R7QX4M6R.js";import{WebAwesomeFormAssociatedElement}from"./chunk.I3XGXHPO.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{o}from"./chunk.3MSWQ3RG.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{e,n,r,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaTextarea=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new HasSlotController(this,"hint","label"),this.localize=new LocalizeController(this),this.announcedCountText="",this.title="",this.name=null,this._value=null,this.defaultValue=this.getAttribute("value")??"",this.size="medium",this.appearance="outlined",this.label="",this.hint="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1,this.withCount=!1}static get validators(){return[...super.validators,MirrorValidator()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){if(this._value===e)return;this.valueHasChanged=!0,this._value=e}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{if(this.setTextareaDimensions(),this.updateResizeObserver(),this.didSSR&&this.input&&this.value!==this.input.value){const e=this.input.value;this.value=e}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.countAnnounceTimeout),this.resizeObserver?.disconnect(),this.resizeObserver=0[0]}updateResizeObserver(){const e=this.resize!=="none"&&this.resize!=="auto";e&&!this.resizeObserver&&this.input?(this.resizeObserver=new ResizeObserver(()=>this.setTextareaDimensions()),this.resizeObserver.observe(this.input)):!e&&this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=0[0])}handleBlur(){this.checkValidity()}handleChange(e){this.valueHasChanged=!0,this.value=this.input.value,this.setTextareaDimensions(),this.checkValidity(),this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleInput(e){this.valueHasChanged=!0,this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0}),this.scheduleCountAnnouncement()}scheduleCountAnnouncement(){clearTimeout(this.countAnnounceTimeout),this.countAnnounceTimeout=setTimeout(()=>{const e=(this.value??"").length;this.announcedCountText=this.maxlength!=null?this.localize.term("numCharactersRemaining",this.maxlength-e):this.localize.term("numCharacters",e)},1e3)}setTextareaDimensions(){if(this.resize==="none"){this.base.style.width=``,this.base.style.height=``;return}if(this.resize==="auto"){this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`,this.base.style.width=``,this.base.style.height=``;return}if(this.input.style.width){const e=Number(this.input.style.width.split(/px/)[0])+2;this.base.style.width=`${e}px`}if(this.input.style.height){const e=Number(this.input.style.height.split(/px/)[0])+2;this.base.style.height=`${e}px`}}handleRowsChange(){this.setTextareaDimensions()}async handleValueChange(){await this.updateComplete,this.checkValidity(),this.setTextareaDimensions()}updated(e){e.has("resize")&&(this.setTextareaDimensions(),this.updateResizeObserver()),super.updated(e),e.has("value")&&this.customStates.set("blank",!this.value)}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(e){return e?(typeof e.top=="number"&&(this.input.scrollTop=e.top),typeof e.left=="number"&&(this.input.scrollLeft=e.left),0[0]):{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(e,t,n="none"){this.input.setSelectionRange(e,t,n)}setRangeText(e,t,n,s="preserve"){const o=t??this.input.selectionStart,i=n??this.input.selectionEnd;this.input.setRangeText(e,o,i,s),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaDimensions())}formResetCallback(){this._value=null,this.input&&(this.input.value=this.value||""),super.formResetCallback()}render(){const s=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,i=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=!!this.label||!!s,t=!!this.hint||!!i,n=(this.value??"").length,a=this.maxlength!=null?this.localize.term("numCharactersRemaining",this.maxlength-n):this.localize.term("numCharacters",n);return x`
      <label
        part="form-control-label label"
        class=${e2({label:!0,"has-label":e})}
        for="input"
        aria-hidden=${e?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${o(this.name)}
          .value=${l(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o(this.placeholder)}
          rows=${o(this.rows)}
          minlength=${o(this.minlength)}
          maxlength=${o(this.maxlength)}
          autocapitalize=${o(this.autocapitalize)}
          autocorrect=${o(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${o(this.spellcheck)}
          enterkeyhint=${o(this.enterkeyhint)}
          inputmode=${o(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize!=="auto"}></div>
      </div>

      <div
        class=${e2({footer:!0,"has-count":this.withCount})}
      >
        <slot
          id="hint"
          name="hint"
          part="hint"
          aria-hidden=${t?"false":"true"}
          class=${e2({"has-slotted":t})}
          >${this.hint}</slot
        >

        ${this.withCount?x`
              <div part="count" class="count" aria-hidden="true">${a}</div>
              <div class="wa-visually-hidden-force" aria-live="polite">${this.announcedCountText}</div>
            `:""}
      </div>
    `}};WaTextarea.css=[textarea_styles_default,form_control_styles_default,size_styles_default,visually_hidden_styles_default],__decorateClass([r()],WaTextarea.prototype,"announcedCountText",2),__decorateClass([e(".control")],WaTextarea.prototype,"input",2),__decorateClass([e('[part~="base"]')],WaTextarea.prototype,"base",2),__decorateClass([e(".size-adjuster")],WaTextarea.prototype,"sizeAdjuster",2),__decorateClass([n()],WaTextarea.prototype,"title",2),__decorateClass([n({reflect:!0})],WaTextarea.prototype,"name",2),__decorateClass([r()],WaTextarea.prototype,"value",1),__decorateClass([n({attribute:"value",reflect:!0})],WaTextarea.prototype,"defaultValue",2),__decorateClass([n({reflect:!0})],WaTextarea.prototype,"size",2),__decorateClass([n({reflect:!0})],WaTextarea.prototype,"appearance",2),__decorateClass([n()],WaTextarea.prototype,"label",2),__decorateClass([n({attribute:"hint"})],WaTextarea.prototype,"hint",2),__decorateClass([n()],WaTextarea.prototype,"placeholder",2),__decorateClass([n({type:Number})],WaTextarea.prototype,"rows",2),__decorateClass([n({reflect:!0})],WaTextarea.prototype,"resize",2),__decorateClass([n({type:Boolean})],WaTextarea.prototype,"disabled",2),__decorateClass([n({type:Boolean,reflect:!0})],WaTextarea.prototype,"readonly",2),__decorateClass([n({type:Boolean,reflect:!0})],WaTextarea.prototype,"required",2),__decorateClass([n({type:Number})],WaTextarea.prototype,"minlength",2),__decorateClass([n({type:Number})],WaTextarea.prototype,"maxlength",2),__decorateClass([n()],WaTextarea.prototype,"autocapitalize",2),__decorateClass([n({type:Boolean,converter:{fromAttribute:e=>!!e&&e!=="off",toAttribute:e=>e?"on":"off"}})],WaTextarea.prototype,"autocorrect",2),__decorateClass([n()],WaTextarea.prototype,"autocomplete",2),__decorateClass([n({type:Boolean})],WaTextarea.prototype,"autofocus",2),__decorateClass([n()],WaTextarea.prototype,"enterkeyhint",2),__decorateClass([n({type:Boolean,converter:{fromAttribute:e=>!!e&&e!=="false",toAttribute:e=>e?"true":"false"}})],WaTextarea.prototype,"spellcheck",2),__decorateClass([n()],WaTextarea.prototype,"inputmode",2),__decorateClass([n({attribute:"with-label",type:Boolean})],WaTextarea.prototype,"withLabel",2),__decorateClass([n({attribute:"with-hint",type:Boolean})],WaTextarea.prototype,"withHint",2),__decorateClass([n({attribute:"with-count",type:Boolean,reflect:!0})],WaTextarea.prototype,"withCount",2),__decorateClass([watch("rows",{waitUntilFirstUpdate:!0})],WaTextarea.prototype,"handleRowsChange",1),__decorateClass([watch("value",{waitUntilFirstUpdate:!0})],WaTextarea.prototype,"handleValueChange",1),WaTextarea=__decorateClass([t("wa-textarea")],WaTextarea),WaTextarea.disableWarning?.("change-in-update");export{WaTextarea}