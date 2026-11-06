/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */import{color_picker_styles_default}from"./chunk.YY6Y7UJD.js";import{drag}from"./chunk.WYNTFJHW.js";import{visually_hidden_styles_default}from"./chunk.I4KXAHPX.js";import{isTopDismissible,registerDismissible,unregisterDismissible}from"./chunk.52WA2DJO.js";import{clamp}from"./chunk.O6IZ4I7T.js";import{waitForEvent}from"./chunk.F25QOBDY.js";import{animateWithClass}from"./chunk.L6CIKOFQ.js";import{RequiredValidator}from"./chunk.SDDRXMOC.js";import{form_control_styles_default}from"./chunk.346V4PTX.js";import{WebAwesomeFormAssociatedElement}from"./chunk.I3XGXHPO.js";import{WaInvalidEvent}from"./chunk.VC3BPUZJ.js";import{e as e2}from"./chunk.KWDPKKFO.js";import{HasSlotController}from"./chunk.KIHB3VMB.js";import{size_styles_default}from"./chunk.MEYJNQF4.js";import{o as o3}from"./chunk.3MSWQ3RG.js";import{o as o2}from"./chunk.BQNDCXAL.js";import{LocalizeController}from"./chunk.G3ZVQTTB.js";import{watch}from"./chunk.PZAN6FPN.js";import{e,n,r,t,t2}from"./chunk.K4C5PQDP.js";import{o}from"./chunk.7OBLIRXR.js";import{x}from"./chunk.BKE5EYM3.js";import{__decorateClass}from"./chunk.JHZRD2LV.js";function bound01(e,t){isOnePointZero(e)&&(e="100%");const n=isPercentage(e);return e=t===360?e:Math.min(t,Math.max(0,parseFloat(e))),n&&(e=parseInt(String(e*t),10)/100),Math.abs(e-t)<1e-6?1:(t===360?e=(e<0?e%t+t:e%t)/parseFloat(String(t)):e=e%t/parseFloat(String(t)),e)}function clamp01(e){return Math.min(1,Math.max(0,e))}function isOnePointZero(e){return typeof e=="string"&&e.indexOf(".")!==-1&&parseFloat(e)===1}function isPercentage(e){return typeof e=="string"&&e.indexOf("%")!==-1}function boundAlpha(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function convertToPercentage(e){return Number(e)<=1?`${Number(e)*100}%`:e}function pad2(e){return e.length===1?"0"+e:String(e)}function rgbToRgb(e,t,n){return{r:bound01(e,255)*255,g:bound01(t,255)*255,b:bound01(n,255)*255}}function rgbToHsl(e,t,n){e=bound01(e,255),t=bound01(t,255),n=bound01(n,255);const s=Math.max(e,t,n),i=Math.min(e,t,n);let o=0,a=0;const r=(s+i)/2;if(s===i)a=0,o=0;else{const c=s-i;switch(a=r>.5?c/(2-s-i):c/(s+i),s){case e:o=(t-n)/c+(t<n?6:0);break;case t:o=(n-e)/c+2;break;case n:o=(e-t)/c+4;break;default:break}o/=6}return{h:o,s:a,l:r}}function hue2rgb(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*(6*n):n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function hslToRgb(e,t,n){let s,o,i;if(e=bound01(e,360),t=bound01(t,100),n=bound01(n,100),t===0)o=n,i=n,s=n;else{const a=n<.5?n*(1+t):n+t-n*t,r=2*n-a;s=hue2rgb(r,a,e+1/3),o=hue2rgb(r,a,e),i=hue2rgb(r,a,e-1/3)}return{r:s*255,g:o*255,b:i*255}}function rgbToHsv(e,t,n){e=bound01(e,255),t=bound01(t,255),n=bound01(n,255);const s=Math.max(e,t,n),a=Math.min(e,t,n);let o=0;const r=s,i=s-a,c=s===0?0:i/s;if(s===a)o=0;else{switch(s){case e:o=(t-n)/i+(t<n?6:0);break;case t:o=(n-e)/i+2;break;case n:o=(e-t)/i+4;break;default:break}o/=6}return{h:o,s:c,v:r}}function hsvToRgb(e,t,n){e=bound01(e,360)*6,t=bound01(t,100),n=bound01(n,100);const r=Math.floor(e),c=e-r,s=n*(1-t),o=n*(1-c*t),i=n*(1-(1-c)*t),a=r%6,l=[n,o,s,s,i,n][a],d=[i,n,n,o,s,s][a],u=[s,s,i,n,n,o][a];return{r:l*255,g:d*255,b:u*255}}function rgbToHex(e,t,n,s){const o=[pad2(Math.round(e).toString(16)),pad2(Math.round(t).toString(16)),pad2(Math.round(n).toString(16))];return s&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function rgbaToHex(e,t,n,s,o){const i=[pad2(Math.round(e).toString(16)),pad2(Math.round(t).toString(16)),pad2(Math.round(n).toString(16)),pad2(convertDecimalToHex(s))];return o&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))&&i[3].startsWith(i[3].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0)+i[3].charAt(0):i.join("")}function cmykToRgb(e,t,n,s){const i=e/100,a=t/100,r=n/100,o=s/100,c=255*(1-i)*(1-o),l=255*(1-a)*(1-o),d=255*(1-r)*(1-o);return{r:c,g:l,b:d}}function rgbToCmyk(e,t,n){let o=1-e/255,i=1-t/255,a=1-n/255,s=Math.min(o,i,a);return s===1?(o=0,i=0,a=0):(o=(o-s)/(1-s)*100,i=(i-s)/(1-s)*100,a=(a-s)/(1-s)*100),s*=100,{c:Math.round(o),m:Math.round(i),y:Math.round(a),k:Math.round(s)}}function convertDecimalToHex(e){return Math.round(parseFloat(e)*255).toString(16)}function convertHexToDecimal(e){return parseIntFromHex(e)/255}function parseIntFromHex(e){return parseInt(e,16)}function numberInputToObject(e){return{r:e>>16,g:(e&65280)>>8,b:e&255}}var CSS_INTEGER,CSS_NUMBER,CSS_UNIT,PERMISSIVE_MATCH3,PERMISSIVE_MATCH4,matchers,TinyColor,WaColorPicker,names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function inputToRGB(e){let t={r:0,g:0,b:0},o=1,i=null,a=null,r=null,n=!1,s=!1;return typeof e=="string"&&(e=stringInputToObject(e)),typeof e=="object"&&(isValidCSSUnit(e.r)&&isValidCSSUnit(e.g)&&isValidCSSUnit(e.b)?(t=rgbToRgb(e.r,e.g,e.b),n=!0,s=String(e.r).substr(-1)==="%"?"prgb":"rgb"):isValidCSSUnit(e.h)&&isValidCSSUnit(e.s)&&isValidCSSUnit(e.v)?(i=convertToPercentage(e.s),a=convertToPercentage(e.v),t=hsvToRgb(e.h,i,a),n=!0,s="hsv"):isValidCSSUnit(e.h)&&isValidCSSUnit(e.s)&&isValidCSSUnit(e.l)?(i=convertToPercentage(e.s),r=convertToPercentage(e.l),t=hslToRgb(e.h,i,r),n=!0,s="hsl"):isValidCSSUnit(e.c)&&isValidCSSUnit(e.m)&&isValidCSSUnit(e.y)&&isValidCSSUnit(e.k)&&(t=cmykToRgb(e.c,e.m,e.y,e.k),n=!0,s="cmyk"),Object.prototype.hasOwnProperty.call(e,"a")&&(o=e.a)),o=boundAlpha(o),{ok:n,format:e.format||s,r:Math.min(255,Math.max(t.r,0)),g:Math.min(255,Math.max(t.g,0)),b:Math.min(255,Math.max(t.b,0)),a:o}}CSS_INTEGER="[-\\+]?\\d+%?",CSS_NUMBER="[-\\+]?\\d*\\.\\d+%?",CSS_UNIT="(?:"+CSS_NUMBER+")|(?:"+CSS_INTEGER+")",PERMISSIVE_MATCH3="[\\s|\\(]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")\\s*\\)?",PERMISSIVE_MATCH4="[\\s|\\(]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")[,|\\s]+("+CSS_UNIT+")\\s*\\)?",matchers={CSS_UNIT:new RegExp(CSS_UNIT),rgb:new RegExp("rgb"+PERMISSIVE_MATCH3),rgba:new RegExp("rgba"+PERMISSIVE_MATCH4),hsl:new RegExp("hsl"+PERMISSIVE_MATCH3),hsla:new RegExp("hsla"+PERMISSIVE_MATCH4),hsv:new RegExp("hsv"+PERMISSIVE_MATCH3),hsva:new RegExp("hsva"+PERMISSIVE_MATCH4),cmyk:new RegExp("cmyk"+PERMISSIVE_MATCH4),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function stringInputToObject(e){if(e=e.trim().toLowerCase(),e.length===0)return!1;let n=!1;if(names[e])e=names[e],n=!0;else if(e==="transparent")return{r:0,g:0,b:0,a:0,format:"name"};let t=matchers.rgb.exec(e);return t?{r:t[1],g:t[2],b:t[3]}:(t=matchers.rgba.exec(e),t?{r:t[1],g:t[2],b:t[3],a:t[4]}:(t=matchers.hsl.exec(e),t?{h:t[1],s:t[2],l:t[3]}:(t=matchers.hsla.exec(e),t?{h:t[1],s:t[2],l:t[3],a:t[4]}:(t=matchers.hsv.exec(e),t?{h:t[1],s:t[2],v:t[3]}:(t=matchers.hsva.exec(e),t?{h:t[1],s:t[2],v:t[3],a:t[4]}:(t=matchers.cmyk.exec(e),t?{c:t[1],m:t[2],y:t[3],k:t[4]}:(t=matchers.hex8.exec(e),t?{r:parseIntFromHex(t[1]),g:parseIntFromHex(t[2]),b:parseIntFromHex(t[3]),a:convertHexToDecimal(t[4]),format:n?"name":"hex8"}:(t=matchers.hex6.exec(e),t?{r:parseIntFromHex(t[1]),g:parseIntFromHex(t[2]),b:parseIntFromHex(t[3]),format:n?"name":"hex"}:(t=matchers.hex4.exec(e),t?{r:parseIntFromHex(t[1]+t[1]),g:parseIntFromHex(t[2]+t[2]),b:parseIntFromHex(t[3]+t[3]),a:convertHexToDecimal(t[4]+t[4]),format:n?"name":"hex8"}:(t=matchers.hex3.exec(e),!!t&&{r:parseIntFromHex(t[1]+t[1]),g:parseIntFromHex(t[2]+t[2]),b:parseIntFromHex(t[3]+t[3]),format:n?"name":"hex"}))))))))))}function isValidCSSUnit(e){return typeof e=="number"?!Number.isNaN(e):matchers.CSS_UNIT.test(e)}TinyColor=class _TinyColor{constructor(e="",t={}){if(e instanceof _TinyColor)return e;typeof e=="number"&&(e=numberInputToObject(e)),this.originalInput=e;const n=inputToRGB(e);this.originalInput=e,this.r=n.r,this.g=n.g,this.b=n.b,this.a=n.a,this.roundA=Math.round(100*this.a)/100,this.format=t.format??n.format,this.gradientType=t.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=n.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const e=this.toRgb();return(e.r*299+e.g*587+e.b*114)/1e3}getLuminance(){const e=this.toRgb();let t,n,s;const o=e.r/255,i=e.g/255,a=e.b/255;return o<=.03928?t=o/12.92:t=((o+.055)/1.055)**2.4,i<=.03928?n=i/12.92:n=((i+.055)/1.055)**2.4,a<=.03928?s=a/12.92:s=((a+.055)/1.055)**2.4,.2126*t+.7152*n+.0722*s}getAlpha(){return this.a}setAlpha(e){return this.a=boundAlpha(e),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:e}=this.toHsl();return e===0}toHsv(){const e=rgbToHsv(this.r,this.g,this.b);return{h:e.h*360,s:e.s,v:e.v,a:this.a}}toHsvString(){const e=rgbToHsv(this.r,this.g,this.b),t=Math.round(e.h*360),n=Math.round(e.s*100),s=Math.round(e.v*100);return this.a===1?`hsv(${t}, ${n}%, ${s}%)`:`hsva(${t}, ${n}%, ${s}%, ${this.roundA})`}toHsl(){const e=rgbToHsl(this.r,this.g,this.b);return{h:e.h*360,s:e.s,l:e.l,a:this.a}}toHslString(){const e=rgbToHsl(this.r,this.g,this.b),t=Math.round(e.h*360),n=Math.round(e.s*100),s=Math.round(e.l*100);return this.a===1?`hsl(${t}, ${n}%, ${s}%)`:`hsla(${t}, ${n}%, ${s}%, ${this.roundA})`}toHex(e=!1){return rgbToHex(this.r,this.g,this.b,e)}toHexString(e=!1){return"#"+this.toHex(e)}toHex8(e=!1){return rgbaToHex(this.r,this.g,this.b,this.a,e)}toHex8String(e=!1){return"#"+this.toHex8(e)}toHexShortString(e=!1){return this.a===1?this.toHexString(e):this.toHex8String(e)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const e=Math.round(this.r),t=Math.round(this.g),n=Math.round(this.b);return this.a===1?`rgb(${e}, ${t}, ${n})`:`rgba(${e}, ${t}, ${n}, ${this.roundA})`}toPercentageRgb(){const e=e=>`${Math.round(bound01(e,255)*100)}%`;return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}}toPercentageRgbString(){const e=e=>Math.round(bound01(e,255)*100);return this.a===1?`rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)`:`rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`}toCmyk(){return{...rgbToCmyk(this.r,this.g,this.b)}}toCmykString(){const{c:e,m:t,y:n,k:s}=rgbToCmyk(this.r,this.g,this.b);return`cmyk(${e}, ${t}, ${n}, ${s})`}toName(){if(this.a===0)return"transparent";if(this.a<1)return!1;const e="#"+rgbToHex(this.r,this.g,this.b,!1);for(const[t,n]of Object.entries(names))if(e===n)return t;return!1}toString(e){const n=Boolean(e);e=e??this.format;let t=!1;const s=this.a<1&&this.a>=0,o=!n&&s&&(e.startsWith("hex")||e==="name");return o?e==="name"&&this.a===0?this.toName():this.toRgbString():(e==="rgb"&&(t=this.toRgbString()),e==="prgb"&&(t=this.toPercentageRgbString()),(e==="hex"||e==="hex6")&&(t=this.toHexString()),e==="hex3"&&(t=this.toHexString(!0)),e==="hex4"&&(t=this.toHex8String(!0)),e==="hex8"&&(t=this.toHex8String()),e==="name"&&(t=this.toName()),e==="hsl"&&(t=this.toHslString()),e==="hsv"&&(t=this.toHsvString()),e==="cmyk"&&(t=this.toCmykString()),t||this.toHexString())}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new _TinyColor(this.toString())}lighten(e=10){const t=this.toHsl();return t.l+=e/100,t.l=clamp01(t.l),new _TinyColor(t)}brighten(e=10){const t=this.toRgb();return t.r=Math.max(0,Math.min(255,t.r-Math.round(255*-(e/100)))),t.g=Math.max(0,Math.min(255,t.g-Math.round(255*-(e/100)))),t.b=Math.max(0,Math.min(255,t.b-Math.round(255*-(e/100)))),new _TinyColor(t)}darken(e=10){const t=this.toHsl();return t.l-=e/100,t.l=clamp01(t.l),new _TinyColor(t)}tint(e=10){return this.mix("white",e)}shade(e=10){return this.mix("black",e)}desaturate(e=10){const t=this.toHsl();return t.s-=e/100,t.s=clamp01(t.s),new _TinyColor(t)}saturate(e=10){const t=this.toHsl();return t.s+=e/100,t.s=clamp01(t.s),new _TinyColor(t)}greyscale(){return this.desaturate(100)}spin(e){const t=this.toHsl(),n=(t.h+e)%360;return t.h=n<0?360+n:n,new _TinyColor(t)}mix(e,t=50){const n=this.toRgb(),s=new _TinyColor(e).toRgb(),o=t/100,i={r:(s.r-n.r)*o+n.r,g:(s.g-n.g)*o+n.g,b:(s.b-n.b)*o+n.b,a:(s.a-n.a)*o+n.a};return new _TinyColor(i)}analogous(e=6,t=30){const n=this.toHsl(),s=360/t,o=[this];for(n.h=(n.h-(s*e>>1)+720)%360;--e;)n.h=(n.h+s)%360,o.push(new _TinyColor(n));return o}complement(){const e=this.toHsl();return e.h=(e.h+180)%360,new _TinyColor(e)}monochromatic(e=6){const t=this.toHsv(),{h:o}=t,{s:i}=t;let{v:n}=t;const s=[],a=1/e;for(;e--;)s.push(new _TinyColor({h:o,s:i,v:n})),n=(n+a)%1;return s}splitcomplement(){const e=this.toHsl(),{h:t}=e;return[this,new _TinyColor({h:(t+72)%360,s:e.s,l:e.l}),new _TinyColor({h:(t+216)%360,s:e.s,l:e.l})]}onBackground(e){const t=this.toRgb(),n=new _TinyColor(e).toRgb(),s=t.a+n.a*(1-t.a);return new _TinyColor({r:(t.r*t.a+n.r*n.a*(1-t.a))/s,g:(t.g*t.a+n.g*n.a*(1-t.a))/s,b:(t.b*t.a+n.b*n.a*(1-t.a))/s,a:s})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(e){const t=this.toHsl(),{h:s}=t,n=[this],o=360/e;for(let i=1;i<e;i++)n.push(new _TinyColor({h:(s+i*o)%360,s:t.s,l:t.l}));return n}equals(e){const t=new _TinyColor(e);return this.format==="cmyk"||t.format==="cmyk"?this.toCmykString()===t.toCmykString():this.toRgbString()===t.toRgbString()}},WaColorPicker=class extends WebAwesomeFormAssociatedElement{constructor(){super(),this.hasSlotController=new HasSlotController(this,"hint","label"),this.isSafeValue=!1,this.localize=new LocalizeController(this),this.hasFocus=!1,this.isDraggingGridHandle=!1,this.isEmpty=!0,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this._value=null,this.defaultValue=this.getAttribute("value")||null,this.withLabel=!1,this.withHint=!1,this.hasEyeDropper=!1,this.label="",this.hint="",this.format="hex",this.size="medium",this.placement="bottom-start",this.withoutFormatToggle=!1,this.name=null,this.disabled=!1,this.open=!1,this.opacity=!1,this.uppercase=!1,this.swatches="",this.required=!1,this.handleFocusIn=()=>{this.hasFocus=!0},this.handleFocusOut=()=>{this.hasFocus=!1},this.reportValidityAfterShow=()=>{this.removeEventListener("invalid",this.emitInvalid),this.reportValidity(),this.addEventListener("invalid",this.emitInvalid)},this.handleKeyDown=e=>{this.open&&e.key==="Escape"&&isTopDismissible(this)&&(e.stopPropagation(),this.hide(),this.focus())},this.handleDocumentKeyDown=e=>{if(e.key==="Escape"&&this.open&&isTopDismissible(this)){e.stopPropagation(),this.focus(),this.hide();return}e.key==="Tab"&&setTimeout(()=>{const e=this.getRootNode()instanceof ShadowRoot?document.activeElement?.shadowRoot?.activeElement:document.activeElement;(!this||e?.closest(this.tagName.toLowerCase())!==this)&&this.hide()})},this.handleDocumentMouseDown=e=>{const t=e.composedPath(),n=t.some(e=>e instanceof Element&&(e.closest(".color-picker")||e===this.trigger));this&&!n&&this.hide()},o||(this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut))}static get validators(){const e=o?[]:[RequiredValidator()];return[...super.validators,...e]}get validationTarget(){return this.popup?.active?this.input:this.trigger}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){if(this._value===e)return;this.valueHasChanged=!0,this._value=e}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("preview-color-copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("preview-color-copied")})}handleFormatToggle(){const e=["hex","rgb","hsl","hsv"],t=(e.indexOf(this.format)+1)%e.length;this.format=e[t],this.setColor(this.value||""),this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}handleAlphaDrag(e){const t=this.shadowRoot.querySelector(".slider.alpha"),o=t.querySelector(".slider-handle"),{width:i}=t.getBoundingClientRect();let n=this.value,s=this.value;o.focus(),e.preventDefault(),drag(t,{onMove:e=>{this.alpha=clamp(e/i*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.value!==n&&(n=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:e})}handleHueDrag(e){const t=this.shadowRoot.querySelector(".slider.hue"),o=t.querySelector(".slider-handle"),{width:i}=t.getBoundingClientRect();let n=this.value,s=this.value;o.focus(),e.preventDefault(),drag(t,{onMove:e=>{this.hue=clamp(e/i*360,0,360),this.syncValues(),this.value!==s&&(s=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input"))}))},onStop:()=>{this.value!==n&&(n=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:e})}handleGridDrag(e){const t=this.shadowRoot.querySelector(".grid"),o=t.querySelector(".grid-handle"),{width:i,height:a}=t.getBoundingClientRect();let n=this.value,s=this.value;o.focus(),e.preventDefault(),this.isDraggingGridHandle=!0,drag(t,{onMove:(e,t)=>{this.saturation=clamp(e/i*100,0,100),this.brightness=clamp(100-t/a*100,0,100),this.syncValues(),this.value!==s&&(s=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))},onStop:()=>{this.isDraggingGridHandle=!1,this.value!==n&&(n=this.value,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))},initialEvent:e})}handleAlphaKeyDown(e){const t=e.shiftKey?10:1,n=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.alpha=clamp(this.alpha-t,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.alpha=clamp(this.alpha+t,0,100),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.alpha=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.alpha=100,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleHueKeyDown(e){const t=e.shiftKey?10:1,n=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.hue=clamp(this.hue-t,0,360),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.hue=clamp(this.hue+t,0,360),this.syncValues()),e.key==="Home"&&(e.preventDefault(),this.hue=0,this.syncValues()),e.key==="End"&&(e.preventDefault(),this.hue=360,this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleGridKeyDown(e){const t=e.shiftKey?10:1,n=this.value;e.key==="ArrowLeft"&&(e.preventDefault(),this.saturation=clamp(this.saturation-t,0,100),this.syncValues()),e.key==="ArrowRight"&&(e.preventDefault(),this.saturation=clamp(this.saturation+t,0,100),this.syncValues()),e.key==="ArrowUp"&&(e.preventDefault(),this.brightness=clamp(this.brightness+t,0,100),this.syncValues()),e.key==="ArrowDown"&&(e.preventDefault(),this.brightness=clamp(this.brightness-t,0,100),this.syncValues()),this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputChange(e){const t=e.target,n=this.value;e.stopPropagation(),this.input.value?(this.setColor(t.value),t.value=this.value||""):this.value="",this.value!==n&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleInputInput(e){this.updateValidity(),e.stopPropagation()}handleInputKeyDown(e){if(e.key==="Enter"){const e=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==e&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),setTimeout(()=>this.input.select())):this.hue=0}}handleTouchMove(e){e.preventDefault()}parseColor(e){if(!e||e.trim()==="")return null;const o=new TinyColor(e);if(!o.isValid)return null;const i=o.toHsl(),t=o.toRgb(),a=o.toHsv();if(!t||t.r==null||t.g==null||t.b==null)return null;const n={h:i.h||0,s:(i.s||0)*100,l:(i.l||0)*100,a:i.a||0},r=o.toHexString(),c=o.toHex8String(),s={h:a.h||0,s:(a.s||0)*100,v:(a.v||0)*100,a:a.a||0};return{hsl:{h:n.h,s:n.s,l:n.l,string:this.setLetterCase(`hsl(${Math.round(n.h)}, ${Math.round(n.s)}%, ${Math.round(n.l)}%)`)},hsla:{h:n.h,s:n.s,l:n.l,a:n.a,string:this.setLetterCase(`hsla(${Math.round(n.h)}, ${Math.round(n.s)}%, ${Math.round(n.l)}%, ${n.a.toFixed(2).toString()})`)},hsv:{h:s.h,s:s.s,v:s.v,string:this.setLetterCase(`hsv(${Math.round(s.h)}, ${Math.round(s.s)}%, ${Math.round(s.v)}%)`)},hsva:{h:s.h,s:s.s,v:s.v,a:s.a,string:this.setLetterCase(`hsva(${Math.round(s.h)}, ${Math.round(s.s)}%, ${Math.round(s.v)}%, ${s.a.toFixed(2).toString()})`)},rgb:{r:t.r,g:t.g,b:t.b,string:this.setLetterCase(`rgb(${Math.round(t.r)}, ${Math.round(t.g)}, ${Math.round(t.b)})`)},rgba:{r:t.r,g:t.g,b:t.b,a:t.a||0,string:this.setLetterCase(`rgba(${Math.round(t.r)}, ${Math.round(t.g)}, ${Math.round(t.b)}, ${(t.a||0).toFixed(2).toString()})`)},hex:this.setLetterCase(r),hexa:this.setLetterCase(c)}}setColor(e){const t=this.parseColor(e);return t!==null&&(this.hue=t.hsva.h,this.saturation=t.hsva.s,this.brightness=t.hsva.v,this.alpha=this.opacity?t.hsva.a*100:100,this.syncValues(),!0)}setLetterCase(e){return typeof e!="string"?"":this.uppercase?e.toUpperCase():e.toLowerCase()}async syncValues(){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(e===null)return;this.format==="hsl"?this.inputValue=this.opacity?e.hsla.string:e.hsl.string:this.format==="rgb"?this.inputValue=this.opacity?e.rgba.string:e.rgb.string:this.format==="hsv"?this.inputValue=this.opacity?e.hsva.string:e.hsv.string:this.inputValue=this.opacity?e.hexa:e.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1}handleAfterHide(){this.previewButton.classList.remove("preview-color-copied"),this.updateValidity()}handleAfterShow(){this.updateValidity()}handleEyeDropper(){if(!this.hasEyeDropper)return;const e=new EyeDropper;e.open().then(e=>{const t=this.value;this.setColor(e.sRGBHex),this.value!==t&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}).catch(()=>{})}selectSwatch(e){const t=this.value;this.disabled||(this.setColor(e),this.value!==t&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getHexString(e,t,n,s=100){const o=new TinyColor(`hsva(${e}, ${t}%, ${n}%, ${s/100})`);return o.isValid?o.toHex8String():""}stopNestedEventPropagation(e){e.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}willUpdate(e){super.willUpdate(e),e.has("value")&&this.handleValueChange(e.get("value")||"",this.value||"")}handleValueChange(e,t){if(this.isEmpty=!t,t||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const n=this.parseColor(t);n!==null?(this.inputValue=this.value||"",this.hue=n.hsva.h,this.saturation=n.hsva.s,this.brightness=n.hsva.v,this.alpha=n.hsva.a*100,this.syncValues()):this.inputValue=e??""}this.requestUpdate()}focus(e){this.trigger.focus(e)}blur(){const e=this.trigger;this.hasFocus&&(e.focus({preventScroll:!0}),e.blur()),this.popup?.active&&this.hide()}getFormattedValue(e="hex"){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(t===null)return"";switch(e){case"hex":return t.hex;case"hexa":return t.hexa;case"rgb":return t.rgb.string;case"rgba":return t.rgba.string;case"hsl":return t.hsl.string;case"hsla":return t.hsla.string;case"hsv":return t.hsv.string;case"hsva":return t.hsva.string;default:return""}}reportValidity(){return!this.validity.valid&&!this.open?(this.addEventListener("wa-after-show",this.reportValidityAfterShow,{once:!0}),this.show(),this.disabled||this.dispatchEvent(new WaInvalidEvent),!1):super.reportValidity()}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}firstUpdated(e){super.firstUpdated(e),this.hasEyeDropper="EyeDropper"in window}handleTriggerClick(){this.open?this.hide():(this.show(),this.focus())}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault()}updateAccessibleTrigger(){const e=this.trigger;e&&(e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false"))}async show(){return this.open?0[0]:(this.open=!0,waitForEvent(this,"wa-after-show"))}async hide(){return this.open?(this.open=!1,waitForEvent(this,"wa-after-hide")):0[0]}addOpenListeners(){this.base.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),registerDismissible(this)}removeOpenListeners(){this.base&&this.base.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),unregisterDismissible(this)}async handleOpenChange(){if(this.disabled){this.open=!1;return}this.updateAccessibleTrigger(),this.open?(this.dispatchEvent(new CustomEvent("wa-show")),this.addOpenListeners(),await this.updateComplete,this.base.hidden=!1,this.popup.active=!0,await animateWithClass(this.popup.popup,"show-with-scale"),this.dispatchEvent(new CustomEvent("wa-after-show"))):(this.dispatchEvent(new CustomEvent("wa-hide")),this.removeOpenListeners(),await animateWithClass(this.popup.popup,"hide-with-scale"),this.base.hidden=!0,this.popup.active=!1,this.dispatchEvent(new CustomEvent("wa-after-hide")))}render(){const n=this.hasUpdated?this.withLabel||this.hasSlotController.test("label"):this.withLabel,s=this.hasUpdated?this.withHint||this.hasSlotController.test("hint"):this.withHint,e=!!this.label||!!n,o=!!this.hint||!!s,i=this.saturation,a=100-this.brightness,t=Array.isArray(this.swatches)?this.swatches.map(e=>typeof e=="string"?{color:e,label:e}:e):this.swatches.split(";").filter(e=>e.trim()!=="").map(e=>({color:e.trim(),label:e.trim()})),r=x`
      <div
        part="base"
        class=${e2({"color-picker":!0})}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex="-1"
      >
        <div
          part="grid"
          class="grid"
          style=${o2({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${e2({"grid-handle":!0,"grid-handle-dragging":this.isDraggingGridHandle})}
            style=${o2({top:`${a}%`,left:`${i}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${o3(this.disabled?0[0]:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="controls">
          <div class="sliders">
            <div
              part="slider hue-slider"
              class="hue slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="slider-handle"
                style=${o2({left:`${this.hue===0?0:100/(360/this.hue)}%`,backgroundColor:this.getHexString(this.hue,100,100)})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${o3(this.disabled?0[0]:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?x`
                  <div
                    part="slider opacity-slider"
                    class="alpha slider transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="alpha-gradient"
                      style=${o2({backgroundImage:`linear-gradient(
                          to right,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,
                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%
                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="slider-handle"
                      style=${o2({left:`${this.alpha}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${o3(this.disabled?0[0]:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="preview transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${o2({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="user-input" aria-live="polite">
          <wa-input
            part="input"
            type="text"
            name=${this.name}
            size="small"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @change=${this.handleInputChange}
            @input=${this.handleInputInput}
            @blur=${this.stopNestedEventPropagation}
            @focus=${this.stopNestedEventPropagation}
          ></wa-input>

          <wa-button-group>
            ${this.withoutFormatToggle?"":x`
                  <wa-button
                    part="format-button"
                    size="small"
                    appearance="outlined"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      start:format-button__start,
                      label:format-button__label,
                      end:format-button__end,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @blur=${this.stopNestedEventPropagation}
                    @focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </wa-button>
                `}
            ${this.hasEyeDropper?x`
                  <wa-button
                    part="eyedropper-button"
                    size="small"
                    appearance="outlined"
                    exportparts="
                      base:eyedropper-button__base,
                      start:eyedropper-button__start,
                      label:eyedropper-button__label,
                      end:eyedropper-button__end,
                      caret:eyedropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @blur=${this.stopNestedEventPropagation}
                    @focus=${this.stopNestedEventPropagation}
                  >
                    <wa-icon
                      library="system"
                      name="eyedropper"
                      variant="solid"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></wa-icon>
                  </wa-button>
                `:""}
          </wa-button-group>
        </div>

        ${t.length>0?x`
              <div part="swatches" class="swatches">
                ${t.map(e=>{const t=this.parseColor(e.color);return t?x`
                    <div
                      part="swatch"
                      class="swatch transparent-bg"
                      tabindex=${o3(this.disabled?0[0]:"0")}
                      role="button"
                      aria-label=${e.label}
                      @click=${()=>this.selectSwatch(e.color)}
                      @keydown=${e=>!this.disabled&&e.key==="Enter"&&this.setColor(t.hexa)}
                    >
                      <div class="swatch-color" style=${o2({backgroundColor:t.hexa})}></div>
                    </div>
                  `:""})}
              </div>
            `:""}
      </div>
    `;return x`
      <div
        class=${e2({container:!0,"form-control":!0,"form-control-has-label":e})}
        part="trigger-container form-control"
      >
        <div
          part="form-control-label"
          class=${e2({label:!0,"has-label":e})}
          id="form-control-label"
        >
          <slot name="label">${this.label}</slot>
        </div>

        <button
          id="trigger"
          part="trigger form-control-input"
          class=${e2({trigger:!0,"trigger-empty":this.isEmpty,"transparent-bg":!0,"form-control-input":!0})}
          style=${o2({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
          aria-labelledby="form-control-label"
          aria-describedby="hint"
          .disabled=${this.disabled}
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        ></button>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${e2({"has-slotted":o})}
          >${this.hint}</slot
        >
      </div>

      <wa-popup
        class="color-popup"
        anchor="trigger"
        placement=${this.placement}
        distance="0"
        skidding="0"
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        aria-disabled=${this.disabled?"true":"false"}
        @wa-after-show=${this.handleAfterShow}
        @wa-after-hide=${this.handleAfterHide}
      >
        ${r}
      </wa-popup>
    `}},WaColorPicker.css=[visually_hidden_styles_default,size_styles_default,form_control_styles_default,color_picker_styles_default],WaColorPicker.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0},__decorateClass([e('[part~="base"]')],WaColorPicker.prototype,"base",2),__decorateClass([e('[part~="input"]')],WaColorPicker.prototype,"input",2),__decorateClass([e('[part~="form-control-label"]')],WaColorPicker.prototype,"triggerLabel",2),__decorateClass([e('[part~="form-control-input"]')],WaColorPicker.prototype,"triggerButton",2),__decorateClass([e(".color-popup")],WaColorPicker.prototype,"popup",2),__decorateClass([e('[part~="preview"]')],WaColorPicker.prototype,"previewButton",2),__decorateClass([e('[part~="trigger"]')],WaColorPicker.prototype,"trigger",2),__decorateClass([r()],WaColorPicker.prototype,"hasFocus",2),__decorateClass([r()],WaColorPicker.prototype,"isDraggingGridHandle",2),__decorateClass([r()],WaColorPicker.prototype,"isEmpty",2),__decorateClass([r()],WaColorPicker.prototype,"inputValue",2),__decorateClass([r()],WaColorPicker.prototype,"hue",2),__decorateClass([r()],WaColorPicker.prototype,"saturation",2),__decorateClass([r()],WaColorPicker.prototype,"brightness",2),__decorateClass([r()],WaColorPicker.prototype,"alpha",2),__decorateClass([r()],WaColorPicker.prototype,"value",1),__decorateClass([n({attribute:"value",reflect:!0})],WaColorPicker.prototype,"defaultValue",2),__decorateClass([n({attribute:"with-label",reflect:!0,type:Boolean})],WaColorPicker.prototype,"withLabel",2),__decorateClass([n({attribute:"with-hint",reflect:!0,type:Boolean})],WaColorPicker.prototype,"withHint",2),__decorateClass([r()],WaColorPicker.prototype,"hasEyeDropper",2),__decorateClass([n()],WaColorPicker.prototype,"label",2),__decorateClass([n({attribute:"hint"})],WaColorPicker.prototype,"hint",2),__decorateClass([n()],WaColorPicker.prototype,"format",2),__decorateClass([n({reflect:!0})],WaColorPicker.prototype,"size",2),__decorateClass([n({reflect:!0})],WaColorPicker.prototype,"placement",2),__decorateClass([n({attribute:"without-format-toggle",type:Boolean})],WaColorPicker.prototype,"withoutFormatToggle",2),__decorateClass([n({reflect:!0})],WaColorPicker.prototype,"name",2),__decorateClass([n({type:Boolean})],WaColorPicker.prototype,"disabled",2),__decorateClass([n({type:Boolean,reflect:!0})],WaColorPicker.prototype,"open",2),__decorateClass([n({type:Boolean})],WaColorPicker.prototype,"opacity",2),__decorateClass([n({type:Boolean})],WaColorPicker.prototype,"uppercase",2),__decorateClass([n()],WaColorPicker.prototype,"swatches",2),__decorateClass([n({type:Boolean,reflect:!0})],WaColorPicker.prototype,"required",2),__decorateClass([t2({passive:!1})],WaColorPicker.prototype,"handleTouchMove",1),__decorateClass([watch("format",{waitUntilFirstUpdate:!0})],WaColorPicker.prototype,"handleFormatChange",1),__decorateClass([watch("opacity")],WaColorPicker.prototype,"handleOpacityChange",1),__decorateClass([watch("value")],WaColorPicker.prototype,"handleValueChange",1),__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaColorPicker.prototype,"handleOpenChange",1),WaColorPicker=__decorateClass([t("wa-color-picker")],WaColorPicker),WaColorPicker.disableWarning?.("change-in-update");export{WaColorPicker}