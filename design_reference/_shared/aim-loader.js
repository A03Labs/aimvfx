// Resolves the AIM VFX component namespace: compiled bundle if present, else compiles components/*.jsx in-browser.
window.loadAIM = async function(root){
  let found=null;for(const k of Object.keys(window)){try{const v=window[k];if(v&&typeof v==='object'&&v.Button&&v.Card&&v.Tabs){found=v;break;}}catch(e){}}
  if(found) return found;
  const files=['actions/Button','actions/IconButton','forms/Input','forms/Textarea','forms/Select','forms/Checkbox','content/Tag','content/SectionHeader','content/Card','navigation/Tabs','feedback/Dialog','feedback/Toast','feedback/Tooltip'];
  const NS={};
  await Promise.all(files.map(async f=>{
    const src=await (await fetch(root+'components/'+f+'.jsx')).text();
    const name=f.split('/')[1];
    const code=Babel.transform(src.replace(/^import .*$/mg,'').replace(/export function/g,'function'),{presets:['react']}).code;
    NS[name]=new Function('React',code+';return '+name)(React);
  }));
  window.AIMVFX_local=NS; return NS;
};
// Lucide icon via CSS mask (inherits currentColor)
window.AimIcon=function({name,size=20,style}){return React.createElement('span',{'aria-hidden':true,style:{display:'inline-block',width:size,height:size,flex:'none',background:'currentColor',WebkitMask:'url(https://unpkg.com/lucide-static@0.460.0/icons/'+name+'.svg) center/contain no-repeat',mask:'url(https://unpkg.com/lucide-static@0.460.0/icons/'+name+'.svg) center/contain no-repeat',...style}})};
