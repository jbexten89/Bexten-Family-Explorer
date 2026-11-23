// ---------- bowtie, completeness, family sizes ----------
function drawBowtie(){const G=4,bw=118,bh=38,gap=10,colW=bw+18,rows=2**(G-1),rowH=bh+gap,H=rows*rowH+56,cw=126;
 const W=2*G*colW+cw+16,cx=8+G*colW,top=34;let s="";
 const slotY=(g,i)=>{const span=rows/2**(g-1);return top+(i*span+span/2)*rowH-rowH/2};
 const box=(x,y,id,side)=>{if(!id||!D[id])return`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="8" fill="none" stroke="var(--line)" stroke-dasharray="4 4"/>`;
  const u=D[id][5]==="u",c=side==="F"?"var(--mint)":"var(--peri)";
  return`<g class="bt" data-id="${id}" role="button" tabindex="0" aria-label="${esc(D[id][0])}"><rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="8" fill="var(--panel)" stroke="${u?"var(--amber)":c}" stroke-width="1.3"/><text x="${x+bw/2}" y="${y+16}" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">${esc(short(CHS(id),19))}</text><text x="${x+bw/2}" y="${y+30}" text-anchor="middle" font-size="10.5" fill="var(--mute)">${esc(D[id][1]||"")}</text></g>`};
 const ln=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1} H${(x1+x2)/2} V${y2} H${x2}" fill="none" stroke="#3d4450" stroke-width="1.2"/>`;
 [["tony","F",-1],["betty","M",1]].forEach(([root,side,dir])=>{let gen=[root];
  for(let g=1;g<=G;g++){const x=dir<0?cx-g*colW:cx+cw+(g-1)*colW+18;
   gen.forEach((id,i)=>{const y=slotY(g,i);s+=box(x,y,id,side);
    if(g===1){s+=dir<0?`<line x1="${x+bw}" y1="${y+bh/2}" x2="${cx}" y2="${y+bh/2}" stroke="#3d4450" stroke-width="1.2"/>`:`<line x1="${cx+cw}" y1="${y+bh/2}" x2="${x}" y2="${y+bh/2}" stroke="#3d4450" stroke-width="1.2"/>`}
    if(g<G&&id&&D[id]){[0,1].forEach(k=>{const ny=slotY(g+1,2*i+k)+bh/2;const nx=dir<0?x-colW+bw:x+colW;s+=dir<0?ln(x,y+bh/2,nx,ny):ln(x+bw,y+bh/2,nx,ny)})}});
   gen=gen.flatMap(id=>id&&D[id]?[D[id][3]||null,D[id][4]||null]:[null,null])}});
 const cy=slotY(1,0);s+=`<rect x="${cx}" y="${cy-14}" width="${cw}" height="${bh+28}" rx="10" fill="var(--panel2)" stroke="var(--accent)" stroke-width="1.5"/><text x="${cx+cw/2}" y="${cy+14}" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--ink)">Tony and Althea's</text><text x="${cx+cw/2}" y="${cy+30}" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--ink)">children</text>`;
 s+=`<text x="10" y="18" font-size="13" font-weight="700" fill="var(--mint)">Dad's side</text><text x="${W-10}" y="18" text-anchor="end" font-size="13" font-weight="700" fill="var(--peri)">Mom's side</text>`;
 const svg=document.getElementById("bowtie");svg.setAttribute("viewBox",`0 0 ${W} ${H}`);svg.style.width=W+"px";svg.innerHTML=s;
 const box2=document.getElementById("bowbox");(window.requestAnimationFrame||setTimeout)(()=>{box2.scrollLeft=(box2.scrollWidth-box2.clientWidth)/2})}
function drawComplete(){const c={};(function w(id,g,side){const d=D[id];[d[3],d[4]].forEach((p,ix)=>{if(p&&D[p]){const sd=side||(ix===0?"F":"M");(c[g]=c[g]||{F:0,M:0})[sd]++;w(p,g+1,sd)}})})("kids",1,null);
 const nm=["","Parents","Grandparents","Great-grandparents","2nd great-grandparents","3rd great-grandparents"],ord=["","","","","","","4th","5th","6th","7th","8th","9th","10th","11th"];
 const max=Math.max(...Object.keys(c).map(Number));let h="";
 for(let g=1;g<=max;g++){const t=2**g,f=c[g]||{F:0,M:0},n=f.F+f.M,pc=n/t*100;const label=g<=5?nm[g]:ord[g]+" great-grandparents";
  h+=`<div class="cpl"><div class="cplh"><span>${label}</span><span>${n} of ${t.toLocaleString()} · ${pc>=1||pc===0?Math.round(pc):pc.toFixed(1)}%</span></div><div class="cplb"><span style="width:${f.F/t*100}%;background:var(--mint)"></span><span style="width:${f.M/t*100}%;background:var(--peri)"></span></div></div>`}
 document.getElementById("complete").innerHTML=h+`<p class="note" style="margin:12px 0 0">Each generation doubles: 2 parents, 4 grandparents, 8 great-grandparents and so on. Dad's side stops at the 3rd great-grandparents, where the German church records begin. A person who appears twice in the tree, like Jacob Forinash, is counted in each place.</p>`}
const FAMS=[["before 1790","philipsr","elizabethb",11,"philipjr"],["before 1796","andrewbal","agnessmart",5,"elspeth"],["1817","philipjr","elspeth",6,"andrew"],["1798","johndexter","elizabethw",13,"johng"],["1829","charles","janemartin",12,"floyd"],["1888","frankj","carrie",5,"herbert"],["1891","calvin","cora",5,"genevieve"],["1896","johnwj","amanda",9,"onal"],["1899","anthony","rosa",4,"nelson"],["1908","herbert","mamie",9,"caroline"],["about 1926","onal","genevieve",4,"betty"],["1928","nelson","caroline",5,"tony"],["1954","tony","betty",6,""]];
function drawFams(){const mx=Math.max(...FAMS.map(f=>f[3]));
 document.getElementById("fams").innerHTML=FAMS.map(([y,a,b,n,kid])=>{const c=SIDE[a]==="F"?"var(--mint)":SIDE[a]==="M"?"var(--peri)":"var(--accent)";
  return`<button type="button" class="fam"${kid?` data-id="${kid}"`:""}><span class="fy">${esc(y)}</span><span class="fb"><b>${esc(CHS(a))} and ${esc(CHS(b))}</b><span class="fbar"><span style="width:${(n/mx*100).toFixed(1)}%;background:${c}"></span><em>${n}</em></span></span></button>`}).join("")+`<p class="note" style="margin:12px 0 0">Children per couple along the direct lines, by year married. Tap a couple to open the child in our line, whose card lists the brothers and sisters.</p>`}
drawBowtie();drawComplete();drawFams();
["bowtie","fams"].forEach(i=>{const el=document.getElementById(i);el.addEventListener("click",e=>{const g=e.target.closest("[data-id]");if(g){showPerson(g.dataset.id);location.hash="#tree"}});el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){const g=e.target.closest("[data-id]");if(g){e.preventDefault();showPerson(g.dataset.id);location.hash="#tree"}}})});
window.addEventListener("hashchange",()=>{if(location.hash==="#charts/bowtie"){const b=document.getElementById("bowbox");(window.requestAnimationFrame||setTimeout)(()=>{b.scrollLeft=(b.scrollWidth-b.clientWidth)/2})}});
document.getElementById("bownav").addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(!b)return;const x=document.getElementById("bowbox");const t=b.dataset.go==="L"?0:b.dataset.go==="R"?x.scrollWidth:(x.scrollWidth-x.clientWidth)/2;x.scrollTo({left:t,behavior:"smooth"})});
