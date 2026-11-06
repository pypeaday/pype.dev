/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var page_mobile_styles_default=(e="768px")=>`
  @media screen and (width < ${e}) {
    [part~='navigation'] {
      display: none;
    }

    :host(:not([disable-navigation-toggle])) slot[name~='navigation-toggle'] {
      display: contents;
    }
  }
`;export{page_mobile_styles_default}