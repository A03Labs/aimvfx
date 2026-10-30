function Tile({item,go,showCat=true}){
  const [h,setH]=React.useState(false); const c=window.AIM2.cat(item.cat);
  return <a onClick={()=>go('p:'+item.slug)} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:'flex',flexDirection:'column',gap:12,cursor:'pointer',color:'var(--fg-1)'}}>
    <div style={{borderRadius:'var(--radius-sm)',overflow:'hidden'}}><window.Poster item={item} hover={h}/></div>
    <div style={{display:'flex',alignItems:'baseline',gap:10,fontSize:15,lineHeight:1.3}}>
      {showCat&&<span style={{fontSize:12,fontWeight:600,letterSpacing:'.14em',textTransform:'uppercase',color:c.id==='showreels'?'var(--fg-3)':c.id==='business'?'var(--accent-text)':c.id==='products'?'var(--accent-2)':'var(--fg-2)'}}>{c.label}</span>}
      <span style={{fontWeight:600,whiteSpace:'nowrap'}}>{item.client}</span><span style={{color:'var(--fg-3)',minWidth:0}}>― {item.project}</span>
      <span style={{marginLeft:'auto',color:'var(--fg-3)',opacity:h?1:0,transform:h?'none':'translateX(-6px)',transition:'all var(--dur-base) var(--ease-out)'}}>→</span>
    </div>
  </a>;
}
window.Tile=Tile;