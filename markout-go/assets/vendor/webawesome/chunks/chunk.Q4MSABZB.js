/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{slider_styles_default}from"./chunk.6HCLC3WA.js";import{submitOnEnter}from"./chunk.DOFHHKB4.js";import{DraggableElement}from"./chunk.WYNTFJHW.js";import{clamp}from"./chunk.O6IZ4I7T.js";import{form_control_styles_default}from"./chunk.346V4PTX.js";import{WebAwesomeFormAssociatedElement}from"./chunk.I3XGXHPO.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{o}from"./chunk.BQNDCXAL.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{e,n,r,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var SliderValidator=()=>({observedAttributes:["min","max","step"],checkValidity(e){const t={message:"",isValid:!0,invalidKeys:[]},n=(e,t,n,s)=>{const o=document.createElement("input");return o.type="range",o.min=String(t),o.max=String(n),o.step=String(s),o.value=String(e),o.checkValidity(),o.validationMessage};if(e.isRange){{const s=e.minValue,o=e.maxValue;if(s<e.min)return t.isValid=!1,t.invalidKeys.push("rangeUnderflow"),t.message=n(s,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,t;if(o>e.max)return t.isValid=!1,t.invalidKeys.push("rangeOverflow"),t.message=n(o,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,t;if(e.step&&e.step!==1){const i=(s-e.min)%e.step!==0,a=(o-e.min)%e.step!==0;if(i||a){t.isValid=!1,t.invalidKeys.push("stepMismatch");const a=i?s:o;return t.message=n(a,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,t}}}}else{const s=e.value;if(s<e.min)return t.isValid=!1,t.invalidKeys.push("rangeUnderflow"),t.message=n(s,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,t;if(s>e.max)return t.isValid=!1,t.invalidKeys.push("rangeOverflow"),t.message=n(s,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,t;if(e.step&&e.step!==1&&(s-e.min)%e.step!==0)return t.isValid=!1,t.invalidKeys.push("stepMismatch"),t.message=n(s,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,t}return t}}),WaSlider=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new HasSlotController(this,"hint","label"),this.localize=new LocalizeController(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=this.getAttribute("value")==null?this.minValue:Number(this.getAttribute("value")),this._value=null,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="medium",this.min=0,this.max=100,this.step=1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,SliderValidator()]}get focusableAnchor(){return this.isRange?this.thumbMin||this.slider:this.slider}get validationTarget(){return this.focusableAnchor}get value(){if(this.valueHasChanged){const e=this._value??this.minValue??0;return clamp(e,this.min,this.max)}const e=this._value??this.defaultValue;return clamp(e,this.min,this.max)}set value(e){if(e=Number(e)??this.minValue,this._value===e)return;this.valueHasChanged=!0,this._value=e}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new DraggableElement(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(e,t)=>{this.setThumbValueFromCoordinates(e,t,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=0[0],this.activeThumb=null}}),this.draggableThumbMax=new DraggableElement(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(e,t)=>{this.setThumbValueFromCoordinates(e,t,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=0[0],this.activeThumb=null}}),this.draggableTrack=new DraggableElement(this.track,{start:(e,t)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue;else{const n=this.getValueFromCoordinates(e,t),s=Math.abs(n-this.minValue),o=Math.abs(n-this.maxValue);if(s===o)if(n>this.maxValue)this.activeThumb="max";else if(n<this.minValue)this.activeThumb="min";else{const i=this.localize.dir()==="rtl",s=this.orientation==="vertical",n=s?t:e,o=this.lastTrackPosition||n;this.lastTrackPosition=n;const a=n>o!==i&&!s||n<o&&s;this.activeThumb=a?"max":"min"}else this.activeThumb=s<=o?"min":"max";this.valueWhenDraggingStarted=this.activeThumb==="min"?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(e,t,this.activeThumb),this.showRangeTooltips()},move:(e,t)=>{this.activeThumb&&this.setThumbValueFromCoordinates(e,t,this.activeThumb)},stop:()=>{if(this.activeThumb){const e=this.activeThumb==="min"?this.minValue:this.maxValue;e!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=0[0],this.activeThumb=null}})):this.draggableTrack=new DraggableElement(this.slider,{start:(e,t)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(e,t),this.showTooltip()},move:(e,t)=>{this.setValueFromCoordinates(e,t)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=0[0]}})}willUpdate(e){this.isRange&&(e.has("minValue")||e.has("maxValue")||e.has("min")||e.has("max"))&&(this.minValue=clamp(this.minValue,this.min,this.maxValue),this.maxValue=clamp(this.maxValue,this.minValue,this.max)),super.willUpdate(e)}updated(e){if(this.isRange&&(e.has("minValue")||e.has("maxValue"))&&this.updateFormValue(),e.has("disabled")||e.has("readonly")){const e=!this.disabled&&!this.readonly;this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(e),this.draggableThumbMax&&this.draggableThumbMax.toggle(e)),this.draggableTrack&&this.draggableTrack.toggle(e)}super.updated(e)}formDisabledCallback(e){this.disabled=e}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):(this._value=null,this.defaultValue=this.defaultValue??parseFloat(this.getAttribute("value")??String(this.min))),this.valueHasChanged=!1,this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(e){const n=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length,t=Number(this.step),s=Number(this.min),o=Number(this.max);return e=Math.round(e/t)*t,e=clamp(e,s,o),parseFloat(e.toFixed(n))}getPercentageFromValue(e){return(e-this.min)/(this.max-this.min)*100}getValueFromCoordinates(e,t){const{top:a,right:r,bottom:c,left:l,height:d,width:u}=this.trackBoundingClientRect,i=this.localize.dir()==="rtl",s=this.orientation==="vertical",o=s?t:e,n=s?{start:a,end:c,size:d}:{start:l,end:r,size:u},h=s?n.end-o:i?n.end-o:o-n.start,m=h/n.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*m)}handleBlur(){this.isRange?requestAnimationFrame(()=>{const e=this.shadowRoot?.activeElement,t=e===this.thumbMin||e===this.thumbMax;t||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(e){const t=e.target;this.isRange?(t===this.thumbMin?this.activeThumb="min":t===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(e){const s=this.localize.dir()==="rtl",o=e.target;if(this.disabled||this.readonly)return;if(this.isRange&&(o===this.thumbMin?this.activeThumb="min":o===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;const n=this.isRange?this.activeThumb==="min"?this.minValue:this.maxValue:this.value;let t=n;switch(e.key){case"ArrowUp":case s?"ArrowLeft":"ArrowRight":e.preventDefault(),t=this.clampAndRoundToStep(n+this.step);break;case"ArrowDown":case s?"ArrowRight":"ArrowLeft":e.preventDefault(),t=this.clampAndRoundToStep(n-this.step);break;case"Home":e.preventDefault(),t=this.isRange&&this.activeThumb==="min"?this.min:this.isRange?this.minValue:this.min;break;case"End":e.preventDefault(),t=this.isRange&&this.activeThumb==="max"?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":e.preventDefault();const o=Math.max(n+(this.max-this.min)/10,n+this.step);t=this.clampAndRoundToStep(o);break;case"PageDown":e.preventDefault();const i=Math.min(n-(this.max-this.min)/10,n-this.step);t=this.clampAndRoundToStep(i);break;case"Enter":submitOnEnter(e,this);return}if(t===n)return;this.isRange?(this.activeThumb==="min"?t>this.maxValue?(this.maxValue=t,this.minValue=t):this.minValue=Math.max(this.min,t):t<this.minValue?(this.minValue=t,this.maxValue=t):this.maxValue=Math.min(this.max,t),this.updateFormValue()):this.value=clamp(t,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0}handleLabelPointerDown(e){e.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(e,t){const n=this.value;this.value=this.getValueFromCoordinates(e,t),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(e,t,n){const s=this.getValueFromCoordinates(e,t),o=n==="min"?this.minValue:this.maxValue;n==="min"?s>this.maxValue?(this.maxValue=s,this.minValue=s):this.minValue=Math.max(this.min,s):s<this.minValue?(this.minValue=s,this.maxValue=s):this.maxValue=Math.min(this.max,s),o!==(n==="min"?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;const e=this.shadowRoot?.getElementById("tooltip-thumb-min"),t=this.shadowRoot?.getElementById("tooltip-thumb-max");this.activeThumb==="min"?(e&&(e.open=!0),t&&(t.open=!1)):this.activeThumb==="max"&&(t&&(t.open=!0),e&&(e.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;const e=this.shadowRoot?.getElementById("tooltip-thumb-min"),t=this.shadowRoot?.getElementById("tooltip-thumb-max");e&&(e.open=!1),t&&(t.open=!1)}updateFormValue(){if(this.isRange){const e=new FormData;e.append(this.name||"",String(this.minValue)),e.append(this.name||"",String(this.maxValue)),this.setValue(e)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){if(this.isRange){const e=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=clamp(e,this.min,this.maxValue),this.updateFormValue()}else{const e=this.clampAndRoundToStep(this.value-this.step);this.value=e}}stepUp(){if(this.isRange){const e=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=clamp(e,this.minValue,this.max),this.updateFormValue()}else{const e=this.clampAndRoundToStep(this.value+this.step);this.value=e}}render(){const h=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,m=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,n=!!this.label||!!h,d=!!this.hint||!!m,u=this.hasSlotController.test("reference"),s=e2({small:this.size==="small",medium:this.size==="medium",large:this.size==="large",horizontal:this.orientation==="horizontal",vertical:this.orientation==="vertical",disabled:this.disabled}),i=[];if(this.withMarkers)for(let e=this.min;e<=this.max;e+=this.step)i.push(this.getPercentageFromValue(e));const a=x`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${e2({vh:!n,"has-label":n})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,r=x`
      <div
        id="hint"
        part="hint"
        class=${e2({"has-slotted":d})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,t=this.withMarkers?x`
          <div id="markers" part="markers">
            ${i.map(e=>x`<span part="marker" class="marker" style=${o({"--position":`${e}%`})}></span>`)}
          </div>
        `:"",c=u?x`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",e=(e,t)=>this.withTooltip?x`
            <wa-tooltip
              id=${`tooltip${e!=="thumb"?"-"+e:""}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${e}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter=="function"?this.valueFormatter(t):this.localize.number(t)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){const n=clamp(this.getPercentageFromValue(this.minValue),0,100),i=clamp(this.getPercentageFromValue(this.maxValue),0,100);return x`
        ${a}

        <div id="slider" part="slider" class=${s}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${o({"--start":`${Math.min(n,i)}%`,"--end":`${Math.max(n,i)}%`})}
            ></div>

            ${t}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${o({"--position":`${n}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.minValue):this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (minimum value)`:"Minimum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style=${o({"--position":`${i}%`})}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.maxValue):this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (maximum value)`:"Maximum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>
          </div>

          ${c} ${r}
        </div>

        ${e("thumb-min",this.minValue)} ${e("thumb-max",this.maxValue)}
      `}const l=clamp(this.getPercentageFromValue(this.value),0,100),f=clamp(this.getPercentageFromValue(typeof this.indicatorOffset=="number"?this.indicatorOffset:this.min),0,100);return x`
        ${a}

        <div
          id="slider"
          part="slider"
          class=${s}
          role="slider"
          aria-disabled=${this.disabled?"true":"false"}
          aria-readonly=${this.disabled?"true":"false"}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${typeof this.valueFormatter=="function"?this.valueFormatter(this.value):this.localize.number(this.value)}
          aria-valuemax=${this.max}
          aria-labelledby="label"
          aria-describedby="hint"
          tabindex=${this.disabled?-1:0}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        >
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${o({"--start":`${f}%`,"--end":`${l}%`})}
            ></div>

            ${t}
            <span id="thumb" part="thumb" style=${o({"--position":`${l}%`})}></span>
          </div>

          ${c} ${r}
        </div>

        ${e("thumb",this.value)}
      `}};WaSlider.formAssociated=!0,WaSlider.observeSlots=!0,WaSlider.css=[size_styles_default,form_control_styles_default,slider_styles_default],__decorateClass([e("#slider")],WaSlider.prototype,"slider",2),__decorateClass([e("#thumb")],WaSlider.prototype,"thumb",2),__decorateClass([e("#thumb-min")],WaSlider.prototype,"thumbMin",2),__decorateClass([e("#thumb-max")],WaSlider.prototype,"thumbMax",2),__decorateClass([e("#track")],WaSlider.prototype,"track",2),__decorateClass([e("#tooltip")],WaSlider.prototype,"tooltip",2),__decorateClass([n()],WaSlider.prototype,"label",2),__decorateClass([n({attribute:"hint"})],WaSlider.prototype,"hint",2),__decorateClass([n({reflect:!0})],WaSlider.prototype,"name",2),__decorateClass([n({type:Number,attribute:"min-value"})],WaSlider.prototype,"minValue",2),__decorateClass([n({type:Number,attribute:"max-value"})],WaSlider.prototype,"maxValue",2),__decorateClass([n({attribute:"value",reflect:!0,type:Number})],WaSlider.prototype,"defaultValue",2),__decorateClass([r()],WaSlider.prototype,"value",1),__decorateClass([n({type:Boolean,reflect:!0})],WaSlider.prototype,"range",2),__decorateClass([n({type:Boolean})],WaSlider.prototype,"disabled",2),__decorateClass([n({type:Boolean,reflect:!0})],WaSlider.prototype,"readonly",2),__decorateClass([n({reflect:!0})],WaSlider.prototype,"orientation",2),__decorateClass([n({reflect:!0})],WaSlider.prototype,"size",2),__decorateClass([n({attribute:"indicator-offset",type:Number})],WaSlider.prototype,"indicatorOffset",2),__decorateClass([n({type:Number})],WaSlider.prototype,"min",2),__decorateClass([n({type:Number})],WaSlider.prototype,"max",2),__decorateClass([n({type:Number})],WaSlider.prototype,"step",2),__decorateClass([n({type:Boolean})],WaSlider.prototype,"autofocus",2),__decorateClass([n({attribute:"tooltip-distance",type:Number})],WaSlider.prototype,"tooltipDistance",2),__decorateClass([n({attribute:"tooltip-placement",reflect:!0})],WaSlider.prototype,"tooltipPlacement",2),__decorateClass([n({attribute:"with-markers",type:Boolean})],WaSlider.prototype,"withMarkers",2),__decorateClass([n({attribute:"with-tooltip",type:Boolean})],WaSlider.prototype,"withTooltip",2),__decorateClass([n({attribute:"with-label",type:Boolean})],WaSlider.prototype,"withLabel",2),__decorateClass([n({attribute:"with-hint",type:Boolean})],WaSlider.prototype,"withHint",2),__decorateClass([n({attribute:!1})],WaSlider.prototype,"valueFormatter",2),WaSlider=__decorateClass([t("wa-slider")],WaSlider);export{WaSlider}