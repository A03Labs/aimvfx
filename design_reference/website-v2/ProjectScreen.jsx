function ProjectScreen({slug,go}){
  const D=window.AIM2; const i=D.work.findIndex(w=>w.slug===slug); const w=D.work[i]; const next=D.work[(i+1)%D.work.length]; const c=D.cat(w.cat);
  const [h,setH]=React.useState(false);
  const meta=[['Client',w.client2||w.client],['Discipline',c.label],['Deliverable',w.project],['Year',w.year]];
  const slot=(id,ph,ratio='16/9')=><div style={{aspectRatio:ratio,width:'100%'}}><image-slot id={w.slug+'-'+id} shape="rect" placeholder={ph}></image-slot></div>;
  return <main style={{padding:'0 var(--gutter)'}}>
    <section style={{padding:'var(--space-7) 0 var(--space-6)',display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
      <a onClick={()=>go('index')} style={{cursor:'pointer',fontSize:15,color:'var(--fg-3)'}}>← All work</a>
      <h1 style={{margin:0,fontSize:'clamp(40px,6vw,96px)',lineHeight:.98,fontWeight:700,letterSpacing:'-.035em'}}>{w.client} <span style={{color:'var(--fg-3)'}}>― {w.project}</span></h1>
    </section>
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{position:'relative'}}><window.Poster item={w} hover={h} big controls={!!(w.vimeo||w.youtube)}/></div>
    <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:24,padding:'var(--space-6) 0',borderBottom:'1px solid var(--border-1)'}}>
      {meta.map(([k,v])=><div key={k} style={{display:'flex',flexDirection:'column',gap:6}}><span style={{fontSize:12,fontWeight:600,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--fg-3)'}}>{k}</span><span style={{fontSize:17,fontWeight:500}}>{v}</span></div>)}
    </section>
    <p style={{margin:'var(--space-7) 0',fontSize:'clamp(22px,2.2vw,32px)',lineHeight:1.3,fontWeight:500,letterSpacing:'-.015em',maxWidth:'34ch'}}>{w.desc||'One line on the problem and the idea. Let the frames below do the rest.'}</p>
    {w.cat==='business'?<window.FlipBook key={w.slug} label={w.project} pages={w.pages?w.pages.map(src=>({src})):w.gallery?w.gallery.flat().map(src=>({src})):Array.from({length:10},(_,n)=>({slot:w.slug+'-page-'+(n+1)}))}/>:
    w.gallery?<section style={{display:'flex',flexDirection:'column',gap:24}}>
      {w.gallery.map((row,ri)=><div key={ri} style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,360px),1fr))',gap:24,alignItems:'start'}}>
        {row.map(src=><img key={src} src={src} loading="lazy" alt="" style={{display:'block',width:'100%',height:'auto',borderRadius:'var(--radius-sm)'}}/>)}</div>)}
    </section>:
    <section style={{display:'flex',flexDirection:'column',gap:24}}>
      {slot('hero','Drop the hero frame or GIF')}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24}}>{slot('a','Styleframe','4/5')}{slot('b','Styleframe','4/5')}</div>
      {slot('c','Wide frame','21/9')}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:24}}>{slot('d','Frame','1/1')}{slot('e','Frame','1/1')}{slot('f','Frame','1/1')}</div>
    </section>}
    <section style={{padding:'var(--space-9) 0 0',display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
      <span style={{fontSize:12,fontWeight:600,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--fg-3)'}}>Next project</span>
      <div style={{maxWidth:640}}><window.Tile item={next} go={go}/></div>
    </section>
  </main>;
}
window.ProjectScreen=ProjectScreen;