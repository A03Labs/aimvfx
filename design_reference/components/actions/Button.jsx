import React from 'react';
const sizes={sm:{h:36,px:16,fs:14},md:{h:48,px:24,fs:16},lg:{h:60,px:32,fs:18}};
export function Button({variant='primary',size='md',iconLeft,iconRight,disabled,full,children,style,...rest}){
  const [h,setH]=React.useState(false);const [a,setA]=React.useState(false);
  const s=sizes[size]||sizes.md;
  const v={
    primary:{background:h?'var(--accent-hover)':'var(--accent)',color:'#fff',border:'1px solid transparent'},
    secondary:{background:h?'var(--fg-1)':'transparent',color:h?'var(--bg-1)':'var(--fg-1)',border:'1px solid var(--border-strong)'},
    inverse:{background:h?'var(--aim-cyan)':'var(--surface-inverse)',color:'var(--fg-inverse)',border:'1px solid transparent'},
    ghost:{background:h?'var(--border-1)':'transparent',color:'var(--fg-1)',border:'1px solid transparent'},
    link:{background:'transparent',color:h?'var(--fg-1)':'var(--accent-text)',border:'1px solid transparent',padding:0,height:'auto'},
  }[variant];
  return <button disabled={disabled} onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setA(false)}} onMouseDown={()=>setA(true)} onMouseUp={()=>setA(false)}
    style={{display:full?'flex':'inline-flex',whiteSpace:'nowrap',flex:'none',width:full?'100%':undefined,alignItems:'center',justifyContent:'center',gap:10,height:s.h,padding:'0 '+s.px+'px',borderRadius:'var(--radius-pill)',
    fontFamily:'var(--font-sans)',fontWeight:600,fontSize:s.fs,letterSpacing:'-0.005em',cursor:disabled?'not-allowed':'pointer',opacity:disabled?.4:1,
    transform:a&&!disabled?'scale(.97)':'none',transition:'background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),transform var(--dur-instant) var(--ease-out)',outline:'none',...v,...style}} {...rest}>
    {iconLeft}{children}{iconRight&&<span style={{display:'inline-flex',transform:h&&!disabled?'translateX(3px)':'none',transition:'transform var(--dur-base) var(--ease-out)'}}>{iconRight}</span>}
  </button>;
}