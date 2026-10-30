import React from 'react';
export function Textarea({label,hint,rows=5,id,style,...rest}){
  const [f,setF]=React.useState(false);const iid=id||React.useId();
  return <label htmlFor={iid} style={{display:'flex',flexDirection:'column',gap:8,fontFamily:'var(--font-sans)',...style}}>
    {label&&<span style={{fontSize:13,fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--fg-2)'}}>{label}</span>}
    <textarea id={iid} rows={rows} onFocus={()=>setF(true)} onBlur={()=>setF(false)} {...rest}
      style={{padding:'14px 18px',background:'var(--bg-2)',color:'var(--fg-1)',fontFamily:'inherit',fontSize:16,lineHeight:1.5,borderRadius:'var(--radius-md)',outline:'none',resize:'vertical',
      border:'1px solid '+(f?'var(--accent)':'var(--border-2)'),boxShadow:f?'0 0 0 3px rgba(81,101,248,.25)':'none',transition:'all var(--dur-fast) var(--ease-out)'}}/>
    {hint&&<span style={{fontSize:13,color:'var(--fg-3)'}}>{hint}</span>}
  </label>;
}