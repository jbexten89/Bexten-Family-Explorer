// ---------- charts ----------
const CHN=id=>({betty:"Betty A. Bonnell"})[id]||D[id][0];
const short=(n,max)=>{n=n.replace(/\s*[“"][^”"]*[”"]\s*/g," ").replace(/^Rev\. /,"").trim();if(n.length<=max)return n;const w=n.split(" ");let s=w[0]+" "+w[w.length-1];if(s.length>max)s=s.slice(0,max-1)+"…";return s};
const fill=id=>SIDE[id]==="F"?"var(--mint)":"var(--peri)";
function drawFan(){
 const cx=560,cy=560,R=[0,110,190,270,360,455,560];
 let rows=[[null,null]];rows[0]=["tony","betty"];
 for(let g=1;g<5;g++){rows[g]=[];rows[g-1].forEach(p=>{rows[g].push(p&&D[p]?D[p][3]||null:null,p&&D[p]?D[p][4]||null:null)})}
 const P=(r,a)=>[(cx+r*Math.cos(a)).toFixed(1),(cy-r*Math.sin(a)).toFixed(1)];
 let s="";
 rows.forEach((row,g)=>{const r0=R[g+1],r1=R[g+2],n=row.length;row.forEach((id,i)=>{
  const a0=Math.PI-i*Math.PI/n,a1=Math.PI-(i+1)*Math.PI/n,am=(a0+a1)/2;
  const [x0,y0]=P(r1,a0),[x1,y1]=P(r1,a1),[x2,y2]=P(r0,a1),[x3,y3]=P(r0,a0);
  const d=`M${x0},${y0} A${r1},${r1} 0 0 1 ${x1},${y1} L${x2},${y2} A${r0},${r0} 0 0 0 ${x3},${y3} Z`;
  if(!id||!D[id]){s+=`<path d="${d}" fill="none" stroke="var(--line)" stroke-dasharray="4 4"/>`;return}
  const u=D[id][5]==="u";
  const rm=(r0+r1)/2,[tx,ty]=P(rm,am);
  let t;
  if(g<2){const nm=short(CHN(id),g===0?24:20),deg=90-am*180/Math.PI;t=`<g transform="translate(${tx},${ty}) rotate(${deg.toFixed(1)})"><text text-anchor="middle" font-size="${g===0?16:14}" fill="var(--ink)" font-weight="700"><tspan x="0" dy="-0.15em">${esc(nm)}</tspan><tspan x="0" dy="1.3em" font-weight="400" fill="var(--mute)" font-size="12.5">${esc(D[id][1]||"")}</tspan></text></g>`}
  else{let deg=-am*180/Math.PI;if(am>Math.PI/2)deg+=180;const fs=g===2?13:g===3?11.5:10.5,mx=g===2?17:g===3?16:17;
   t=`<g transform="translate(${tx},${ty}) rotate(${deg.toFixed(1)})"><text text-anchor="middle" font-size="${fs}" fill="var(--ink)" font-weight="700"><tspan x="0" dy="-0.15em">${esc(short(CHN(id),mx))}</tspan><tspan x="0" dy="1.2em" font-weight="400" fill="var(--mute)" font-size="${fs-1}">${esc(D[id][1]||"")}</tspan></text></g>`}
  s+=`<g class="seg" data-id="${id}" role="button" tabindex="0" aria-label="${esc(D[id][0])}"><title>${esc(D[id][0])} ${esc(D[id][1])}${u?" (not yet proven)":""}</title><path d="${d}" fill="${fill(id)}" fill-opacity="${u?0.08:0.2}" stroke="${u?"var(--amber)":"var(--bg)"}" stroke-width="${u?1.5:2}"/>${t}</g>`;
 })});
 const [a,b]=P(R[1],Math.PI),[c,e]=P(R[1],0);
 s+=`<path d="M${a},${b} A${R[1]},${R[1]} 0 0 1 ${c},${e} Z" fill="var(--panel2)" stroke="var(--line)"/><text x="${cx}" y="${cy-62}" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">Tony and Althea's children</text><text x="${cx}" y="${cy-30}" text-anchor="middle" font-size="13.5" fill="var(--mute)">Six children, living</text>`;
 s+=`<text x="40" y="${cy+30}" font-size="14" fill="var(--mint)" font-weight="700">Dad's side</text><text x="${2*cx-40}" y="${cy+30}" text-anchor="end" font-size="14" fill="var(--peri)" font-weight="700">Mom's side</text>`;
 const svg=document.getElementById("fan");svg.setAttribute("viewBox",`0 0 ${2*cx} ${cy+44}`);svg.innerHTML=s;
}
const CHAINS=[["thomasb","The Pilgrim line"],["edwardsr","Fitz Randolph of Nottinghamshire"],["jacques","The Huguenot Bonnets"],["wilhelm","The Waggoners of Hesse"],["charlesf","Forinash of the Buckhannon"],["philipsr","The Beamers"],["herman","The Bexten line"],["georgeg","The Grafs of Baden"],["johnreger","Reger of Württemberg"],["wendell","The Smiths (Schmidt) of Monroe"]];
function pathTo(target){const q=[["kids"]],seen=new Set();while(q.length){const p=q.shift(),h=p[p.length-1];if(h===target)return p;if(seen.has(h))continue;seen.add(h);const d=D[h];if(!d)continue;[d[3],d[4]].forEach(x=>{if(x&&D[x])q.push(p.concat(x))})}return null}
function drawChains(){
 document.getElementById("chains").innerHTML=CHAINS.map(([t,title])=>{const p=pathTo(t);if(!p)return"";const list=p.slice(1).reverse();return `<div class="card"><h3><span class="dot" style="background:${col(t)}"></span>${esc(title)}</h3><ol>${list.map(k=>`<li${D[k][5]==="u"?' class="unp"':""}>${esc(CHN(k))}<span class="yr">${esc(D[k][1])}</span></li>`).join("")}<li class="end">Tony and Althea's children</li></ol></div>`}).join("");
}
document.getElementById("fan").addEventListener("click",e=>{const g=e.target.closest("[data-id]");if(g){showPerson(g.dataset.id);location.hash="#tree"}});
document.getElementById("fan").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){const g=e.target.closest("[data-id]");if(g){e.preventDefault();showPerson(g.dataset.id);location.hash="#tree"}}});
drawFan();drawChains();
const ZS=[1,1.6,2.4,3.4];let zi=0;const fw=document.getElementById("fanwrap");
function setZoom(i){const old=ZS[zi];const cx=(fw.scrollLeft+fw.clientWidth/2)/fw.scrollWidth,cy=(fw.scrollTop+fw.clientHeight/2)/fw.scrollHeight;zi=Math.max(0,Math.min(ZS.length-1,i));document.getElementById("fan").style.setProperty("--z",ZS[zi]);
 requestAnimationFrame(()=>{if(old===1){fw.scrollLeft=(fw.scrollWidth-fw.clientWidth)/2;fw.scrollTop=fw.scrollHeight}else{fw.scrollLeft=cx*fw.scrollWidth-fw.clientWidth/2;fw.scrollTop=cy*fw.scrollHeight-fw.clientHeight/2}});
 document.querySelector('.zoom [data-z="-1"]').disabled=zi===0;document.querySelector('.zoom [data-z="1"]').disabled=zi===ZS.length-1}
document.querySelector(".zoom").addEventListener("click",e=>{const b=e.target.closest("[data-z]");if(!b)return;const d=+b.dataset.z;setZoom(d===0?0:zi+d)});
zi=(window.matchMedia&&matchMedia("(max-width:760px)").matches)?1:0;document.getElementById("fan").style.setProperty("--z",ZS[zi]);
function centerFan(){if(document.getElementById("view-charts").hidden)return;requestAnimationFrame(()=>{fw.scrollLeft=(fw.scrollWidth-fw.clientWidth)/2;fw.scrollTop=fw.scrollHeight})}
window.addEventListener("hashchange",()=>setTimeout(centerFan,30));setTimeout(centerFan,60);
document.querySelector('.zoom [data-z="-1"]').disabled=zi===0;
document.querySelectorAll("[data-print]").forEach(b=>b.addEventListener("click",()=>window.print()));

// ---------- story / report tables of contents ----------
function toc(view){const box=document.getElementById(view+"-toc"),hs=[...document.querySelectorAll(`#${view}-body h2`)];box.innerHTML=`<option value="">${view==="story"?"Jump to a chapter":"Jump to a section"}</option>`+hs.map(h=>`<option value="${view}/${h.id}">${esc(h.textContent)}</option>`).join("");box.addEventListener("change",()=>{if(box.value){location.hash="#"+box.value;box.value=""}})}
toc("story");toc("report");
function markStuck(){document.querySelectorAll(".toc").forEach(t=>{if(t.offsetParent===null)return;const top=parseFloat(getComputedStyle(t).top)||0;t.classList.toggle("stuck",t.getBoundingClientRect().top<=top+1&&document.getElementById("app").scrollTop>0)})}
document.getElementById("app").addEventListener("scroll",markStuck,{passive:true});window.addEventListener("hashchange",()=>setTimeout(markStuck,50));

// ---------- to-do ----------
const TODO=[
 ["Send the record requests","The drafts are in the chat with Claude. Add your phone number (and email where asked) before sending.",[
  ["clerk","<b>Call the Monroe County Clerk</b> at (734) 240-7020 and order a genealogy copy of Anthony Bexten and Rosa Graf's April 11, 1899 marriage record. Most likely to name Anthony's German hometown."],
  ["natz","<b>Order Anthony Bexten's naturalization search</b> from the Archives of Michigan ($20, non-refundable) at <a href=\"https://shop.michiganology.org/products/naturalization-research\" target=\"_blank\" rel=\"noopener\">shop.michiganology.org</a>. Paste the request text into the order notes."],
  ["nysa","<b>Email the New York State Archives</b> at <a href=\"mailto:archref@nysed.gov\">archref@nysed.gov</a> for John Bonnell's Revolutionary War claim (Series A0200, Box RM-1-15-A, Roll 1, page 60)."],
  ["probate","<b>Ask the Monroe County Probate Court</b> (Monroe, Michigan) for a 1905–06 estate file for Joseph Graf (also Graff or Groff) of Whiteford Township. It names the heirs and may give his hometown in Baden."],
  ["wvu","<b>Submit the WVU History Center form</b> at <a href=\"https://westvirginia.libanswers.com/wvrhc\" target=\"_blank\" rel=\"noopener\">westvirginia.libanswers.com/wvrhc</a> asking about the \"Beamer Family\" file (A&amp;M 2537, Box 44)."]]],
 ["Next time at your computer, with Claude","Optional extras. Sign in yourself in Claude's browser panel; Claude can't type your passwords for you.",[
  ["stromberg","<b>Look at Anthony's possible baptism</b>: Caspar Anton Bexte, born July 16, 1868, Stromberg (St. Lambertus). The church books are on FamilySearch films 8206436 and 7992106 but only open at a FamilySearch Center or affiliate library (the Toledo and Bryan-area centers count). Check the baptism entry for any later note (confirmation, marriage, emigration or death)."],
  ["mamie2","<b>Herbert Smith and Mamie Miller's marriage</b> (Toledo, about 1907): ask the Lucas County Probate Court for the record, which may name Mamie's parents."],
  ["schmidt2","<b>Wendell Smith and Barbara Ankenbrandt</b>: their own death and burial records in Monroe County, Michigan, for exact dates and where in Germany they came from"],
  ["stwendel","<b>Wendel and Mary Langenderfer</b>: check whether they really came from St. Wendel, Prussia, as an online tree says"]]],
 ["Family and extras","",[
  ["share","<b>Share the story</b> (<a href=\"#story\">The Bexten Family Story</a>) with siblings and cousins"],
  ["ask","<b>Ask older relatives</b> for a family Bible, letters from Germany, old photos, and any details of the stowaway story (the ship, the port, who found him)"],
  ["dna","<b>Take a DNA test</b> (AncestryDNA or MyHeritage) to look for relatives descended from Anthony's three sisters in Germany"],
  ["print","<b>Print the charts</b>: open <a href=\"#charts\">Charts</a> and use Print"],
  ["sar","<b>Optional: join the Sons of the American Revolution</b> through Samuel Fitz Randolph (SAR #P-158994) or John Waggoner (#P-338764). Ask Claude for an application starter first."]]]];
const TKEY="bexten-todo-v1";let done={};try{done=JSON.parse(localStorage.getItem(TKEY))||{}}catch(e){done={}}
function drawTodo(){
 const all=TODO.flatMap(s=>s[2]),n=all.filter(t=>done[t[0]]).length;
 document.getElementById("todo-prog").innerHTML=`<b>${n}</b> of ${all.length} done`;
 document.getElementById("todo-list").innerHTML=TODO.map(([h,hint,items])=>`<h2>${esc(h)}</h2>${hint?`<p class="hint">${esc(hint)}</p>`:""}${items.map(([k,html])=>`<label class="task ${done[k]?"done":""}"><input type="checkbox" data-k="${k}" ${done[k]?"checked":""}><span>${html}</span></label>`).join("")}`).join("");
}
document.getElementById("todo-list").addEventListener("change",e=>{const k=e.target.dataset.k;if(!k)return;if(e.target.checked)done[k]=Date.now();else delete done[k];try{localStorage.setItem(TKEY,JSON.stringify(done))}catch(err){}drawTodo()});
drawTodo();
