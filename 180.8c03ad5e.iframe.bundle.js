"use strict";(self.webpackChunkclickable_json=self.webpackChunkclickable_json||[]).push([[180],{"./node_modules/flexible-input/lib/index.js":(__unused_webpack_module,exports,__webpack_require__)=>{exports.o=void 0;const React=__webpack_require__("./node_modules/react/index.js"),nano_theme_1=__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/index.js"),util_1=__webpack_require__("./node_modules/flexible-input/lib/util.js"),blockClass=(0,nano_theme_1.rule)({d:"inline-block",pos:"relative"}),inputClass=(0,nano_theme_1.rule)({d:"inline-block",va:"bottom",bxz:"border-box",ov:"hidden",pd:0,mr:0,bd:0,bg:0,out:0,col:"inherit",fw:"inherit",f:"inherit",lh:"inherit",ws:"pre",resize:"none"}),sizerClass=(0,nano_theme_1.rule)({d:"inline-block",pos:"absolute",ov:"hidden",pe:"none",us:"none",bxz:"border-box",t:0,l:0,ws:"pre"});exports.o=({inp,value,uncontrolled,multiline,typebefore="",typeahead="",extraWidth,minWidth=8,maxWidth,focus,onChange,onFocus,onBlur,onKeyDown,onSubmit,onCancel,onTab})=>{const inputRef=React.useRef(null),sizerRef=React.useRef(null),theme=(0,nano_theme_1.useTheme)();React.useLayoutEffect((()=>{inputRef.current&&sizerRef.current&&(focus&&inputRef.current.focus(),(0,util_1.copyStyles)(inputRef.current,sizerRef.current,["font","fontSize","fontFamily","fontWeight","fontStyle","letterSpacing","textTransform","boxSizing"]))}),[]),React.useLayoutEffect((()=>{const input=inputRef.current,sizer=sizerRef.current;if(!input||!sizer)return;let width=sizer.scrollWidth;extraWidth&&(width+=extraWidth),minWidth&&(width=Math.max(width,minWidth)),maxWidth&&(width=Math.min(width,maxWidth));const style=input.style;if(style.width=width+"px",multiline){const height=sizer.scrollHeight;style.height=height+"px"}}),[value,typeahead,extraWidth]);const attr={ref:input=>{inputRef.current=input,inp&&inp(input)},className:inputClass,onChange,onFocus,onBlur,onKeyDown:e=>{"Enter"!==e.key||multiline&&!e.ctrlKey?"Escape"===e.key?onCancel&&onCancel(e):"Tab"===e.key&&onTab&&onTab(e):onSubmit&&onSubmit(e),onKeyDown&&onKeyDown(e)}},input=multiline?React.createElement("textarea",Object.assign({},attr,{value:uncontrolled?void 0:value})):React.createElement("input",Object.assign({},attr,{value:uncontrolled?void 0:value}));return React.createElement(React.Fragment,null,!!typebefore&&React.createElement("span",{style:{color:theme.g(.7),verticalAlign:"top"}},typebefore),React.createElement("div",{className:blockClass},input,React.createElement("div",{ref:sizerRef,className:sizerClass},React.createElement("span",{style:{visibility:"hidden"}},value),"​",!!typeahead&&React.createElement("span",{style:{color:theme.g(.7)}},typeahead))))}},"./node_modules/flexible-input/lib/util.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.copyStyles=void 0;exports.copyStyles=(from,to,which)=>{const styles=window.getComputedStyle(from);if(styles)for(const property of which)to.style[property]=styles[property]}},"./node_modules/flexible-input/node_modules/nano-theme/lib/breakpoints.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.m4=exports.m3=exports.m2=exports.m1=exports.b4=exports.b3=exports.b2=exports.b1=void 0,exports.b1=520,exports.b2=960,exports.b3=1300,exports.b4=1800,exports.m1=`@media (max-width:${exports.b1}px)`,exports.m2=`@media (max-width:${exports.b2}px)`,exports.m3=`@media (max-width:${exports.b3}px)`,exports.m4=`@media (max-width:${exports.b4}px)`},"./node_modules/flexible-input/node_modules/nano-theme/lib/color.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.toColor=exports.color=void 0,exports.color=["#FFC312","#F79F1F","#EE5A24","#EA2027","#C4E538","#A3CB38","#009432","#006266","#12CBC4","#1289A7","#0652DD","#1B1464","#9980FA","#ED4C67","#B53471","#833471","#6F1E51","#e27d60","#85dcbb","#e8a87c","#c38d9e","#41b3a3","#242582","#553d67","#f64c72","#99738e","#2f2fa2","#05386b","#fc4445","#3feee6","#55bcc9","#8ee4af","#5cdb95","#907163","#379683","#84ceeb","#5ab9ea","#8860d0","#75b5d8","#a64ac9","#fccd04","#17e9e0","#61892f","#86c232","#222629","#474b4f","#6b6e70","#eadb02","#46344e","#5a5560","#fa72a1","#e64398","#f78888","#1FB6FF","#13CE66","#FF4949","#FFC82C","#76266C","#8C2E5E","#5B2971","#9B344E","#4D2B73","#AA4139","#432F75","#AA5D38","#702D0C","#3C1200","#353377","#FE8C00","#FE7301","#FE4301","#FE0100","#E5013B","#CC0174","#A0048C","#560DAB","#252AAC","#0A6BA1","#09A471","#9DED05"];const hash_1=__webpack_require__("./node_modules/thingies/lib/hash.js");exports.toColor=str=>exports.color[(0,hash_1.hash)(str)%exports.color.length]},"./node_modules/flexible-input/node_modules/nano-theme/lib/constants.js":(__unused_webpack_module,exports)=>{var SIZE,ZINDEX,SYMBOL,COLOR;Object.defineProperty(exports,"__esModule",{value:!0}),exports.COLOR=exports.SYMBOL=exports.ZINDEX=exports.SIZE=void 0,function(SIZE){SIZE[SIZE.SITE_WIDTH=1300]="SITE_WIDTH",SIZE[SIZE.SITE_PADDING=32]="SITE_PADDING",SIZE[SIZE.PAGE_WIDTH=1e3]="PAGE_WIDTH",SIZE[SIZE.TOP_NAV_HEIGHT=64]="TOP_NAV_HEIGHT",SIZE[SIZE.SIDEBAR_WIDTH=300]="SIDEBAR_WIDTH"}(SIZE||(exports.SIZE=SIZE={})),function(ZINDEX){ZINDEX[ZINDEX.TOP_NAV=1e3]="TOP_NAV",ZINDEX[ZINDEX.SIDEBAR=1001]="SIDEBAR",ZINDEX[ZINDEX.CONTEXT=1002]="CONTEXT",ZINDEX[ZINDEX.PROGRESS=2e3]="PROGRESS",ZINDEX[ZINDEX.MODAL=4e3]="MODAL",ZINDEX[ZINDEX.CURSOR=1e6]="CURSOR"}(ZINDEX||(exports.ZINDEX=ZINDEX={})),function(SYMBOL){SYMBOL.CHECKMARK="✓",SYMBOL.CROSS="✗",SYMBOL.NIL="∅",SYMBOL.ELLIPSIS="…",SYMBOL.MDASH="—",SYMBOL.NDASH="–",SYMBOL.FDASH="‒",SYMBOL.CTRL="⌃",SYMBOL.CMD="⌘",SYMBOL.ALT="⌥",SYMBOL.SHIFT="⇧"}(SYMBOL||(exports.SYMBOL=SYMBOL={})),function(COLOR){COLOR.LINK="#0089ff"}(COLOR||(exports.COLOR=COLOR={}))},"./node_modules/flexible-input/node_modules/nano-theme/lib/css.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.nano=exports.googleFont=exports.keyframes=exports.drule=exports.rule=exports.put=exports.reset=void 0;const tslib_1=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),nano_css_1=__webpack_require__("./node_modules/nano-css/index.js"),cache_1=__webpack_require__("./node_modules/nano-css/addon/cache.js"),stable_1=__webpack_require__("./node_modules/nano-css/addon/stable.js"),nesting_1=__webpack_require__("./node_modules/nano-css/addon/nesting.js"),atoms_1=__webpack_require__("./node_modules/nano-css/addon/atoms.js"),rule_1=__webpack_require__("./node_modules/nano-css/addon/rule.js"),drule_1=__webpack_require__("./node_modules/nano-css/addon/drule.js"),keyframes_1=__webpack_require__("./node_modules/nano-css/addon/keyframes.js"),Normalize_1=__webpack_require__("./node_modules/nano-css/addon/reset/Normalize.js"),reset_font_1=__webpack_require__("./node_modules/nano-css/addon/reset-font.js"),googleFont_1=__webpack_require__("./node_modules/nano-css/addon/googleFont.js");tslib_1.__exportStar(__webpack_require__("./node_modules/nano-css/index.js"),exports);const nano=(0,nano_css_1.create)({pfx:"nano-css"});exports.nano=nano,(0,cache_1.addon)(nano),(0,stable_1.addon)(nano),(0,nesting_1.addon)(nano),(0,atoms_1.addon)(nano),(0,rule_1.addon)(nano),(0,drule_1.addon)(nano),(0,keyframes_1.addon)(nano),(0,googleFont_1.addon)(nano);exports.reset=()=>{(0,Normalize_1.addon)(nano),(0,reset_font_1.addon)(nano)},exports.put=nano.put,exports.rule=nano.rule,exports.drule=nano.drule,exports.keyframes=nano.keyframes,exports.googleFont=nano.googleFont},"./node_modules/flexible-input/node_modules/nano-theme/lib/font.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.font=void 0;const sans='"Open Sans",sans-serif',serif='"Merriweather","Linux Libertine"',slab='"Roboto Slab"',ui1='Ubuntu,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Cantarell,"Open Sans","Helvetica Neue",sans-serif',ui2='-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol",'+ui1,ui3="Roboto,sans-serif,"+ui2;exports.font={sans:{lite:{fw:300,ff:sans},mid:{fw:400,ff:sans},bold:{fw:700,ff:sans},black:{fw:800,ff:sans}},serif:{lite:{fw:300,ff:serif},mid:{fw:400,ff:serif},bold:{fw:700,ff:serif},black:{fw:700,ff:serif}},slab:{lite:{fw:300,ff:slab},mid:{fw:400,ff:slab},bold:{fw:700,ff:slab},black:{fw:800,ff:slab}},mono:{mid:{fw:300,ff:'"Menlo","DejaVu Sans Mono","Roboto Mono","Fira Mono","Cousine",Consolas,"Liberation Mono",Courier,monospace'},bold:{fw:400,ff:'"Fira Mono","Cousine",Consolas,"Liberation Mono",Courier,monospace'}},ui1:{lite:{fw:300,ff:ui1},mid:{fw:400,ff:ui1},bold:{fw:700,ff:ui1},black:{fw:800,ff:ui1}},ui2:{lite:{fw:300,ff:ui2},mid:{fw:400,ff:ui2},bold:{fw:700,ff:ui2},black:{fw:800,ff:ui2}},ui3:{lite:{fw:300,ff:ui3},mid:{fw:400,ff:ui3},bold:{fw:700,ff:ui3},black:{fw:800,ff:ui3}}}},"./node_modules/flexible-input/node_modules/nano-theme/lib/global-reset.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.googleFonts=void 0;const css_1=__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/css.js"),light_1=__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/themes/light.js");exports.googleFonts="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800|Roboto+Mono|Merriweather:300,400,700|Roboto+Slab:300,400,700|Roboto:300,500|Ubuntu:400&subset=cyrillic";if("object"==typeof window){const href=exports.googleFonts,el=document.createElement("link");el.href=href,el.rel="stylesheet",el.type="text/css",document.head.appendChild(el)}(0,css_1.reset)(),(0,css_1.put)("",{"@keyframes fadeInScaleOut":{from:{opacity:0,transform:"scale(.95)"},"80%":{opacity:.9,transform:"scale(1.02)"},to:{opacity:1,transform:"scale(1)"}},"@keyframes fadeInScaleIn":{from:{opacity:0,transform:"scale(.9)"},"80%":{opacity:.9,transform:"scale(.95)"},to:{opacity:1,transform:"scale(1)"}},"@keyframes slideInDown":{from:{transform:"translate3d(0, -100%, 0)",visibility:"visible"},to:{transform:"translate3d(0, 0, 0)"}},".slideInDown":{animation:"slideInDown .3s"},a:{col:light_1.lightTheme.color.sem.link[0],td:"none","&:hover":{col:light_1.lightTheme.color.sem.link[1]},"p &":{bdb:"1px solid rgba(0,137,255,.3)","&:hover":{bdb:"1px solid rgba(244,18,36,.3)"}}},"button:focus,a:focus":{outlineOffset:"1px",out:"1px dashed rgba(0,0,0,.2)"},"button:active,a:active":{out:0}})},"./node_modules/flexible-input/node_modules/nano-theme/lib/index.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const tslib_1=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/global-reset.js"),tslib_1.__exportStar(__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/types.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/constants.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/css.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/breakpoints.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/font.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/themes/light.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/themes/dark.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/react.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/color.js"),exports)},"./node_modules/flexible-input/node_modules/nano-theme/lib/react.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.GlobalCss=exports.makeRule=exports.useRule=exports.useTheme=exports.Provider=void 0;const React=__webpack_require__("./node_modules/react/index.js"),light_1=__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/themes/light.js"),dark_1=__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/themes/dark.js"),css_1=__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/css.js"),context=React.createContext(light_1.lightTheme);exports.Provider=React.memo((({theme,children})=>{const value="light"===theme?light_1.lightTheme:dark_1.darkTheme;return React.createElement(context.Provider,{value},children)}));exports.useTheme=()=>React.useContext(context);exports.useRule=fn=>{const css=fn((0,exports.useTheme)());return css_1.nano.cache(css)};exports.makeRule=fn=>()=>(0,exports.useRule)(fn);const useIsomorphicLayoutEffect_1=__webpack_require__("./node_modules/react-use/lib/useIsomorphicLayoutEffect.js");exports.GlobalCss=()=>{const theme=(0,exports.useTheme)();return(0,useIsomorphicLayoutEffect_1.default)((()=>{document.body.style.background=theme.bg,document.body.style.color=theme.g(.05,.85)}),[theme]),null}},"./node_modules/flexible-input/node_modules/nano-theme/lib/themes/dark.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.darkTheme=void 0;const light_1=__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/themes/light.js"),g=(shade,opacity=1)=>{const g=255-Math.round(255*shade);return`rgba(${g},${g},${g},${opacity})`};exports.darkTheme=Object.assign(Object.assign({},light_1.lightTheme),{isLight:!1,name:"dark",bg:"#101921",color:Object.assign(Object.assign({},light_1.lightTheme.color),{ui:{lightLine:g(.1,.04),line:g(.1,.08),lineDark:g(.1,.16)}}),g})},"./node_modules/flexible-input/node_modules/nano-theme/lib/themes/light.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.theme=exports.lightTheme=void 0;const color_1=__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/color.js"),font_1=__webpack_require__("./node_modules/flexible-input/node_modules/nano-theme/lib/font.js"),g=(shade,opacity=1)=>{const g=Math.round(255*shade);return`rgba(${g},${g},${g},${opacity})`},spaces=[0,4,8,16,24,32,64,128,256,512],fontSizes=[10,12,14,16,20,24,32,48,64,96,128];exports.lightTheme={isLight:!0,name:"light",bg:"#fff",color:{color:color_1.color,sem:{accent:["#07f","#1340EB","#07ACEB"],blue:["#07f","#1340EB","#07ACEB"],positive:["#13CE66","#16BA32","#38D420"],negative:["#FF4949","#EB4C31","#DB521A"],warning:["#FFC82C","#EBC715","#DBCC00"],link:["#0089ff","#134EEB","#07BBEB"]},ui:{lightLine:g(.1,.04),line:g(.1,.08),lineDark:g(.1,.16)}},font:font_1.font,green:opacity=>`rgba(19,206,102,${opacity})`,red:opacity=>`rgba(225,20,10,${opacity})`,blue:opacity=>`rgba(40,160,222,${opacity})`,fontSize:(scale=0)=>fontSizes[Math.min(Math.max(scale+3,0),fontSizes.length-1)],space:(scale=0)=>spaces[Math.min(Math.max(scale+3,0),spaces.length-1)],g},exports.theme=exports.lightTheme},"./node_modules/flexible-input/node_modules/nano-theme/lib/types.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/json-joy/lib/json-pointer/find.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.isObjectReference=exports.isArrayEnd=exports.isArrayReference=exports.find=void 0;const hasOwnProperty_1=__webpack_require__("./node_modules/json-joy/lib/util/hasOwnProperty.js"),{isArray}=Array;exports.find=(val,path)=>{const pathLength=path.length;if(!pathLength)return{val};let obj,key;for(let i=0;i<pathLength;i++)if(obj=val,key=path[i],isArray(obj)){const length=obj.length;if("-"===key)key=length;else if("string"==typeof key){const key2=~~key;if(""+key2!==key)throw new Error("INVALID_INDEX");if(key=key2,key<0)throw new Error("INVALID_INDEX")}val=obj[key]}else{if("object"!=typeof obj||!obj)throw new Error("NOT_FOUND");val=(0,hasOwnProperty_1.hasOwnProperty)(obj,key)?obj[key]:void 0}return{val,obj,key}};exports.isArrayReference=ref=>isArray(ref.obj)&&"number"==typeof ref.key;exports.isArrayEnd=ref=>ref.obj.length===ref.key;exports.isObjectReference=ref=>"object"==typeof ref.obj&&"string"==typeof ref.key},"./node_modules/json-joy/lib/json-pointer/findByPointer/index.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});__webpack_require__("./node_modules/tslib/tslib.es6.mjs").__exportStar(__webpack_require__("./node_modules/json-joy/lib/json-pointer/findByPointer/v5.js"),exports)},"./node_modules/json-joy/lib/json-pointer/findByPointer/v5.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.findByPointer=void 0;const hasOwnProperty_1=__webpack_require__("./node_modules/json-joy/lib/util/hasOwnProperty.js"),util_1=__webpack_require__("./node_modules/json-joy/lib/json-pointer/util.js"),{isArray}=Array;exports.findByPointer=(pointer,val)=>{if(!pointer)return{val};let obj,key,indexOfSlash=0,indexAfterSlash=1;for(;indexOfSlash>-1;)if(indexOfSlash=pointer.indexOf("/",indexAfterSlash),key=indexOfSlash>-1?pointer.substring(indexAfterSlash,indexOfSlash):pointer.substring(indexAfterSlash),indexAfterSlash=indexOfSlash+1,obj=val,isArray(obj)){const length=obj.length;if("-"===key)key=length;else{const key2=~~key;if(""+key2!==key)throw new Error("INVALID_INDEX");if(key=key2,key<0)throw"INVALID_INDEX"}val=obj[key]}else{if("object"!=typeof obj||!obj)throw"NOT_FOUND";key=(0,util_1.unescapeComponent)(key),val=(0,hasOwnProperty_1.hasOwnProperty)(obj,key)?obj[key]:void 0}return{val,obj,key}}},"./node_modules/json-joy/lib/json-pointer/get.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.get=void 0;const hasOwnProperty_1=__webpack_require__("./node_modules/json-joy/lib/util/hasOwnProperty.js");exports.get=(val,path)=>{const pathLength=path.length;let key;if(!pathLength)return val;for(let i=0;i<pathLength;i++)if(key=path[i],val instanceof Array){val.length;if("-"===key)return;const key2=~~key;if(""+key2!==key)return;if(key=key2,key<0)return;val=val[key]}else{if("object"!=typeof val)return;if(!val||!(0,hasOwnProperty_1.hasOwnProperty)(val,key))return;val=val[key]}return val}},"./node_modules/json-joy/lib/json-pointer/index.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});const tslib_1=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");tslib_1.__exportStar(__webpack_require__("./node_modules/json-joy/lib/json-pointer/types.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/json-joy/lib/json-pointer/util.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/json-joy/lib/json-pointer/validate.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/json-joy/lib/json-pointer/get.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/json-joy/lib/json-pointer/find.js"),exports),tslib_1.__exportStar(__webpack_require__("./node_modules/json-joy/lib/json-pointer/findByPointer/index.js"),exports)},"./node_modules/json-joy/lib/json-pointer/types.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/json-joy/lib/json-pointer/util.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.isInteger=exports.isValidIndex=exports.parent=exports.isRoot=exports.isPathEqual=exports.isChild=exports.toPath=exports.formatJsonPointer=exports.parseJsonPointer=exports.escapeComponent=exports.unescapeComponent=void 0;const r1=/~1/g,r2=/~0/g,r3=/~/g,r4=/\//g;function unescapeComponent(component){return-1===component.indexOf("~")?component:component.replace(r1,"/").replace(r2,"~")}function escapeComponent(component){return-1===component.indexOf("/")&&-1===component.indexOf("~")?component:component.replace(r3,"~0").replace(r4,"~1")}function parseJsonPointer(pointer){return pointer?pointer.slice(1).split("/").map(unescapeComponent):[]}exports.unescapeComponent=unescapeComponent,exports.escapeComponent=escapeComponent,exports.parseJsonPointer=parseJsonPointer,exports.formatJsonPointer=function formatJsonPointer(path){return(0,exports.isRoot)(path)?"":"/"+path.map((component=>escapeComponent(String(component)))).join("/")};exports.toPath=pointer=>"string"==typeof pointer?parseJsonPointer(pointer):pointer,exports.isChild=function isChild(parent,child){if(parent.length>=child.length)return!1;for(let i=0;i<parent.length;i++)if(parent[i]!==child[i])return!1;return!0},exports.isPathEqual=function isPathEqual(p1,p2){if(p1.length!==p2.length)return!1;for(let i=0;i<p1.length;i++)if(p1[i]!==p2[i])return!1;return!0};exports.isRoot=path=>!path.length,exports.parent=function parent(path){if(path.length<1)throw new Error("NO_PARENT");return path.slice(0,path.length-1)},exports.isValidIndex=function isValidIndex(index){if("number"==typeof index)return!0;const n=parseInt(index,10);return String(n)===index&&n>=0};exports.isInteger=str=>{const len=str.length;let charCode,i=0;for(;i<len;){if(charCode=str.charCodeAt(i),!(charCode>=48&&charCode<=57))return!1;i++}return!0}},"./node_modules/json-joy/lib/json-pointer/validate.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.validatePath=exports.validateJsonPointer=void 0;exports.validateJsonPointer=pointer=>{if("string"==typeof pointer){if(pointer){if("/"!==pointer[0])throw new Error("POINTER_INVALID");if(pointer.length>1024)throw new Error("POINTER_TOO_LONG")}}else(0,exports.validatePath)(pointer)};const{isArray}=Array;exports.validatePath=path=>{if(!isArray(path))throw new Error("Invalid path.");if(path.length>256)throw new Error("Path too long.");for(const step of path)switch(typeof step){case"string":case"number":continue;default:throw new Error("Invalid path step.")}}},"./node_modules/json-joy/lib/util/hasOwnProperty.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.hasOwnProperty=void 0;const has=Object.prototype.hasOwnProperty;exports.hasOwnProperty=function hasOwnProperty(obj,key){return has.call(obj,key)}},"./node_modules/react-use/lib/useClickAway.js":(__unused_webpack_module,exports,__webpack_require__)=>{var react_1=__webpack_require__("./node_modules/react/index.js"),util_1=__webpack_require__("./node_modules/react-use/lib/misc/util.js"),defaultEvents=["mousedown","touchstart"];exports.Z=function(ref,onClickAway,events){void 0===events&&(events=defaultEvents);var savedCallback=react_1.useRef(onClickAway);react_1.useEffect((function(){savedCallback.current=onClickAway}),[onClickAway]),react_1.useEffect((function(){for(var handler=function(event){var el=ref.current;el&&!el.contains(event.target)&&savedCallback.current(event)},_i=0,events_1=events;_i<events_1.length;_i++){var eventName=events_1[_i];util_1.on(document,eventName,handler)}return function(){for(var _i=0,events_2=events;_i<events_2.length;_i++){var eventName=events_2[_i];util_1.off(document,eventName,handler)}}}),[events,ref])}},"./node_modules/react-use/lib/useMountedState.js":(__unused_webpack_module,exports,__webpack_require__)=>{var react_1=__webpack_require__("./node_modules/react/index.js");exports.Z=function useMountedState(){var mountedRef=react_1.useRef(!1),get=react_1.useCallback((function(){return mountedRef.current}),[]);return react_1.useEffect((function(){return mountedRef.current=!0,function(){mountedRef.current=!1}}),[]),get}},"./node_modules/tiny-invariant/dist/tiny-invariant.cjs.js":module=>{var prefix="Invariant failed";module.exports=function invariant(condition,message){if(!condition)throw new Error(prefix)}},"./node_modules/use-t/lib/createTranslations.js":function(__unused_webpack_module,exports,__webpack_require__){var extendStatics,__extends=this&&this.__extends||(extendStatics=function(d,b){return extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])},extendStatics(d,b)},function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}),__assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__generator=this&&this.__generator||function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function step(op){if(f)throw new TypeError("Generator is already executing.");for(;_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}},__spreadArrays=this&&this.__spreadArrays||function(){for(var s=0,i=0,il=arguments.length;i<il;i++)s+=arguments[i].length;var r=Array(s),k=0;for(i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r};Object.defineProperty(exports,"__esModule",{value:!0});var React=__webpack_require__("./node_modules/react/index.js"),tiny_invariant_1=__webpack_require__("./node_modules/tiny-invariant/dist/tiny-invariant.cjs.js"),createContext=React.createContext,createElement=React.createElement,Fragment=React.Fragment,defaultInterpolate=function(strs){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];for(var list=[],i=0;i<args.length;i++)list.push(strs[i]),list.push(args[i]);return list.push(strs[i]),createElement.apply(void 0,__spreadArrays([Fragment,{}],list))},translationInterpolate=function(values){return function(strs){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];for(var list=[],i=0;i<args.length;i++)list.push(strs[i]),list.push(values[args[i]]);return list.push(strs[i]),createElement.apply(void 0,__spreadArrays([Fragment,{}],list))}};exports.createTranslations=function(ns){var _a;void 0===ns&&(ns="main");var context=createContext({}),Consumer=context.Consumer,Provider=(_a=function(_super){function class_1(props){var _a,_this=_super.call(this,props)||this;_this.load=function(locale,ns){return __awaiter(_this,void 0,void 0,(function(){var translations;return __generator(this,(function(_a){switch(_a.label){case 0:return this.state.map[locale]||(this.state.map[locale]={}),this.state.map[locale][ns]?[3,2]:(this.state.map[locale][ns]={},this.setState(__assign({},this.state)),tiny_invariant_1.default(!!this.props.loader,"use-t provider .loader() prop not set."),[4,this.props.loader(locale,ns)]);case 1:translations=_a.sent(),this.state.map[locale][ns]=translations,this.setState(__assign({},this.state)),_a.label=2;case 2:return[2]}}))}))},_this.setLocale=function(locale){locale!==_this.state.locale&&(_this.state.map[locale]||(_this.state.map[locale]={}),_this.setState({locale}))},_this.createT=function(nss){void 0===nss&&(nss=[_this.props.ns]);for(var locale=_this.state.locale,translationsNamespaced=_this.state.map[locale],_i=0,nss_1=nss;_i<nss_1.length;_i++){var ns_1=nss_1[_i];translationsNamespaced[ns_1]||_this.load(locale,ns_1).catch((function(err){return console.error(err)}))}var t=function(key){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];for(var _a=0,_b=[locale,_this.props.defaultLocale];_a<_b.length;_a++){var currentLocale=_b[_a];if(!currentLocale)break;for(var translationsNamespaced_1=_this.state.map[currentLocale],_c=0,nss_2=nss;_c<nss_2.length;_c++){var value=translationsNamespaced_1[nss_2[_c]][key];if(void 0!==value)return"function"==typeof value?value(translationInterpolate(args)):value||key}}return key};return t.t=function(key){return function(strs){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];var result=t.apply(void 0,__spreadArrays([key],args));return"object"==typeof result?result:result!==key?createElement(Fragment,{},result):defaultInterpolate.apply(void 0,__spreadArrays([strs],args))}},t};var _b=props.map,map=void 0===_b?{}:_b,locale=props.locale,defaultLocale=props.defaultLocale,ns=props.ns;return map[defaultLocale]?map[defaultLocale][ns]||(map[defaultLocale][ns]={}):map[defaultLocale]=((_a={})[ns]={},_a),_this.state={locale,ns,map,load:_this.load,setLocale:_this.setLocale,createT:_this.createT},locale!==defaultLocale&&_this.load(locale,ns),_this}return __extends(class_1,_super),class_1.prototype.shouldComponentUpdate=function(nextProps){return nextProps.locale!==this.props.locale&&this.setLocale(nextProps.locale),!0},class_1.prototype.render=function(){return React.createElement(context.Provider,{value:this.state,children:this.props.children})},class_1}(React.Component),_a.defaultProps={locale:"en",defaultLocale:"en",ns},_a),defaultT=function(k){return k};defaultT.t=function(key){return function(strs){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];return defaultInterpolate(strs,args)}};var useT=function(namespaces){var nss=namespaces instanceof Array?namespaces:[namespaces||ns],state=React.useContext(context);return[state.createT?state.createT(nss):defaultT,state]};return{Consumer,Provider,context,useT,Trans:function(props){var children=props.children,nss=props.ns instanceof Array?props.ns:[props.ns||ns],_a=useT(nss),t=_a[0],T=_a[1];return("function"==typeof children?children(t,T):children instanceof Array?React.createElement.apply(React,__spreadArrays([React.Fragment,null],children.map((function(item){return"function"==typeof item?item(t):"string"==typeof item?t(item):item||null})))):"string"==typeof children?t(children):children)||null},withT:function(Comp,nss){return void 0===nss&&(nss=ns),Array.isArray(nss)||(nss=[nss]),function(props){var _a=useT(nss),t=_a[0],T=_a[1];return React.createElement(Comp,__assign(__assign({},props),{t,T}))}},T:defaultT}},exports.default=exports.createTranslations},"./node_modules/use-t/lib/index.js":(__unused_webpack_module,exports,__webpack_require__)=>{var _a;(_a=__webpack_require__("./node_modules/use-t/lib/createTranslations.js").default()).Consumer,_a.Provider,_a.Trans,_a.context,exports.NT=_a.useT,_a.withT,_a.T}}]);