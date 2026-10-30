import React from 'react';
export function Dialog({open,onClose,title,children,actions,width=560}){
  if(!open) return null;
  return <div onClick={onClose} style={{position:'fixed',inset:0,background:'var(--overlay)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:24,zIndex:100,animation:'aim-rise var(--dur-base) var(--ease-out)'}}>
    <div role="dialog" onClick={e=>e.stopPropagation()} style={{width:'100%',maxWidth:width,background:'var(--surface-raised)',color:'var(--fg-1)',borderRadius:'var(--radius-lg)',border:'1px solid var(--border-1)',boxShadow:'var(--shadow-3)',padding:36,fontFamily:'var(--font-sans)',display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16}}>
        <h3 style={{margin:0,fontSize:28,fontWeight:700,letterSpacing:'-0.02em',lineHeight:1.1}}>{title}</h3>
        <button aria-label="Close" onClick={onClose} style={{background:'none',border:'none',color:'var(--fg-2)',cursor:'pointer',padding:4}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      </div>
      <div style={{color:'var(--fg-2)',fontSize:16,lineHeight:1.55}}>{children}</div>
      {actions&&<div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>{actions}</div>}
    </div>
  </div>;
}