/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{avatar_styles_default}from"./chunk.4VXUYGRW.js";import{WaErrorEvent}from"./chunk.YDQCS2HK.js";import{watch}from"./chunk.PZAN6FPN.js";import{WebAwesomeElement,n,r,t}from"./chunk.K4C5PQDP.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";var WaAvatar=class extends WebAwesomeElement{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.dispatchEvent(new WaErrorEvent)}render(){const t=x`
      <img
        part="image"
        class="image"
        src="${this.image}"
        loading="${this.loading}"
        role="img"
        aria-label=${this.label}
        @error="${this.handleImageLoadError}"
      />
    `;let e=x``;return this.initials?e=x`<div part="initials" class="initials" role="img" aria-label=${this.label}>
        ${this.initials}
      </div>`:e=x`
        <slot name="icon" part="icon" class="icon" role="img" aria-label=${this.label}>
          <wa-icon name="user" library="system" variant="solid"></wa-icon>
        </slot>
      `,x` ${this.image&&!this.hasError?t:e} `}};WaAvatar.css=avatar_styles_default,__decorateClass([r()],WaAvatar.prototype,"hasError",2),__decorateClass([n()],WaAvatar.prototype,"image",2),__decorateClass([n()],WaAvatar.prototype,"label",2),__decorateClass([n()],WaAvatar.prototype,"initials",2),__decorateClass([n()],WaAvatar.prototype,"loading",2),__decorateClass([n({reflect:!0})],WaAvatar.prototype,"shape",2),__decorateClass([watch("image")],WaAvatar.prototype,"handleImageChange",1),WaAvatar=__decorateClass([t("wa-avatar")],WaAvatar);export{WaAvatar}