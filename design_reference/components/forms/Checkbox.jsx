import React from 'react';
export function Checkbox({label,checked,defaultChecked,onChange,style}){
  const [v,setV]=React.useState(!!defaultChecked);const on=checked??v;
  return <label style={{display:'inline-flex',alignItems:'center',gap:12,cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:16,color:'var(--fg-1)',...style}}>
    <input type="checkbox" checked={on} onChange={e=>{setV(e.target.checked);onChange&&onChange(e)}} style={{position:'absolute',opacity:0,width:0,height:0}}/>
    <span style={{width:22,height:22,borderRadius:6,display:'inline-flex',alignItems:'center',justifyContent:'center',border:'1.5px solid '+(on?'var(--accent)':'var(--border-strong)'),background:on?'var(--accent)':'transparent',transition:'all var(--dur-fast) var(--ease-out)'}}>
      {on&&<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12l5 5 9-10"/></svg>}
    </span>{label}
  </label>;
}