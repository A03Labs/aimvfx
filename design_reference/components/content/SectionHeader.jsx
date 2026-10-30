import React from 'react';
export function SectionHeader({index,eyebrow,title,lede,align='left',accent='indigo',style}){
  const ac={indigo:'var(--accent-text)',pink:'var(--aim-pink)',cyan:'var(--aim-cyan)'}[accent];
  return <header style={{display:'flex',flexDirection:'column',gap:16,textAlign:align,alignItems:align==='center'?'center':'flex-start',fontFamily:'var(--font-sans)',...style}}>
    {(index||eyebrow)&&<div style={{display:'flex',alignItems:'center',gap:12,fontSize:13,fontWeight:600,letterSpacing:'.16em',textTransform:'uppercase',color:ac}}>
      {index&&<span>{index}</span>}{index&&eyebrow&&<span style={{width:28,height:1,background:'currentColor'}}></span>}{eyebrow&&<span>{eyebrow}</span>}</div>}
    <h2 style={{margin:0,fontSize:'var(--fs-h1)',lineHeight:'var(--lh-heading)',letterSpacing:'var(--ls-heading)',fontWeight:700,color:'var(--fg-1)',textWrap:'balance',maxWidth:'18ch'}}>{title}</h2>
    {lede&&<p style={{margin:0,fontSize:'var(--fs-body-lg)',lineHeight:1.5,color:'var(--fg-2)',maxWidth:'52ch',textWrap:'pretty'}}>{lede}</p>}
  </header>;
}