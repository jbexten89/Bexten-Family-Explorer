// ---------- index (surnames and places) ----------
const IX_PLACES=[
 ["Ohio",[["Toledo",/Toledo/],["Pioneer",/Pioneer/],["Sylvania",/Sylvania/],["Bryan",/Bryan, Ohio/],["Oregon",/Oregon, Ohio/],["Ottawa Hills",/Ottawa Hills/],["Sandusky",/Sandusky/],["Raab",/Raab/],["Lucas County",/Lucas County/]]],
 ["Michigan",[["Ottawa Lake",/Ottawa Lake/],["Whiteford Township",/Whiteford Township/],["Monroe",/Monroe, Michigan|city of Monroe/],["Detroit",/Detroit/]]],
 ["Indiana",[["Angola",/Angola, Indiana/]]],
 ["West Virginia",[["Weston",/Weston/],["Lewis County",/Lewis County/],["Hacker's Creek",/Hacker's Creek/],["Buckhannon",/Buckhannon/],["Braxton County",/Braxton County|Newville/],["Philippi",/Philippi/],["Clarksburg",/Clarksburg/],["Salem, Harrison County",/Salem|Harrison County/],["Doddridge County",/Doddridge County|Sedalia/],["Nicholas County",/Nicholas County/],["Roane County",/Roane County/],["Monroe County",/Monroe County(, Virginia)?$|Monroe County, Virginia|Hillsdale/],["Greenbrier County",/Greenbrier County/],["South Branch",/South Branch/]]],
 ["Virginia",[["New Market",/New Market/]]],
 ["Pennsylvania",[["Philadelphia",/Philadelphia/],["Reading",/Reading, Pennsylvania/],["White Marsh",/White Marsh/]]],
 ["New Jersey",[["Piscataway",/Piscataway/]]],
 ["New York",[["New York",/New York(?! Artillery)/]]],
 ["Massachusetts",[["Plymouth",/Plymouth/],["Scituate",/Scituate/],["Barnstable",/Barnstable/]]],
 ["Germany",[["Westphalia",/Westphalia/],["Stromberg",/Stromberg/],["Baden",/Baden/],["Württemberg",/Württemberg/],["Ober-Seemen, Hesse",/Ober-Seemen/],["St. Wendel",/St\. Wendel/]]],
 ["England",[["Sutton-in-Ashfield",/Sutton-in-Ashfield/],["Kneesall",/Kneesall/],["Cambridge",/Cambridge/]]],
 ["Netherlands",[["Leiden",/Leiden/]]]
];
const ixVerb=c=>/lead|[Pp]ossibly|not yet proven/.test(c)?"possible":/^\s*(Born|Baptized)/i.test(c)?"born":/Arrived|arrived|Came to|Reached/.test(c)?"arrived":/^\s*Married/i.test(c)?"married":/^\s*(buried|Buried)/.test(c)?"buried":/Died|died|Killed|killed/.test(c)?"died":"lived";
const ixSurname=n=>{if(/Fitz Randolph/.test(n))return"Fitz Randolph";let w=n.replace(/[“"][^”"]*[”"]/g,"").replace(/\([^)]*\)/g,"").replace(/^Rev\.\s*/,"").trim().split(/\s+/);let l=w[w.length-1];if(/^(Jr\.?|Sr\.?)$/.test(l))l=w[w.length-2];return w.length>1?l:null};
const IX=(()=>{const sur={},pl={};
 Object.keys(D).forEach(id=>{if(id==="kids")return;const [n,,facts]=D[id];
  const s=ixSurname(n);if(s)(sur[s]=sur[s]||[]).push(id);
  (facts||[]).forEach(f=>{let verb=null;f.split(/;\s*/).forEach(c=>{const v=ixVerb(c);verb=v;
   IX_PLACES.forEach(([reg,list])=>list.forEach(([p,re])=>{if(re.test(c)){const k=reg+"|"+p;const e=(pl[k]=pl[k]||{reg,p,who:{}});(e.who[id]=e.who[id]||new Set()).add(verb)}}))})})});
 return{sur,pl}})();
function ixDots(ids){const s=new Set(ids.map(i=>SIDE[i]));return(s.has("F")?'<span class="ixd f"></span>':"")+(s.has("M")?'<span class="ixd m"></span>':"")}
function ixPerson(id,extra){const d=D[id];return`<button type="button" class="ixp" data-id="${id}"><span>${esc(d[0])}</span><i>${esc(extra||d[1]||"")}</i></button>`}
function drawIndex(){
 const sk=Object.keys(IX.sur).sort((a,b)=>a.localeCompare(b,"en",{sensitivity:"base"}));
 const L=l=>l.normalize("NFD")[0].toUpperCase();const have=new Set(sk.map(L));
 const az="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(c=>have.has(c)?`<a href="#index" data-l="${c}">${c}</a>`:`<span>${c}</span>`).join("");
 let html=`<div class="ixaz">${az}</div>`,cur="";
 sk.forEach(s=>{const l=L(s);if(l!==cur){cur=l;html+=`<h3 class="ixl" id="ix-${l}">${l}</h3>`}
  const ids=IX.sur[s].slice().sort((a,b)=>(parseInt(D[a][1].replace(/\D/g," "))||9999)-(parseInt(D[b][1].replace(/\D/g," "))||9999));
  html+=`<details class="ixr"><summary>${ixDots(ids)}<b>${esc(s)}</b><span class="ixc">${ids.length} ${ids.length>1?"people":"person"}</span></summary><div class="ixps">${ids.map(i=>ixPerson(i)).join("")}</div></details>`});
 document.getElementById("ix-sur").innerHTML=html;
 let ph="";IX_PLACES.forEach(([reg,list])=>{const rows=list.map(([p])=>IX.pl[reg+"|"+p]).filter(Boolean);if(!rows.length)return;
  ph+=`<h3 class="ixl">${esc(reg)}</h3>`;
  rows.sort((a,b)=>Object.keys(b.who).length-Object.keys(a.who).length).forEach(e=>{const ids=Object.keys(e.who);
   const verbs=[...new Set(ids.flatMap(i=>[...e.who[i]]))];const ord=["born","arrived","lived","married","died","buried","possible"];verbs.sort((a,b)=>ord.indexOf(a)-ord.indexOf(b));
   const cap=verbs.join(", ");
   ph+=`<details class="ixr"><summary>${ixDots(ids)}<b>${esc(e.p)}</b><span class="ixc">${ids.length} · ${esc(cap)}</span></summary><div class="ixps">${ids.map(i=>ixPerson(i,[...e.who[i]].sort((a,b)=>["born","arrived","lived","married","died","buried","possible"].indexOf(a)-["born","arrived","lived","married","died","buried","possible"].indexOf(b)).join(", ")+(D[i][1]?" · "+D[i][1]:""))).join("")}</div></details>`})});
 document.getElementById("ix-pl").innerHTML=ph;
}
function setIxSub(){const pl=location.hash.startsWith("#index/places");
 document.getElementById("ix-sur").hidden=pl;document.getElementById("ix-pl").hidden=!pl;
 document.getElementById("seg-ixs").setAttribute("aria-selected",!pl);document.getElementById("seg-ixp").setAttribute("aria-selected",pl)}
drawIndex();setIxSub();window.addEventListener("hashchange",setIxSub);
document.getElementById("view-index").addEventListener("click",e=>{
 const a=e.target.closest("[data-l]");if(a){e.preventDefault();const t=document.getElementById("ix-"+a.dataset.l);if(t){const app=document.getElementById("app");app.scrollTo({top:t.getBoundingClientRect().top+app.scrollTop-12,behavior:"smooth"})}return}
 const b=e.target.closest("[data-id]");if(b){location.hash="#tree";setTimeout(()=>{showPerson(b.dataset.id);document.getElementById("app").scrollTo({top:0})},0)}});
document.getElementById("indexbtn").addEventListener("click",()=>{location.hash="#index"});
