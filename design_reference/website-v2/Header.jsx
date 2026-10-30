function Header({route,go,theme,setTheme}){
  const {Button}=window.AIM;
  const L=(id,l)=><a onClick={()=>go(id)} style={{cursor:'pointer',fontSize:15,fontWeight:500,color:route===id||(id==='index'&&route.startsWith('p:'))?'var(--fg-1)':'var(--fg-3)'}}>{l}</a>;
  return <header style={{position:'sticky',top:0,zIndex:30,background:'var(--bg-1)'}}>
    <div style={{padding:'0 var(--gutter)',height:72,display:'flex',alignItems:'center',justifyContent:'space-between',gap:24}}>
      <img onClick={()=>go('index')} src={theme==='dark'?'../../assets/logo/aimvfx-logo-reversed.svg':'../../assets/logo/aimvfx-logo-color.svg'} alt="AIM VFX" style={{height:26,cursor:'pointer'}}/>
      <nav style={{display:'flex',gap:28,alignItems:'center'}}>
        {L('index','Work')}{L('studio','Studio')}{L('contact','Contact')}
        <a onClick={()=>setTheme(theme==='dark'?'light':'dark')} style={{cursor:'pointer',fontSize:15,color:'var(--fg-3)'}}>{theme==='dark'?'Light':'Dark'}</a>
        <Button size="sm" onClick={()=>go('contact')}>Start a project</Button>
      </nav>
    </div>
  </header>;
}
window.Header=Header;