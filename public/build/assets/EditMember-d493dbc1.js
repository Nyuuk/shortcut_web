import{j as e,r as i,b as m,y as g}from"./app-51a4d728.js";import{C as u}from"./Checkbox-a77e6ce2.js";import"./TextInput-d99ed117.js";import{A as j}from"./Admin-a8153a28.js";import"./dayjs.min-322c0437.js";import{B as y,L as x,S as f}from"./Toast-3a17b069.js";import{C as h}from"./Card-a9a93412.js";import{SvgCash as N,SvgDebit as b}from"./FormMember-2fc3f450.js";import{addNotif as p}from"./Notification-687986aa.js";/* empty css            */import"./signalsComponents-9f2c803d.js";import"./runtime.module-d88397df.js";import"./ConvertToWib-9b60ea4e.js";import"./index-1bed09f8.js";import"./InputError-43a47927.js";import"./InputLabel-228773a1.js";function H({data:s}){const c={root:{children:"flex h-full flex-col gap-4 p-6"}};return e.jsx(j,{children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsx(k,{data:s,theme:c}),e.jsx(_,{data:s,theme:c})]})})}const v=({onChangeValue:s=()=>{},value:c=[],label:n="Programs"})=>{const[l,r]=i.useState([]),t=a=>{const o=c;o.includes(Number(a))?o.splice(o.indexOf(Number(a)),1):o.push(Number(a)),s(o)},d=async()=>{try{const a=await m.get(route("dashboard.api.get-programs"));a.status===200&&r(a.data.data)}catch(a){console.error(a)}};return i.useEffect(()=>{d()},[]),e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("div",{className:"block",children:e.jsx(x,{htmlFor:"programs",value:n,className:"md:text-base"})}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4",children:l.length===0?e.jsx("span",{className:"text-red-500",children:"Loading . . . "}):l.map(a=>e.jsxs("div",{className:"flex flex-row gap-2 items-center",children:[e.jsx(u,{id:a.id,value:a.id,checked:c.includes(a.id),onChange:()=>t(a.id)}),e.jsx(x,{htmlFor:a.id,className:"capitalize",children:a.nama})]},a.id))})]})},k=({data:s,className:c,theme:n})=>e.jsxs(h,{className:" "+c,theme:n,children:[e.jsxs("div",{className:"flex flex-col gap-2 text-gray-700/70 dark:text-gray-100/60 justify-center",children:[e.jsx("h1",{className:"text-2xl text-center uppercase",children:"Personal Data"}),e.jsx("div",{className:"block w-full border-2 border-gray-400/70 dark:border-gray-700/70 rounded-md"})]}),e.jsxs("div",{className:"grid grid-cols-6 gap-y-3 text-gray-700/70 dark:text-gray-100/40 px-1 break-words",children:[e.jsx("span",{className:"col-span-2",children:"Nama"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-gray-700/90 dark:text-gray-100/60",children:s.nama}),e.jsx("span",{className:"col-span-2",children:"Email"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-gray-700/90 dark:text-gray-100/60",children:s.email}),e.jsx("span",{className:"col-span-2",children:"Whatsapp Number"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-gray-700/90 dark:text-gray-100/60",children:s.no_wa}),e.jsx("span",{className:"col-span-2",children:"Home Address"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-gray-700/90 dark:text-gray-100/60",children:s.alamat_ht}),e.jsx("span",{className:"col-span-2",children:"Temporary Address"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-gray-700/90 dark:text-gray-100/60",children:s.alamat_st}),e.jsx("span",{className:"col-span-2",children:"Period"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-gray-700/90 dark:text-gray-100/60",children:s.period}),e.jsx("span",{className:"col-span-2",children:"Asked Programs"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-xs text-gray-700/90 dark:text-gray-100/60 flex flex-row gap-1 flex-wrap",children:s.programs.map((l,r)=>e.jsx("span",{className:"bg-cyan-600 px-2 py-1 rounded uppercase font-bold text-center items-center flex justify-center",children:l},r))}),e.jsx("span",{className:"col-span-2",children:"Accepted Programs"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-xs text-gray-700/90 dark:text-gray-100/60 flex flex-row gap-1 flex-wrap",children:s!=null&&s.programs_acc_name?s.programs_acc_name.map((l,r)=>e.jsx("span",{className:"bg-green-600 px-2 py-1 rounded uppercase font-bold text-center items-center flex justify-center",children:l},r)):e.jsx("span",{className:"text-base",children:"No Accepted Programs"})}),e.jsx("span",{className:"col-span-2",children:"Invoice Status"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 "+(s.invoice.status?"text-green-500":"text-red-500"),children:s.invoice.status?"Paid":"Unpaid"}),e.jsx("span",{className:"col-span-2",children:"Invoice Number"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-gray-700/90 dark:text-gray-100/60 italic",children:s.invoice.invoice_number}),e.jsx("span",{className:"col-span-2",children:"Payment Method"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-gray-700/90 dark:text-gray-100/60 font-bold",children:s.invoice.payment_method.name}),e.jsx("span",{className:"col-span-2",children:"Note"}),e.jsx("span",{children:":"}),e.jsx("span",{className:"col-span-3 text-gray-700/90 dark:text-gray-100/60",children:s.catatan})]})]}),_=({data:s,theme:c,...n})=>{const{className:l}=n,[r,t]=i.useState({programs:[...s.programs_acc??s.programs_id],payment_method_id:s.invoice.payment_method_id,status_invoice:s.invoice.status}),d=async a=>{a.preventDefault();try{const o=await m.put(route("dashboard.api.put-request",{id:s.id}),r);(o.status=200)?(p({title:"Data has been updated successfully",success:!0}),g.visit(route("dashboard.edit-member",{id:s.id}),{})):p({title:"Failed to update data",success:!1})}catch(o){p({title:"Failed to update data | check console and report to developer",success:!1}),console.error(o)}};return i.useEffect(()=>{console.log(r)},[r]),e.jsx(e.Fragment,{children:e.jsxs(h,{className:l,theme:c,children:[e.jsxs("div",{className:"flex flex-col gap-2 text-gray-700/70 dark:text-gray-100/60 justify-center",children:[e.jsx("h1",{className:"text-2xl text-center uppercase",children:"Be able to be edited"}),e.jsx("div",{className:"block w-full border-2 border-gray-400/70 dark:border-gray-700/70 rounded-md"})]}),e.jsxs("form",{className:"flex flex-col gap-5",onSubmit:d,children:[e.jsx(v,{value:r.programs,onChangeValue:a=>t({...r,programs:a}),label:"Programs will be accepted"}),e.jsx(w,{value:r.status_invoice,changeValue:a=>t({...r,status_invoice:JSON.parse(a)})}),e.jsx(P,{value:r.payment_method_id,changeValue:a=>t({...r,payment_method_id:a})}),e.jsx(y,{type:"submit",children:"Submit"})]})]})})},P=({value:s=1,changeValue:c=()=>{}})=>{const[n,l]=i.useState([]),r=async()=>{try{const t=await m.get(route("dashboard.api.get-payment-methods"));t.status===200&&l(t.data.data)}catch(t){console.error(t)}};return i.useEffect(()=>{r()},[]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex gap-2 flex-col",children:[e.jsx("div",{className:"block",children:e.jsx(x,{value:"Payment Method",htmlFor:"payment_method",className:"md:text-base"})}),e.jsx("div",{className:"flex flex-col gap-2",children:n.map((t,d)=>e.jsx("div",{className:"w-full py-2 px-3 rounded  hover:text-white hover:dark:font-bold hover:bg-cyan-700/70 "+(t.id===s?"bg-cyan-700/70 font-bold text-white":"dark:bg-gray-700 bg-gray-300 hover:cursor-pointer"),onClick:()=>c(t.id),children:e.jsxs("div",{className:"flex flex-row items-center gap-3",children:[e.jsx("div",{className:"block w-10 h-10 bg-gray-500 p-1 rounded",children:t.type==="cash"?e.jsx(N,{}):e.jsx(b,{})}),e.jsx("div",{className:"flex flex-col",children:e.jsx("span",{className:"text-gray-700/90 dark:text-gray-100/60",children:t.name})})]})},d))})]})})},w=({value:s=!0,changeValue:c})=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"block",children:e.jsx(x,{htmlFor:"status_invoice",value:"Status Invoice",className:"md:text-base"})}),e.jsxs(f,{id:"status_invoice",required:!0,onChange:n=>c(n.target.value),defaultValue:s,children:[e.jsx("option",{value:!1,children:"Unpaid"}),e.jsx("option",{value:!0,children:"Paid"})]})]});export{H as default};
