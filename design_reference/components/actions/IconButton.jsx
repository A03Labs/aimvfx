import React from 'react';
export function IconButton({icon,label,variant='outline',size=44,style,...rest}){
  const [h,setH]=React.useState(false);
  const v={outline:{background:h?'var(--fg-1)':'transparent',color:h?'var(--bg-1)':'var(--fg-1)',border:'1px solid var(--border-2)'},
    solid:{background:h?'var(--accent-hover)':'var(--accent)',color:'#fff',border:'1px solid transparent'},
    ghost:{background:h?'var(--border-1)':'transparent',color:'var(--fg-1)',border:'1px solid transparent'}}[variant];
  return <button aria-label={label} title={label} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{width:size,height:size,borderRadius:'var(--radius-pill)',display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',padding:0,transition:'all var(--dur-fast) var(--ease-out)',...v,...style}} {...rest}>{icon}</button>;
}