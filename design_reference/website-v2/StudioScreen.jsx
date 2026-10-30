function StudioScreen({go}){
  const [h,setH]=React.useState(false); const reel=window.AIM2.work[0];
  const P=[['01','Events','#24d6f4',['Event branding','Campaign visuals','Motion graphics','Stage & screen visuals','Photography','Video coverage','Event recap films']],
   ['02','Products','#fe71ff',['Explainer videos','Product videos','Motion graphics','UI animation','Product demos','Launch videos','3D / visualisation']],
   ['03','Business','#5165f8',['Pitch decks','Investor presentations','Business proposals','Company profiles','Sales presentations','Corporate communications','Data & information design']]];
  return <main style={{padding:'0 var(--gutter)'}}>
    <section style={{padding:'var(--space-8) 0 var(--space-7)'}}><h1 style={{margin:0,fontSize:'clamp(36px,5vw,80px)',lineHeight:1,fontWeight:700,letterSpacing:'-.035em',maxWidth:'18ch'}}>Design that makes things clear. <span style={{color:'var(--fg-3)'}}>Motion that makes them move.</span></h1></section>
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={()=>go('p:'+reel.slug)} style={{cursor:'pointer'}}><window.Poster item={reel} hover={h} ratio="21/9"/></div>
    <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,360px),1fr))',gap:'var(--space-6)',padding:'var(--space-9) 0 var(--space-6)',borderBottom:'1px solid var(--border-1)'}}>
      <h2 style={{margin:0,fontSize:'clamp(40px,5vw,80px)',lineHeight:.98,fontWeight:700,letterSpacing:'-.035em'}}>We help ideas move.</h2>
      <div style={{display:'flex',flexDirection:'column',gap:4,fontSize:'clamp(24px,2.6vw,40px)',fontWeight:600,letterSpacing:'-.02em',lineHeight:1.2}}>
        {[['Events','var(--fg-2)','#24d6f4','people'],['Products','var(--accent-2)','#fe71ff','understanding'],['Businesses','var(--accent-text)','#5165f8','decisions']].map(([k,c,dot,v])=><div key={k} style={{display:'flex',flexDirection:'column',gap:0,paddingBottom:12}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:12,fontSize:'.55em',color:'var(--fg-3)',letterSpacing:0}}><span style={{width:12,height:12,borderRadius:99,background:dot,flex:'none'}}></span>{k} →</span>
          <span>move <span style={{color:c}}>{v}.</span></span></div>)}
      </div>
    </section>
    <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'var(--space-6)',padding:'var(--space-8) 0'}}>
      {P.map(([n,t,c,s])=><div key={t} style={{display:'flex',flexDirection:'column',gap:16}}>
        <span style={{fontSize:13,fontWeight:600,letterSpacing:'.16em',color:t==='Events'?'var(--fg-2)':t==='Products'?'var(--accent-2)':'var(--accent-text)'}}>{n} — {t.toUpperCase()}</span>
        <ul style={{margin:0,padding:0,listStyle:'none',display:'flex',flexDirection:'column',gap:6,fontSize:20,fontWeight:500,letterSpacing:'-.01em'}}>{s.map(x=><li key={x}>{x}</li>)}</ul>
        <a onClick={()=>go('index')} style={{cursor:'pointer',fontSize:15}}>View {t.toLowerCase()} work →</a></div>)}
    </section>
    <section style={{display:'flex',flexWrap:'wrap',gap:'8px 40px',fontSize:'clamp(28px,3vw,44px)',fontWeight:600,letterSpacing:'-.02em',paddingBottom:'var(--space-6)'}}>
      <span style={{color:'#24d6f4'}}>Playful</span><span style={{color:'#fe71ff'}}>Afrocentric</span><span style={{color:'#5165f8'}}>Innovation</span><span style={{color:'var(--fg-3)'}}>· UK · Nigeria · Working globally</span>
    </section>
  </main>;
}
window.StudioScreen=StudioScreen;