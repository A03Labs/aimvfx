import React from 'react';
export function Input({label,hint,error,id,style,...rest}){
  const [f,setF]=React.useState(false);const iid=id||React.useId();
  return <label htmlFor={iid} style={{display:'flex',flexDirection:'column',gap:8,fontFamily:'var(--font-sans)',...style}}>
    {label&&<span style={{fontSize:13,fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--fg-2)'}}>{label}</span>}
    <input id={iid} onFocus={()=>setF(true)} onBlur={()=>setF(false)} {...rest}
      style={{height:52,padding:'0 18px',background:'var(--bg-2)',color:'var(--fg-1)',fontFamily:'inherit',fontSize:16,borderRadius:'var(--radius-md)',outline:'none',
      border:'1px solid '+(error?'var(--aim-danger)':f?'var(--accent)':'var(--border-2)'),boxShadow:f?'0 0 0 3px rgba(81,101,248,.25)':'none',transition:'all var(--dur-fast) var(--ease-out)'}}/>
    {(error||hint)&&<span style={{fontSize:13,color:error?'var(--aim-danger)':'var(--fg-3)'}}>{error||hint}</span>}
  </label>;
}