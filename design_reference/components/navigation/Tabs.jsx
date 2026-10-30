import React from 'react';
export function Tabs({items=[],value,defaultValue,onChange,style}){
  const [v,setV]=React.useState(defaultValue??(items[0]&&(items[0].value??items[0])));const cur=value??v;
  return <div role="tablist" style={{display:'inline-flex',gap:4,padding:4,borderRadius:'var(--radius-pill)',border:'1px solid var(--border-2)',fontFamily:'var(--font-sans)',...style}}>
    {items.map(it=>{const val=it.value??it;const lab=it.label??it;const on=val===cur;
      return <button key={val} role="tab" aria-selected={on} onClick={()=>{setV(val);onChange&&onChange(val)}}
        style={{height:40,padding:'0 20px',borderRadius:'var(--radius-pill)',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:15,fontWeight:600,
        background:on?'var(--fg-1)':'transparent',color:on?'var(--bg-1)':'var(--fg-2)',transition:'all var(--dur-base) var(--ease-out)'}}>{lab}</button>})}
  </div>;
}