function IndexScreen({go,cols}){
  const D=window.AIM2; const [f,setF]=React.useState('all');
  const items=D.work.filter(w=>f==='all'||w.cat===f);
  const count=id=>id==='all'?D.work.length:D.work.filter(w=>w.cat===id).length;
  const F=(id,l)=><a key={id} onClick={()=>setF(id)} style={{cursor:'pointer',color:f===id?'var(--fg-1)':'var(--fg-3)',transition:'color var(--dur-fast)'}}>{l}<sup style={{fontSize:'.45em',marginLeft:4,verticalAlign:'super'}}>{count(id)}</sup></a>;
  return <main style={{padding:'0 var(--gutter)'}}>
    <section style={{padding:'var(--space-8) 0 var(--space-7)',display:'flex',flexDirection:'column',gap:'var(--space-6)'}}>
      <h1 style={{margin:0,fontSize:'clamp(28px,3.4vw,48px)',lineHeight:1.12,fontWeight:600,letterSpacing:'-.025em',maxWidth:'30ch',textWrap:'balance'}}>
        AIM VFX is a design &amp; motion studio making events, products and businesses <span style={{color:'var(--aim-indigo)'}}>impossible to miss.</span></h1>
      <nav style={{display:'flex',flexWrap:'wrap',gap:'4px 28px',fontSize:'clamp(22px,2.2vw,32px)',fontWeight:600,letterSpacing:'-.02em'}}>
        {F('all','All')}{D.cats.map(c=>F(c.id,c.label))}</nav>
    </section>
    <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax('+(cols==='2'?'min(100%,520px)':'min(100%,320px)')+',1fr))',gap:'48px 24px'}}>
      {items.map((w,i)=><div key={w.slug} style={{animation:'aim-rise var(--dur-slow) var(--ease-out) both',animationDelay:(i*40)+'ms'}}><window.Tile item={w} go={go} showCat={f==='all'}/></div>)}
    </section>
  </main>;
}
window.IndexScreen=IndexScreen;