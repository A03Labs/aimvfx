import React from 'react';
export function Toast({tone='info',title,message,onClose,style}){
  const c={info:'var(--aim-cyan)',success:'var(--aim-success)',warning:'var(--aim-warning)',danger:'var(--aim-danger)'}[tone];
  return <div role="status" style={{display:'flex',alignItems:'flex-start',gap:14,padding:'16px 18px',minWidth:300,maxWidth:420,background:'var(--surface-raised)',color:'var(--fg-1)',border:'1px solid var(--border-1)',borderRadius:'var(--radius-md)',boxShadow:'var(--shadow-2)',fontFamily:'var(--font-sans)',...style}}>
    <span style={{width:10,height:10,borderRadius:99,background:c,marginTop:6,flex:'none'}}></span>
    <div style={{flex:1,display:'flex',flexDirection:'column',gap:2}}><strong style={{fontSize:15,fontWeight:600}}>{title}</strong>{message&&<span style={{fontSize:14,color:'var(--fg-2)'}}>{message}</span>}</div>
    {onClose&&<button aria-label="Dismiss" onClick={onClose} style={{background:'none',border:'none',color:'var(--fg-3)',cursor:'pointer',padding:0}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>}
  </div>;
}