import React from 'react';
export function Tooltip({label,children,side='top'}){
  const [o,setO]=React.useState(false);
  const pos=side==='top'?{bottom:'calc(100% + 8px)'}:{top:'calc(100% + 8px)'};
  return <span onMouseEnter={()=>setO(true)} onMouseLeave={()=>setO(false)} style={{position:'relative',display:'inline-flex'}}>
    {children}
    <span role="tooltip" style={{position:'absolute',left:'50%',...pos,transform:'translateX(-50%) '+(o?'translateY(0)':'translateY(4px)'),opacity:o?1:0,pointerEvents:'none',whiteSpace:'nowrap',
      background:'var(--surface-inverse)',color:'var(--fg-inverse)',fontFamily:'var(--font-sans)',fontSize:13,fontWeight:500,padding:'6px 10px',borderRadius:6,transition:'all var(--dur-fast) var(--ease-out)'}}>{label}</span>
  </span>;
}