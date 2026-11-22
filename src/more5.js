// ---------- origins + lifetimes ----------
const ORIG=[
 ["de19","Germany, came in the 1800s","Bexten, Graf, Reger, Schmidt, Langenderfer","var(--mint)",["anthony","herman","joseph","georgeg","brigitta","johnreger","wendell","barbara","wendelL","maryL"]],
 ["oh","Ohio families, roots not found yet","Fred Miller and Margaret Ackerman, Mamie's parents","#2a7a60",["fredm","margaretm"]],
 ["en","England and Holland, came 1629–1630","Blossom and Fitz Randolph, the Pilgrim line","var(--peri)",["thomasb","annee","edwardsr","franceshowes"]],
 ["de18","Germany, came in the 1700s","Waggoner of Hesse","#c77fa3",["wilhelm","agnesa"]],
 ["fr","France, came 1733","Bonnet, Huguenots","#a8668a",["jacques","marie"]],
 ["col","Colonial America, roots not yet traced","Virginia, West Virginia and New Jersey families","#6b3a50",[]]
];
function originShares(){const cat={};ORIG.forEach(o=>o[4].forEach(id=>cat[id]=o[0]));const tot={};ORIG.forEach(o=>tot[o[0]]=0);
 (function w(id,f){const d=D[id];[d[3],d[4]].forEach(p=>{if(p&&D[p]&&!(D[p][5]==="u"&&!cat[p]))w(p,f/2);else tot[id==="kids"?"col":(cat[id]||"col")]+=f/2})})("kids",1);return tot}
const ARRIVE=[["1629","thomasb","Thomas Blossom, a Pilgrim, reaches Plymouth from Leiden"],["1630","edward","Edward Fitz Randolph comes from Nottinghamshire"],["1733","jacques","Jacques Bonnet, a Huguenot, lands at Philadelphia on the ship Elizabeth"],["1748","wilhelm","Wilhelm Waggoner lands at Philadelphia from Hesse"],["by 1864","joseph","Joseph Graf and Brigitta Reger, from Baden and Württemberg, settle in Michigan"],["by 1865","wendell","Wendelin Schmidt and Barbara Ankenbrandt settle at Monroe, Michigan"],["1880","anthony","Anthony Bexten comes alone at 12 from Westphalia"]];
function drawOrigins(){const t=originShares();const pct=v=>{const p=v*100;return(p<10?p.toFixed(1):p.toFixed(1)).replace(/\.0$/,"")+"%"};
 const rows=ORIG.filter(o=>t[o[0]]>0);
 document.getElementById("origins").innerHTML=`<div class="obar">${rows.map(o=>`<span style="width:${(t[o[0]]*100).toFixed(2)}%;background:${o[3]}" title="${esc(o[1])}"></span>`).join("")}</div>
 <div class="olist">${rows.map(o=>`<div class="orow"><span class="osw" style="background:${o[3]}"></span><span><b>${esc(o[1])}</b><i>${esc(o[2])}</i></span><span class="opc">${pct(t[o[0]])}</span></div>`).join("")}</div>
 <h3 class="oh3">When each line arrived</h3><ol class="arrive">${ARRIVE.map(([y,id,txt])=>`<li><button type="button" data-id="${id}"><span class="ay" style="color:${SIDE[id]==="F"?"var(--mint)":"var(--peri)"}">${esc(y)}</span><span>${esc(txt)}</span></button></li>`).join("")}</ol>`}
const LIFE_EV=[[1620,"Mayflower"],[1776,"Revolution"],[1861,"Civil War"],[1917,"WWI"],[1941,"WWII"]];
function lifeYears(s){const m=String(s||"").match(/(\d{4})\D+?(?:after\s*)?(\d{4})/);return m?[+m[1],+m[2]]:null}
let LIFE_F="all";
function drawLife(){const ppl=Object.keys(D).filter(k=>k!=="kids"&&lifeYears(D[k][1])&&(LIFE_F==="all"||SIDE[k]===LIFE_F)).map(k=>[k,...lifeYears(D[k][1])]).sort((a,b)=>a[1]-b[1]||a[2]-b[2]);
 const X0=16,X1=368,Y0=1570,Y1=2020,x=y=>X0+(y-Y0)*(X1-X0)/(Y1-Y0),top=48,rh=27,H=top+ppl.length*rh+30;
 let s=`<rect width="380" height="${H}" fill="transparent"/>`;
 LIFE_EV.forEach(([y,l],i)=>{const xx=x(y).toFixed(1);s+=`<line x1="${xx}" y1="36" x2="${xx}" y2="${H-26}" stroke="var(--amber)" stroke-width="1" stroke-dasharray="3 3" opacity=".55"/><text x="${xx}" y="${i===3?30:16}" text-anchor="middle" font-size="11" fill="var(--amber)">${l}</text>`});
 ppl.forEach(([k,a,b],i)=>{const y=top+i*rh,xa=x(a),xb=x(b),lab=`${CHN(k)} ${a}–${b}`,w=lab.length*6.1,lx=Math.max(2,Math.min(xa,376-w)),c=SIDE[k]==="F"?"var(--mint)":"var(--peri)",u=D[k][5]==="u";
  s+=`<g class="lbar" data-id="${k}" role="button" tabindex="0" aria-label="${esc(D[k][0])}, ${a} to ${b}"><rect x="0" y="${y-4}" width="380" height="${rh}" fill="transparent"/><text x="${lx.toFixed(1)}" y="${y+8}" font-size="11" fill="var(--ink)">${esc(lab)}</text><rect x="${xa.toFixed(1)}" y="${y+12}" width="${Math.max(3,xb-xa).toFixed(1)}" height="8" rx="4" fill="${c}"${u?' fill-opacity=".35" stroke="var(--amber)" stroke-width="1"':""}/></g>`});
 [1600,1700,1800,1900,2000].forEach(y=>s+=`<text x="${x(y).toFixed(1)}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--mute)">${y}</text>`);
 const svg=document.getElementById("life");svg.setAttribute("viewBox",`0 0 380 ${H}`);svg.innerHTML=s;
 document.querySelectorAll("#life-f .chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.f===LIFE_F))}
drawOrigins();drawLife();
document.getElementById("life-f").addEventListener("click",e=>{const b=e.target.closest("[data-f]");if(b){LIFE_F=b.dataset.f;drawLife()}});
["life","origins"].forEach(i=>{const el=document.getElementById(i);el.addEventListener("click",e=>{const g=e.target.closest("[data-id]");if(g){showPerson(g.dataset.id);location.hash="#tree"}});el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){const g=e.target.closest("[data-id]");if(g){e.preventDefault();showPerson(g.dataset.id);location.hash="#tree"}}})});
function setChartSub(){if(!location.hash.startsWith("#charts"))return;const k=(location.hash.split("/")[1]||"fan");const c=[...document.querySelectorAll("#view-charts .csec")].some(s=>s.dataset.c===k)?k:"fan";
 document.querySelectorAll("#view-charts .csec").forEach(s=>s.hidden=s.dataset.c!==c);
 document.querySelectorAll("#view-charts .cnav .chip").forEach(a=>a.setAttribute("aria-selected",a.dataset.c===c));
 const on=document.querySelector(`#view-charts .cnav [data-c="${c}"]`);if(on&&on.scrollIntoView)on.scrollIntoView({block:"nearest",inline:"center"});
 if(c==="fan"&&typeof centerFan==="function")setTimeout(centerFan,30)}
window.addEventListener("hashchange",setChartSub);setChartSub();
