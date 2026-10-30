import React from 'react';
export function Card({media,index,title,body,tags,href,onClick,tone='default',style,children}){
  const [h,setH]=React.useState(false);
  const bg={default:'var(--surface-card)',tint:'var(--panel-tint)',inverse:'var(--surface-inverse)'}[tone];
  const fg=tone==='inverse'?'var(--fg-inverse)':'var(--fg-1)';
  return <article onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{display:'flex',flexDirection:'column',background:bg,color:fg,borderRadius:'var(--radius-lg)',border:tone==='default'?'1px solid var(--border-1)':'none',overflow:'hidden',cursor:onClick||href?'pointer':'default',fontFamily:'var(--font-sans)',
    transform:h&&(onClick||href)?'translateY(-4px)':'none',transition:'transform var(--dur-base) var(--ease-out)',...style}}>
    {media&&<div style={{aspectRatio:'16/10',overflow:'hidden',background:'var(--bg-3)'}}><div style={{width:'100%',height:'100%',transform:h?'scale(1.04)':'none',transition:'transform var(--dur-slow) var(--ease-out)'}}>{media}</div></div>}
    <div style={{display:'flex',flexDirection:'column',gap:12,padding:28}}>
      {index&&<span style={{fontSize:13,fontWeight:600,letterSpacing:'.16em',color:tone==='tint'?'var(--panel-tint-fg)':tone==='inverse'?'var(--aim-indigo)':'var(--accent-text)'}}>{index}</span>}
      {title&&<h3 style={{margin:0,fontSize:24,lineHeight:1.15,fontWeight:700,letterSpacing:'-0.015em'}}>{title}</h3>}
      {body&&<p style={{margin:0,fontSize:16,lineHeight:1.55,opacity:.78}}>{body}</p>}
      {tags&&<div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:4}}>{tags}</div>}
      {children}
    </div>
  </article>;
}