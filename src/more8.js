// ---------- breadcrumbs ----------
const CR={origin:null,trail:[],restoring:false};
const crView=h=>{const v=(h||location.hash).slice(1).split("/")[0];return VIEWS.includes(v)?v:"tree"};
const CR_CH={fan:"Fan chart",bowtie:"Bowtie",lines:"Lines of descent",where:"Where we come from",lifetimes:"Lifetimes",families:"Family sizes",complete:"How complete",numbers:"By the numbers",cousins:"Cousins"};
function crLabel(){const h=location.hash.slice(1).split("/"),v=crView();const vis=document.getElementById("view-"+v);
 const openB=vis?[...vis.querySelectorAll("details[open] > summary b")].map(b=>b.textContent.trim()).filter(Boolean)[0]:"";
 if(v==="charts"){const k=h[1]&&CR_CH[h[1]]?h[1]:"fan";let l=CR_CH[k];if(k==="fan"&&FANF!=="kids")l+=" (centered on "+CHN(FANF)+")";return l}
 if(v==="index")return(h[1]==="places"?"Index: Places":"Index: Surnames")+(openB?" · "+openB:"");
 if(v==="map")return h[1]&&h[1]!=="journeys"?"Graves":"Map";
 if(v==="story")return h[1]==="timeline"?"Timeline":"Story";
 return{report:"Report",todo:"To-do"}[v]||"Back"}
function crCapture(){const v=crView(),vis=document.getElementById("view-"+v),app=document.getElementById("app");
 return{hash:location.hash||"#tree",label:crLabel(),scroll:app.scrollTop,open:vis?[...vis.querySelectorAll("details")].map((d,i)=>d.open?i:-1).filter(i=>i>=0):[],
  fan:FANF,fanHist:FANHIST.slice(),life:typeof LIFE_F!=="undefined"?LIFE_F:"all",bow:(document.getElementById("bowbox")||{}).scrollLeft||0}}
function crApply(o){const v=crView(o.hash),vis=document.getElementById("view-"+v);
 if(v==="charts"){if(FANF!==o.fan){FANF=o.fan;FANHIST=o.fanHist.slice();drawFan()}if(typeof LIFE_F!=="undefined"&&LIFE_F!==o.life){LIFE_F=o.life;drawLife()}const bb=document.getElementById("bowbox");if(bb)bb.scrollLeft=o.bow}
 if(vis){const ds=vis.querySelectorAll("details");o.open.forEach(i=>{if(ds[i])ds[i].open=true})}
 const app=document.getElementById("app");app.scrollTop=o.scroll;setTimeout(()=>{app.scrollTop=o.scroll},60)}
function crBack(){const o=CR.origin;if(!o)return;CR.restoring=true;CR.origin=null;CR.trail=[];
 if(location.hash===o.hash){crApply(o);CR.restoring=false}else{location.hash=o.hash;setTimeout(()=>{crApply(o);CR.restoring=false},40)}}
const _showPerson0=showPerson;
showPerson=function(id){
 if(crView()!=="tree"&&id!=="kids"&&D[id]){CR.origin=crCapture();CR.trail=[id]}
 else if(id==="kids"||!D[id]){CR.origin=null;CR.trail=[]}
 else{const i=CR.trail.indexOf(id);if(i>=0)CR.trail=CR.trail.slice(0,i+1);else{CR.trail.push(id);if(CR.trail.length>8)CR.trail=CR.trail.slice(-8)}}
 _showPerson0(id);crRender()};
function crRender(){const box=document.getElementById("focus");if(!box)return;const old=box.querySelector(".crumbs");if(old)old.remove();
 const t=CR.trail;if(!CR.origin&&t.length<2)return;
 const parts=[];if(CR.origin)parts.push(`<button type="button" data-cr="o">${esc(CR.origin.label)}</button>`);
 t.forEach((id,i)=>{const nm=esc(short(CHN(id),26));parts.push(i===t.length-1?`<span aria-current="page">${nm}</span>`:`<button type="button" data-cr="${id}">${nm}</button>`)});
 const back=CR.origin?`<button type="button" class="crback" data-cr="o">‹ Back to ${esc(CR.origin.label)}</button>`:(t.length>1?`<button type="button" class="crback" data-cr="${t[t.length-2]}">‹ Back to ${esc(short(CHN(t[t.length-2]),26))}</button>`:"");
 box.insertAdjacentHTML("afterbegin",`<div class="crumbs" role="navigation" aria-label="Where you came from">${back}<div class="crtrail">${parts.join('<i aria-hidden="true">›</i>')}</div></div>`)}
document.getElementById("focus").addEventListener("click",e=>{const b=e.target.closest("[data-cr]");if(!b)return;e.stopPropagation();const k=b.dataset.cr;
 if(k==="o")crBack();else{showPerson(k);document.getElementById("app").scrollTo({top:0,behavior:"smooth"})}},true);
window.addEventListener("hashchange",()=>{if(CR.restoring)return;const v=crView();
 if(v!=="tree"&&CR.origin){const o=CR.origin;if(location.hash===o.hash){CR.origin=null;CR.trail=[];setTimeout(()=>crApply(o),40)}else{CR.origin=null;CR.trail=[]}}});
