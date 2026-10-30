function FlipBook({pages,label}){
  const N=16, paper='#f4f1ea', n=pages.length;
  const ref=React.useRef(null); const [W,setW]=React.useState(1000); const H=W*9/16;
  React.useEffect(()=>{const ro=new ResizeObserver(([e])=>setW(e.contentRect.width));ro.observe(ref.current);return()=>ro.disconnect()},[]);
  const [k,setK]=React.useState(0); const [t,setT]=React.useState(null);
  const raf=React.useRef(0), drag=React.useRef(null), tRef=React.useRef(null); tRef.current=t;
  React.useEffect(()=>{[k+1,k+2,k-1].forEach(i=>{if(pages[i]?.src){const im=new Image();im.src=pages[i].src}})},[k]);
  React.useEffect(()=>()=>cancelAnimationFrame(raf.current),[]);
  const canNext=k<n-1, canPrev=k>0;
  const run=(dir,from,to,v0,done)=>{cancelAnimationFrame(raf.current);let p=from,v=v0,last=performance.now();
    const K=46,C=2*Math.sqrt(K)*.82;
    const step=now=>{const dt=Math.min(.034,(now-last)/1000);last=now;v+=((to-p)*K-C*v)*dt;p+=v*dt;
      if(Math.abs(to-p)<.002&&Math.abs(v)<.03){setT(null);done&&setK(x=>x+(dir==='next'?1:-1));return}
      setT({dir,p});raf.current=requestAnimationFrame(step)};
    raf.current=requestAnimationFrame(step)};
  const next=()=>{if(!tRef.current&&canNext)run('next',0,1,2.4,true)};
  const prev=()=>{if(!tRef.current&&canPrev)run('prev',1,0,-2.4,true)};
  React.useEffect(()=>{const h=e=>{if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName))return;if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev()};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)});
  const down=e=>{const cur=tRef.current;if(cur)cancelAnimationFrame(raf.current);
    drag.current={x0:e.clientX,y0:e.clientY,active:!!cur,dir:cur?.dir,p0:cur?.p,lx:e.clientX,lt:performance.now(),vx:0,id:e.pointerId};
    if(cur)e.currentTarget.setPointerCapture(e.pointerId)};
  const move=e=>{const d=drag.current;if(!d)return;const dx=e.clientX-d.x0,dy=e.clientY-d.y0;
    if(!d.active){if(Math.abs(dx)<6||Math.abs(dx)<Math.abs(dy))return;const dir=dx<0?'next':'prev';
      if(dir==='next'?!canNext:!canPrev){drag.current=null;return}
      Object.assign(d,{active:true,dir,p0:dir==='next'?0:1,x0:e.clientX});e.currentTarget.setPointerCapture(e.pointerId)}
    const now=performance.now();d.vx=.7*d.vx+.3*((e.clientX-d.lx)/Math.max(1,now-d.lt));d.lx=e.clientX;d.lt=now;
    const p=Math.max(-.04,Math.min(1.04,d.p0-(e.clientX-d.x0)/(W*.85)));setT({dir:d.dir,p})};
  const up=e=>{const d=drag.current;drag.current=null;if(!d)return;
    if(!d.active){const r=e.currentTarget.getBoundingClientRect(),fx=(e.clientX-r.left)/r.width;if(fx>.55)next();else if(fx<.45)prev();return}
    const p=tRef.current?.p??d.p0, v=-d.vx*1000/W;
    const done=d.dir==='next'?(d.vx<-.3||(p>.4&&d.vx<.3)):(d.vx>.3||(p<.6&&d.vx>-.3));
    const to=d.dir==='next'?(done?1:0):(done?0:1);run(d.dir,p,to,v,done)};
  const pageView=(i,dim)=>{const pg=pages[i];if(!pg)return null;
    return <div style={{position:'absolute',inset:0,background:paper,overflow:'hidden'}}>
      {pg.src?<img src={pg.src} alt="" draggable="false" style={{width:'100%',height:'100%',objectFit:'cover',display:'block',userSelect:'none'}}/>:<image-slot id={pg.slot} shape="rect" placeholder={'Page '+(i+1)}></image-slot>}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'linear-gradient(to right,rgba(0,0,0,.34),rgba(0,0,0,.12) 1.2%,rgba(0,0,0,.04) 4%,transparent 9%,transparent 94%,rgba(0,0,0,.05) 100%),linear-gradient(to bottom,rgba(255,255,255,.05),transparent 30%,transparent 80%,rgba(0,0,0,.04))'}}></div>
      {dim}</div>};
  let leaf=null,under=k,underFx=null;
  if(t){const {dir,p}=t; under=dir==='next'?k+1:k; const li=dir==='next'?k:k-1, pg=pages[li];
    const cp=Math.max(0,Math.min(1,p)), th=p*180, c=.62*Math.sin(cp*Math.PI);
    const ws=Array.from({length:N-1},(_,i)=>Math.pow(i+1,1.7)), sum=ws.reduce((a,b)=>a+b,0);
    const ang=[th*(1-c),...ws.map(w=>th*c*w/sum)]; const sw=W/N;
    const bg=pg?.src?`url("${pg.src}")`:'none';
    const strip=(i,cum)=>{if(i>=N)return null;const a=cum+ang[i],r=a*Math.PI/180;
      const fShade=Math.max(0,(1-Math.cos(r)))*.32, bShade=Math.max(0,(1+Math.cos(r)))*.22, gloss=Math.max(0,Math.sin(2*r))*.10;
      const face={position:'absolute',inset:0,backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden',backgroundColor:paper,backgroundImage:bg,backgroundSize:`${W}px ${H}px`,backgroundPosition:`${-i*sw}px 0`};
      return <div key={i} style={{position:'absolute',top:0,left:i?sw:0,width:sw+1,height:'100%',transformOrigin:'left center',transform:`rotateY(${-ang[i]}deg)`,transformStyle:'preserve-3d'}}>
        <div style={face}><div style={{position:'absolute',inset:0,background:`rgba(0,0,0,${fShade})`}}></div><div style={{position:'absolute',inset:0,background:`rgba(255,255,255,${gloss})`}}></div></div>
        <div style={{...face,transform:'rotateY(180deg)'}}><div style={{position:'absolute',inset:0,background:paper,opacity:.86}}></div><div style={{position:'absolute',inset:0,background:`rgba(0,0,0,${bShade})`}}></div></div>
        {strip(i+1,a)}</div>};
    const op=p>.72?Math.max(0,1-(p-.72)/.28):1;
    leaf=<div style={{position:'absolute',inset:0,transformStyle:'preserve-3d',opacity:op,pointerEvents:'none',zIndex:3}}>{strip(0,0)}</div>;
    const s=Math.sin(cp*Math.PI), edge=Math.max(0,W*Math.cos(cp*Math.PI*.98)*(1-c*.25));
    underFx=<div style={{position:'absolute',inset:0,pointerEvents:'none',background:`linear-gradient(to right,rgba(0,0,0,${.35*(1-cp)}) 0px,rgba(0,0,0,${.18+.32*s}) ${edge}px,rgba(0,0,0,0) ${edge+30+W*.18*s}px)`}}></div>}
  const btn=(ok,fn,txt)=><button onClick={fn} disabled={!ok} style={{font:'inherit',whiteSpace:'nowrap',flex:'none',fontSize:15,fontWeight:600,padding:'10px 18px',borderRadius:99,border:'1px solid var(--border-1)',background:'transparent',color:ok?'var(--fg-1)':'var(--fg-3)',cursor:ok?'pointer':'default',opacity:ok?1:.5}}>{txt}</button>;
  return <section style={{display:'flex',flexDirection:'column',gap:20}}>
    <div style={{position:'relative',padding:'0 clamp(6px,1vw,14px) clamp(22px,3vw,44px) 0'}}>
      <div style={{position:'absolute',left:'3%',right:'1%',bottom:'clamp(8px,1.4vw,20px)',height:'clamp(18px,3vw,40px)',background:'radial-gradient(ellipse at 50% 0%,rgba(12,16,35,.42),rgba(12,16,35,0) 70%)',filter:'blur(6px)',pointerEvents:'none'}}></div>
      <div style={{position:'relative',background:'linear-gradient(to right,#06080f 0%,#1a1e30 1.2%,#0c1023 2.4%,#121629 60%,#0e1225 100%)',borderRadius:'3px 7px 7px 3px',padding:'clamp(5px,.8vw,11px) clamp(7px,1.1vw,15px) clamp(7px,1.1vw,15px) clamp(10px,1.5vw,20px)',boxShadow:'inset 0 1px 0 rgba(255,255,255,.07),inset 0 -1px 0 rgba(0,0,0,.4),0 1px 2px rgba(12,16,35,.25),0 18px 40px -18px rgba(12,16,35,.55)'}}>
        <div style={{position:'absolute',top:0,bottom:0,left:'clamp(5px,.8vw,10px)',width:2,background:'linear-gradient(to right,rgba(0,0,0,.45),rgba(255,255,255,.08))',pointerEvents:'none'}}></div>
        <div style={{position:'relative',paddingRight:'clamp(4px,.55vw,7px)',paddingBottom:'clamp(3px,.45vw,6px)'}}>
          <div style={{position:'absolute',top:2,bottom:0,right:0,width:'clamp(4px,.55vw,7px)',borderRadius:'0 2px 2px 0',background:'repeating-linear-gradient(to right,#f6f3ec 0 1px,#dcd6c8 1px 2px)',boxShadow:'inset -1px 0 0 rgba(0,0,0,.12)'}}></div>
          <div style={{position:'absolute',left:2,right:0,bottom:0,height:'clamp(3px,.45vw,6px)',borderRadius:'0 0 2px 2px',background:'repeating-linear-gradient(to bottom,#f6f3ec 0 1px,#dcd6c8 1px 2px)',boxShadow:'inset 0 -1px 0 rgba(0,0,0,.12)'}}></div>
          <div ref={ref} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
            style={{position:'relative',aspectRatio:'16/9',perspective:W*2.4+'px',perspectiveOrigin:'30% 50%',touchAction:'pan-y',userSelect:'none',cursor:t?'grabbing':'grab',boxShadow:'0 0 0 .5px rgba(0,0,0,.15),1px 1px 2px rgba(0,0,0,.18)'}}>
            {pageView(under,underFx)}{leaf}
          </div>
        </div>
      </div>
    </div>
    <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
      {btn(canPrev,prev,'← Prev')}{btn(canNext,next,'Next →')}
      <span style={{fontSize:13,color:'var(--fg-3)'}}>Drag, swipe or use ← → to turn</span>
      <span style={{marginLeft:'auto',fontSize:13,fontWeight:600,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--fg-3)',whiteSpace:'nowrap'}}>{label?label+' · ':''}Page {k+1} / {n}</span>
    </div>
  </section>;
}
window.FlipBook=FlipBook;
