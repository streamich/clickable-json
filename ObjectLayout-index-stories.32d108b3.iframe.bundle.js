"use strict";(self.webpackChunkclickable_json=self.webpackChunkclickable_json||[]).push([[472],{"./src/ObjectLayout/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"ObjectLayout",component:__webpack_require__("./src/ObjectLayout/index.tsx").D,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{}},Primary={args:{children:"asdf",collapsedChildren:"25"}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: ({\n    children: 'asdf',\n    collapsedChildren: '25'\n  } as any)\n}",...Primary.parameters?.docs?.source}}};const __namedExportsOrder=["Primary"]},"./src/ObjectLayout/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>ObjectLayout});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),nano_theme__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/nano-theme/lib/index.js"),_css__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/css.ts"),_context_style__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/context/style.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const ObjectLayout=_ref=>{let{property,collapsedView,header,collapsed,comma,brackets=["{","}"],children,onClick,onCollapserClick,onCollapsedClick,onBracketClick}=_ref;const[brackedHovered,setBracketHovered]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),theme=(0,nano_theme__WEBPACK_IMPORTED_MODULE_1__.useTheme)(),{noCollapseToggles}=(0,_context_style__WEBPACK_IMPORTED_MODULE_3__.y)(),onBracketMouseEnter=()=>{setBracketHovered(!0)},onBracketMouseLeave=()=>{setBracketHovered(!1)},bracketColor=theme.g(.3);collapsedView=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{className:_css__WEBPACK_IMPORTED_MODULE_2__.Il,style:{display:collapsed?void 0:"none"},onClick:onCollapsedClick,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{style:{color:_css__WEBPACK_IMPORTED_MODULE_2__.iN},children:brackets[0]}),collapsedView,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{style:{color:_css__WEBPACK_IMPORTED_MODULE_2__.iN},children:brackets[1]})]});const bracket1=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{children:[property,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{className:_css__WEBPACK_IMPORTED_MODULE_2__.wk+(brackedHovered?_css__WEBPACK_IMPORTED_MODULE_2__.vx:""),style:{display:collapsed?"none":void 0,color:bracketColor},onMouseEnter:onBracketMouseEnter,onMouseLeave:onBracketMouseLeave,onClick:onBracketClick,children:[brackets[0],!!header&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{style:{display:"inline-block",position:"absolute",top:"-0.27em",left:"1em"},children:header})]})]});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span",{className:_css__WEBPACK_IMPORTED_MODULE_2__.Ry,onClick,children:[!noCollapseToggles&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{className:_css__WEBPACK_IMPORTED_MODULE_2__.B2,style:{color:theme.g(.6)},onClick:onCollapserClick,children:collapsed?"+":"—"}),bracket1,collapsedView,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{className:_css__WEBPACK_IMPORTED_MODULE_2__.pb,style:{display:collapsed?"none":void 0},children}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{className:_css__WEBPACK_IMPORTED_MODULE_2__.wk+(brackedHovered?_css__WEBPACK_IMPORTED_MODULE_2__.vx:""),style:{display:collapsed?"none":void 0,color:bracketColor},onMouseEnter:onBracketMouseEnter,onMouseLeave:onBracketMouseLeave,onClick:onBracketClick,children:brackets[1]}),!!comma&&","]})};ObjectLayout.displayName="ObjectLayout";try{ObjectLayout.displayName="ObjectLayout",ObjectLayout.__docgenInfo={description:"",displayName:"ObjectLayout",props:{property:{defaultValue:null,description:"",name:"property",required:!1,type:{name:"ReactNode"}},collapsedView:{defaultValue:null,description:"",name:"collapsedView",required:!1,type:{name:"ReactNode"}},header:{defaultValue:null,description:"",name:"header",required:!1,type:{name:"ReactNode"}},collapsed:{defaultValue:null,description:"",name:"collapsed",required:!1,type:{name:"boolean"}},comma:{defaultValue:null,description:"",name:"comma",required:!1,type:{name:"boolean"}},brackets:{defaultValue:{value:"['{', '}']"},description:"",name:"brackets",required:!1,type:{name:"[opening: string, closing: string]"}},manageCollapse:{defaultValue:null,description:"",name:"manageCollapse",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"MouseEventHandler<Element>"}},onCollapserClick:{defaultValue:null,description:"",name:"onCollapserClick",required:!1,type:{name:"MouseEventHandler<Element>"}},onCollapsedClick:{defaultValue:null,description:"",name:"onCollapsedClick",required:!1,type:{name:"MouseEventHandler<Element>"}},onBracketClick:{defaultValue:null,description:"",name:"onBracketClick",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ObjectLayout/index.tsx#ObjectLayout"]={docgenInfo:ObjectLayout.__docgenInfo,name:"ObjectLayout",path:"src/ObjectLayout/index.tsx#ObjectLayout"})}catch(__react_docgen_typescript_loader_error){}},"./src/context/style.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>context,y:()=>useStyles});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const context=react__WEBPACK_IMPORTED_MODULE_0__.createContext({}),useStyles=()=>react__WEBPACK_IMPORTED_MODULE_0__.useContext(context)},"./src/css.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B2:()=>collapser,Cb:()=>property,Il:()=>collapsed,Md:()=>tooltip,Ry:()=>object,SM:()=>ValueColor,Sf:()=>insArrDot,UU:()=>insArrBlock,V0:()=>insArrLine,WQ:()=>lineInner,iN:()=>blue,jN:()=>insArrButton,jv:()=>line,ob:()=>colon,pb:()=>list,pd:()=>negative,qH:()=>input,vx:()=>bracketHovered,wk:()=>bracket});var nano_theme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/nano-theme/lib/index.js");const blue=nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.color.sem.blue[0],negative=nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.color.sem.negative[0],object=((0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({d:"inline-block",ff:"monospace",col:nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.g(.1)}),(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({pos:"relative",d:"inline-block"})),ValueColor={nil:[nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.g(0,.4),nano_theme__WEBPACK_IMPORTED_MODULE_0__.darkTheme.g(0,.4)],undef:[nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.g(0,.2),nano_theme__WEBPACK_IMPORTED_MODULE_0__.darkTheme.g(0,.2)],str:["#e00e44","#f01e54"],bool:["#411888","#9168c8"],num:["#0a8F3F","#0FaF4F"],zero:["#748A00","#94AA11"],float:["#016873","#51a8b3"]},property=((0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({col:"#E84D3D"}),(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({pad:"0",fw:"bold",bxz:"border-box",va:"top"})),activeInput={col:nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.g(0),pd:"5px",bg:nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.bg,bd:`1px solid ${nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.g(.7)}`,mr:"-6px",out:0},input=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({z:2,pos:"relative",bd:0,mar:0,pad:0,bg:"transparent",bdrad:"5px",d:"inline-block",minW:"auto",w:"auto","&::selection":{col:"#fff",bgc:blue},input:{out:0}}),colon=((0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)(activeInput),(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({pd:"0 8px 0 0px",cur:"default",va:"top","&>span":{pd:"0 2px"},"&:hover":{"&>span":{out:`1px dotted ${blue}`}}})),list=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({d:"block",listStyleType:"none",pd:0,mr:"0 0 0 32px"}),line=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({d:"block",ls:"none",pd:0,mr:0}),lineInner=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({d:"inline-block"}),bracket=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({pos:"relative",cur:"default"}),collapser=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({pd:"0 6px",pos:"absolute",t:"0px",l:"-24px",cur:"default",us:"none"}),collapsed=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({col:blue,cur:"default",fw:"bold",bg:nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.blue(.1),pd:"2px",mr:"-2px",bdrad:"4px"}),bracketHovered=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({out:`1px dotted ${blue}`}),insArrBlock=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({pos:"relative",h:"0px",w:"0px"}),insArrDot=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({pos:"absolute",t:"0px",l:"-4px",w:"3px",h:"3px",bdrad:"50%",bg:blue,pe:"none",[`.${insArrBlock.trim()}:hover &`]:{top:"-2px",left:"2px",w:"7px",h:"7px"}}),insArrLine=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({pos:"absolute",t:"1px",l:"-56px",w:"50px",h:"0px",bdt:`1px dotted ${blue}`,pe:"none",[`.${insArrBlock.trim()}:hover &`]:{l:"-56px",w:"56px",bdt:`1px solid ${blue}`}}),insArrButton=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({pos:"absolute",d:"block",t:"-8px",l:"-75px"}),tooltip=(0,nano_theme__WEBPACK_IMPORTED_MODULE_0__.rule)({...nano_theme__WEBPACK_IMPORTED_MODULE_0__.theme.font.ui1,pos:"absolute",d:"none",t:"-2.5em",l:"0px",bg:"rgba(0,0,0,.8)",col:"#fff",fz:12/13.4+"em",pad:".4em .8em",bdrad:".4em",z:3,pe:"none",us:"none",ws:"nowrap"})}}]);