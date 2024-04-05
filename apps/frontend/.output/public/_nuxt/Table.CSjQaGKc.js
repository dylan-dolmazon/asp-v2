import{P as D,r as ue,aj as de,q as u,ak as ce,a6 as ge,m as J,g as A,_ as L,h as Y,k as H,l as N,x as me,y as I,o as i,c as d,a as y,ac as fe,al as be,z as U,B as o,A as O,d as K,t as S,C as w,V as ve,am as X,X as M,Y as R,an as ye,j as _,J as ee,ao as pe,s as Z,ag as x,b as E,F as T,U as he,ap as Q}from"./entry.DwqXwOyw.js";const ke={wrapper:"relative overflow-x-auto",base:"min-w-full table-fixed",divide:"divide-y divide-gray-300 dark:divide-gray-700",thead:"relative",tbody:"divide-y divide-gray-200 dark:divide-gray-800",tr:{base:"",selected:"bg-gray-50 dark:bg-gray-800/50",active:"hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"},th:{base:"text-left rtl:text-right",padding:"px-4 py-3.5",color:"text-gray-900 dark:text-white",font:"font-semibold",size:"text-sm"},td:{base:"whitespace-nowrap",padding:"px-4 py-4",color:"text-gray-500 dark:text-gray-400",font:"",size:"text-sm"},checkbox:{padding:"ps-4"},loadingState:{wrapper:"flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",label:"text-sm text-center text-gray-900 dark:text-white",icon:"w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin"},emptyState:{wrapper:"flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",label:"text-sm text-center text-gray-900 dark:text-white",icon:"w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4"},progress:{wrapper:"absolute inset-x-0 -bottom-[0.5px] p-0"},default:{sortAscIcon:"i-heroicons-bars-arrow-up-20-solid",sortDescIcon:"i-heroicons-bars-arrow-down-20-solid",sortButton:{icon:"i-heroicons-arrows-up-down-20-solid",trailing:!0,square:!0,color:"gray",variant:"ghost",class:"-m-1.5"},progress:{color:"primary",animation:"carousel"},loadingState:{icon:"i-heroicons-arrow-path-20-solid",label:"Loading..."},emptyState:{icon:"i-heroicons-circle-stack-20-solid",label:"No items."}}},we={wrapper:"w-full flex flex-col gap-2",indicator:{container:{base:"flex flex-row justify-end",width:"min-w-fit",transition:"transition-all"},align:"text-end",width:"w-fit",color:"text-gray-400 dark:text-gray-500",size:{"2xs":"text-xs",xs:"text-xs",sm:"text-sm",md:"text-sm",lg:"text-sm",xl:"text-base","2xl":"text-base"}},progress:{base:"block appearance-none border-none overflow-hidden",width:"w-full [&::-webkit-progress-bar]:w-full",size:{"2xs":"h-px",xs:"h-0.5",sm:"h-1",md:"h-2",lg:"h-3",xl:"h-4","2xl":"h-5"},rounded:"rounded-full [&::-webkit-progress-bar]:rounded-full",track:"[&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:dark:bg-gray-700 [@supports(selector(&::-moz-progress-bar))]:bg-gray-200 [@supports(selector(&::-moz-progress-bar))]:dark:bg-gray-700",bar:"[&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:ease-in-out [&::-moz-progress-bar]:rounded-full",color:"text-{color}-500 dark:text-{color}-400",background:"[&::-webkit-progress-value]:bg-current [&::-moz-progress-bar]:bg-current",indeterminate:{base:"indeterminate:relative",rounded:"indeterminate:after:rounded-full [&:indeterminate::-webkit-progress-value]:rounded-full [&:indeterminate::-moz-progress-bar]:rounded-full"}},steps:{base:"grid grid-cols-1",color:"text-{color}-500 dark:text-{color}-400",size:{"2xs":"text-xs",xs:"text-xs",sm:"text-sm",md:"text-sm",lg:"text-sm",xl:"text-base","2xl":"text-base"}},step:{base:"transition-all opacity-0 truncate row-start-1 col-start-1",align:"text-end",active:"opacity-100",first:"text-gray-500 dark:text-gray-400"},animation:{carousel:"bar-animation-carousel","carousel-inverse":"bar-animation-carousel-inverse",swing:"bar-animation-swing",elastic:"bar-animation-elastic"},default:{color:"primary",size:"md",animation:"carousel"}},Se={wrapper:"relative flex items-start",container:"flex items-center h-5",base:"h-4 w-4 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent",form:"form-checkbox",rounded:"rounded",color:"text-{color}-500 dark:text-{color}-400",background:"bg-white dark:bg-gray-900",border:"border border-gray-300 dark:border-gray-700",ring:"focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",inner:"ms-3 flex flex-col",label:"text-sm font-medium text-gray-700 dark:text-gray-200",required:"text-sm text-red-500 dark:text-red-400",help:"text-sm text-gray-500 dark:text-gray-400",default:{color:"primary"}},Ce=(e,t)=>{const s=D("form-events",void 0),a=D("form-group",void 0),p=D("form-inputs",void 0);a&&(e!=null&&e.id&&(a.inputId.value=e==null?void 0:e.id),p&&(p.value[a.name.value]=a.inputId.value));const g=ue(!1);function n(r,m){s&&s.emit({type:r,path:m})}function f(){n("blur",a==null?void 0:a.name.value),g.value=!0}function h(){n("change",a==null?void 0:a.name.value)}const c=de(()=>{(g.value||a!=null&&a.eagerValidation.value)&&n("input",a==null?void 0:a.name.value)},300);return{inputId:u(()=>(e==null?void 0:e.id)??(a==null?void 0:a.inputId.value)),name:u(()=>(e==null?void 0:e.name)??(a==null?void 0:a.name.value)),size:u(()=>{var m;const r=t.size[a==null?void 0:a.size.value]?a==null?void 0:a.size.value:null;return(e==null?void 0:e.size)??r??((m=t==null?void 0:t.default)==null?void 0:m.size)}),color:u(()=>{var r;return(r=a==null?void 0:a.error)!=null&&r.value?"red":e==null?void 0:e.color}),emitFormBlur:f,emitFormInput:c,emitFormChange:h}},$e=Symbol.for("nuxt:client-only"),Ie="data-n-ids";function Ae(e){var p,g,n,f,h,c;if(typeof e!="string")throw new TypeError("[nuxt] [useId] key must be a string.");e=e.slice(1);const t=ce(),s=ge();if(!s)throw new TypeError("[nuxt] `useId` must be called within a component setup function.");t._id||(t._id=0),s._nuxtIdIndex||(s._nuxtIdIndex={}),(p=s._nuxtIdIndex)[e]||(p[e]=0);const a=e+":"+s._nuxtIdIndex[e]++;if(t.payload.serverRendered&&t.isHydrating&&!D($e,!1)){const r=((g=s.vnode.el)==null?void 0:g.nodeType)===8&&((f=(n=s.vnode.el)==null?void 0:n.nextElementSibling)!=null&&f.getAttribute)?(h=s.vnode.el)==null?void 0:h.nextElementSibling:s.vnode.el,m=JSON.parse(((c=r==null?void 0:r.getAttribute)==null?void 0:c.call(r,Ie))||"{}");if(m[a])return m[a]}return e+"_"+t._id++}const G=J(A.ui.strategy,A.ui.checkbox,Se),ze=Y({inheritAttrs:!1,props:{id:{type:String,default:()=>null},value:{type:[String,Number,Boolean,Object],default:null},modelValue:{type:[Boolean,Array],default:null},name:{type:String,default:null},disabled:{type:Boolean,default:!1},indeterminate:{type:Boolean,default:void 0},help:{type:String,default:null},label:{type:String,default:null},required:{type:Boolean,default:!1},color:{type:String,default:()=>G.default.color,validator(e){return A.ui.colors.includes(e)}},inputClass:{type:String,default:""},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},emits:["update:modelValue","change"],setup(e,{emit:t}){const{ui:s,attrs:a}=H("checkbox",N(e,"ui"),G,N(e,"class")),{emitFormChange:p,color:g,name:n,inputId:f}=Ce(e),h=f.value??Ae("$xUyUWZogaw"),c=u({get(){return e.modelValue},set(b){t("update:modelValue",b)}}),r=b=>{t("change",b),p()},m=u(()=>me(I(s.value.base,s.value.form,s.value.rounded,s.value.background,s.value.border,g.value&&s.value.ring.replaceAll("{color}",g.value),g.value&&s.value.color.replaceAll("{color}",g.value)),e.inputClass));return{ui:s,attrs:a,toggle:c,inputId:h,name:n,inputClass:m,onChange:r}}}),Ve=["id","name","required","value","disabled","indeterminate"],Be=["for"];function je(e,t,s,a,p,g){return i(),d("div",{class:o(e.ui.wrapper)},[y("div",{class:o(e.ui.container)},[fe(y("input",U({id:e.inputId,"onUpdate:modelValue":t[0]||(t[0]=n=>e.toggle=n),name:e.name,required:e.required,value:e.value,disabled:e.disabled,indeterminate:e.indeterminate,type:"checkbox",class:e.inputClass},e.attrs,{onChange:t[1]||(t[1]=(...n)=>e.onChange&&e.onChange(...n))}),null,16,Ve),[[be,e.toggle]])],2),e.label||e.$slots.label?(i(),d("div",{key:0,class:o(e.ui.inner)},[y("label",{for:e.inputId,class:o(e.ui.label)},[O(e.$slots,"label",{},()=>[K(S(e.label),1)]),e.required?(i(),d("span",{key:0,class:o(e.ui.required)},"*",2)):w("",!0)],10,Be),e.help?(i(),d("p",{key:0,class:o(e.ui.help)},S(e.help),3)):w("",!0)],2)):w("",!0)],2)}const te=L(ze,[["render",je]]),F=J(A.ui.strategy,A.ui.progress,we),Oe=Y({inheritAttrs:!1,props:{value:{type:Number,default:null},max:{type:[Number,Array],default:100},indicator:{type:Boolean,default:!1},animation:{type:String,default:()=>F.default.animation,validator(e){return Object.keys(F.animation).includes(e)}},size:{type:String,default:()=>F.default.size,validator(e){return Object.keys(F.progress.size).includes(e)}},color:{type:String,default:()=>F.default.color,validator(e){return A.ui.colors.includes(e)}},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e){const{ui:t,attrs:s}=H("progress",N(e,"ui"),F,N(e,"class")),a=u(()=>I(t.value.indicator.container.base,t.value.indicator.container.width,t.value.indicator.container.transition)),p=u(()=>I(t.value.indicator.align,t.value.indicator.width,t.value.indicator.color,t.value.indicator.size[e.size])),g=u(()=>{var $;const v=[t.value.progress.base,t.value.progress.width,t.value.progress.size[e.size],t.value.progress.rounded,t.value.progress.track,t.value.progress.bar,($=t.value.progress.color)==null?void 0:$.replaceAll("{color}",e.color),t.value.progress.background,t.value.progress.indeterminate.base,t.value.progress.indeterminate.rounded];return C.value&&v.push(t.value.animation[e.animation]),I(...v)}),n=u(()=>{var v;return I(t.value.steps.base,(v=t.value.steps.color)==null?void 0:v.replaceAll("{color}",e.color),t.value.steps.size[e.size])}),f=u(()=>I(t.value.step.base,t.value.step.align)),h=u(()=>I(t.value.step.active)),c=u(()=>I(t.value.step.first));function r(v){return v===Number(e.value)}function m(v){return v===0}function b(v){v=Number(v);const $=[f.value];return m(v)&&$.push(c.value),r(v)&&$.push(h.value),$.join(" ")}const C=u(()=>e.value===void 0||e.value===null),z=u(()=>Array.isArray(e.max)),V=u(()=>C.value?null:Array.isArray(e.max)?e.max.length-1:Number(e.max)),q=u(()=>{if(!C.value)switch(!0){case e.value<0:return 0;case e.value>V.value:return 100;default:return e.value/V.value*100}});return{ui:t,attrs:s,indicatorContainerClass:a,indicatorClass:p,progressClass:g,stepsClass:n,stepClasses:b,isIndeterminate:C,isSteps:z,realMax:V,percent:q}}});function Ue(e,t,s,a,p,g){return i(),d("div",U({class:e.ui.wrapper},e.attrs),[e.indicator||e.$slots.indicator?O(e.$slots,"indicator",X(U({key:0},{percent:e.percent})),()=>[e.isSteps?w("",!0):(i(),d("div",{key:0,class:o(e.indicatorContainerClass),style:ve({width:`${e.percent}%`})},[y("div",{class:o(e.indicatorClass)},S(Math.round(e.percent))+"% ",3)],6))],!0):w("",!0),y("progress",U({class:e.progressClass},{value:e.value,max:e.realMax}),S(e.percent!==void 0?`${Math.round(e.percent)}%`:void 0),17),e.isSteps?(i(),d("div",{key:1,class:o(e.stepsClass)},[(i(!0),d(M,null,R(e.max,(n,f)=>(i(),d("div",{key:f,class:o(e.stepClasses(f))},[O(e.$slots,`step-${f}`,X(ye({step:n})),()=>[K(S(n),1)],!0)],2))),128))],2)):w("",!0)],16)}const ae=L(Oe,[["render",Ue],["__scopeId","data-v-50282ab3"]]);function Fe(e){return e?e[0].toUpperCase()+e.slice(1):""}const j=J(A.ui.strategy,A.ui.table,ke);function Ne(e,t){return e===t}function P(e,t,s){return e===t?0:s==="asc"?e<t?-1:1:e>t?-1:1}const De=Y({components:{UIcon:_,UButton:ee,UProgress:ae,UCheckbox:te},inheritAttrs:!1,props:{modelValue:{type:Array,default:null},by:{type:[String,Function],default:()=>Ne},rows:{type:Array,default:()=>[]},columns:{type:Array,default:null},columnAttribute:{type:String,default:"label"},sort:{type:Object,default:()=>({})},sortMode:{type:String,default:"auto"},sortButton:{type:Object,default:()=>j.default.sortButton},sortAscIcon:{type:String,default:()=>j.default.sortAscIcon},sortDescIcon:{type:String,default:()=>j.default.sortDescIcon},loading:{type:Boolean,default:!1},loadingState:{type:Object,default:()=>j.default.loadingState},emptyState:{type:Object,default:()=>j.default.emptyState},progress:{type:Object,default:()=>j.default.progress},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},emits:["update:modelValue","update:sort"],setup(e,{emit:t,attrs:s}){const{ui:a,attrs:p}=H("table",N(e,"ui"),j,N(e,"class")),g=u(()=>e.columns??Object.keys(e.rows[0]??{}).map(l=>({key:l,label:Fe(l),sortable:!1,class:void 0,sort:P}))),n=pe(e,"sort",t,{passive:!0,defaultValue:Z({},e.sort,{column:null,direction:"asc"})}),f={column:n.value.column,direction:null},h=u(()=>{var B;if(!((B=n.value)!=null&&B.column)||e.sortMode==="manual")return e.rows;const{column:l,direction:k}=n.value;return e.rows.slice().sort((se,ne)=>{var W;const le=x(se,l),oe=x(ne,l);return(((W=g.value.find(ie=>ie.key===l))==null?void 0:W.sort)??P)(le,oe,k)})}),c=u({get(){return e.modelValue},set(l){t("update:modelValue",l)}}),r=u(()=>c.value&&c.value.length>0&&c.value.length<e.rows.length),m=u(()=>e.emptyState===null?null:{...a.value.default.emptyState,...e.emptyState}),b=u(()=>e.loadingState===null?null:{...a.value.default.loadingState,...e.loadingState});function C(l,k){if(typeof e.by=="string"){const B=e.by;return(l==null?void 0:l[B])===(k==null?void 0:k[B])}return e.by(l,k)}function z(l){return e.modelValue?c.value.some(k=>C(Q(k),Q(l))):!1}function V(l){if(n.value.column===l.key){const k=!l.direction||l.direction==="asc"?"desc":"asc";n.value.direction===k?n.value=Z({},f,{column:null,direction:"asc"}):n.value={column:n.value.column,direction:n.value.direction==="asc"?"desc":"asc"}}else n.value={column:l.key,direction:l.direction||"asc"}}function q(l){s.onSelect&&s.onSelect(l)}function v(){e.rows.forEach(l=>{z(l)||c.value.push(l)})}function $(l){l.target.checked?v():c.value=[]}function re(l,k,B=""){return x(l,k,B)}return{ui:a,attrs:p,sort:n,columns:g,rows:h,selected:c,indeterminate:r,emptyState:m,loadingState:b,isSelected:z,onSort:V,onSelect:q,onChange:$,getRowData:re}}}),Me={key:1},Re={key:0},qe={key:0},xe=["colspan"],Ee={key:1},Te=["colspan"],Je=["onClick"];function Le(e,t,s,a,p,g){const n=te,f=ee,h=ae,c=_;return i(),d("div",U({class:e.ui.wrapper},e.attrs),[y("table",{class:o([e.ui.base,e.ui.divide])},[y("thead",{class:o(e.ui.thead)},[y("tr",{class:o(e.ui.tr.base)},[e.modelValue?(i(),d("th",{key:0,scope:"col",class:o(e.ui.checkbox.padding)},[E(n,{"model-value":e.indeterminate||e.selected.length===e.rows.length,indeterminate:e.indeterminate,"aria-label":"Select all",onChange:e.onChange},null,8,["model-value","indeterminate","onChange"])],2)):w("",!0),(i(!0),d(M,null,R(e.columns,(r,m)=>(i(),d("th",{key:m,scope:"col",class:o([e.ui.th.base,e.ui.th.padding,e.ui.th.color,e.ui.th.font,e.ui.th.size,r.class])},[O(e.$slots,`${r.key}-header`,{column:r,sort:e.sort,onSort:e.onSort},()=>[r.sortable?(i(),T(f,U({key:0},{...e.ui.default.sortButton||{},...e.sortButton},{icon:!e.sort.column||e.sort.column!==r.key?e.sortButton.icon||e.ui.default.sortButton.icon:e.sort.direction==="asc"?e.sortAscIcon:e.sortDescIcon,label:r[e.columnAttribute],onClick:b=>e.onSort(r)}),null,16,["icon","label","onClick"])):(i(),d("span",Me,S(r[e.columnAttribute]),1))])],2))),128))],2),e.loading&&e.progress?(i(),d("tr",Re,[y("td",{colspan:0,class:o(e.ui.progress.wrapper)},[E(h,U({...e.ui.default.progress||{},...e.progress},{size:"2xs"}),null,16)],2)])):w("",!0)],2),y("tbody",{class:o(e.ui.tbody)},[e.loadingState&&e.loading&&!e.rows.length?(i(),d("tr",qe,[y("td",{colspan:e.columns.length+(e.modelValue?1:0)},[O(e.$slots,"loading-state",{},()=>[y("div",{class:o(e.ui.loadingState.wrapper)},[e.loadingState.icon?(i(),T(c,{key:0,name:e.loadingState.icon,class:o(e.ui.loadingState.icon),"aria-hidden":"true"},null,8,["name","class"])):w("",!0),y("p",{class:o(e.ui.loadingState.label)},S(e.loadingState.label),3)],2)])],8,xe)])):e.emptyState&&!e.rows.length?(i(),d("tr",Ee,[y("td",{colspan:e.columns.length+(e.modelValue?1:0)},[O(e.$slots,"empty-state",{},()=>[y("div",{class:o(e.ui.emptyState.wrapper)},[e.emptyState.icon?(i(),T(c,{key:0,name:e.emptyState.icon,class:o(e.ui.emptyState.icon),"aria-hidden":"true"},null,8,["name","class"])):w("",!0),y("p",{class:o(e.ui.emptyState.label)},S(e.emptyState.label),3)],2)])],8,Te)])):(i(!0),d(M,{key:2},R(e.rows,(r,m)=>(i(),d("tr",{key:m,class:o([e.ui.tr.base,e.isSelected(r)&&e.ui.tr.selected,e.$attrs.onSelect&&e.ui.tr.active,r==null?void 0:r.class]),onClick:()=>e.onSelect(r)},[e.modelValue?(i(),d("td",{key:0,class:o(e.ui.checkbox.padding)},[E(n,{modelValue:e.selected,"onUpdate:modelValue":t[0]||(t[0]=b=>e.selected=b),value:r,"aria-label":"Select row",onClick:t[1]||(t[1]=he(()=>{},["stop"]))},null,8,["modelValue","value"])],2)):w("",!0),(i(!0),d(M,null,R(e.columns,(b,C)=>{var z;return i(),d("td",{key:C,class:o([e.ui.td.base,e.ui.td.padding,e.ui.td.color,e.ui.td.font,e.ui.td.size,(z=r[b.key])==null?void 0:z.class])},[O(e.$slots,`${b.key}-data`,{column:b,row:r,index:m,getRowData:V=>e.getRowData(r,b.key,V)},()=>[K(S(e.getRowData(r,b.key)),1)])],2)}),128))],10,Je))),128))],2)],2)],16)}const Ke=L(De,[["render",Le]]);export{Ke as _,Ae as a,Ce as u};
