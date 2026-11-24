// ---------- charts ----------
const CHN=id=>({betty:"Betty A. “Althea” Bonnell"})[id]||D[id][0];
const CHS=id=>id==="betty"?"Betty A. Bonnell":CHN(id); // shorter name for charts
const short=(n,max)=>{if(n.indexOf("“Althea”")>0)return n;n=n.replace(/\s*[“"][^”"]*[”"]\s*/g," ").replace(/^Rev\. /,"").trim();if(n.length<=max)return n;const w=n.split(" ");let s=w[0]+" "+w[w.length-1];if(s.length>max)s=s.slice(0,max-1)+"…";return s};
const fill=id=>SIDE[id]==="F"?"var(--mint)":"var(--peri)";
let FANF="kids",FANHIST=[];
const fanHas=id=>id&&D[id]&&((D[id][3]&&D[D[id][3]])||(D[id][4]&&D[D[id][4]]));
function drawFan(){
 const cx=560,cy=560,R=[0,110,190,270,360,455,560];
 const F=FANF;let rows=[[null,null]];rows[0]=F==="kids"?["tony","betty"]:[D[F][3]||null,D[F][4]||null];
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
  if(g<2){const nm=short(CHS(id),g===0?24:20),deg=90-am*180/Math.PI;t=`<g transform="translate(${tx},${ty}) rotate(${deg.toFixed(1)})"><text text-anchor="middle" font-size="${g===0?16:14}" fill="var(--ink)" font-weight="700"><tspan x="0" dy="-0.15em">${esc(nm)}</tspan><tspan x="0" dy="1.3em" font-weight="400" fill="var(--mute)" font-size="12.5">${esc(D[id][1]||"")}</tspan></text></g>`}
  else{let deg=-am*180/Math.PI;if(am>Math.PI/2)deg+=180;const fs=g===2?13:g===3?11.5:10.5,mx=g===2?17:g===3?16:17;
   t=`<g transform="translate(${tx},${ty}) rotate(${deg.toFixed(1)})"><text text-anchor="middle" font-size="${fs}" fill="var(--ink)" font-weight="700"><tspan x="0" dy="-0.15em">${esc(short(CHS(id),mx))}</tspan><tspan x="0" dy="1.2em" font-weight="400" fill="var(--mute)" font-size="${fs-1}">${esc(D[id][1]||"")}</tspan></text></g>`}
  const more=fanHas(id);s+=`<g class="seg${more?" more":""}" data-id="${id}" role="button" tabindex="0" aria-label="${esc(D[id][0])}${more?": show their ancestors":""}"><title>${esc(D[id][0])} ${esc(D[id][1])}${u?" (not yet proven)":""}</title><path d="${d}" fill="${fill(id)}" fill-opacity="${u?0.08:0.2}" stroke="${u?"var(--amber)":"var(--bg)"}" stroke-width="${u?1.5:2}"/>${t}</g>`;
 })});
 const [a,b]=P(R[1],Math.PI),[c,e]=P(R[1],0);
 const cn=F==="kids"?"Tony and Althea's children":short(CHN(F),22),cs=F==="kids"?"Six children, living":(D[F][1]||"");
 s+=`<g class="fanc"${F==="kids"?"":` data-open="${F}" role="button" tabindex="0" aria-label="Open ${esc(D[F][0])} in the tree"`}><path d="M${a},${b} A${R[1]},${R[1]} 0 0 1 ${c},${e} Z" fill="var(--panel2)" stroke="${F==="kids"?"var(--line)":"var(--accent)"}"/><text x="${cx}" y="${cy-62}" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">${esc(cn)}</text><text x="${cx}" y="${cy-36}" text-anchor="middle" font-size="13.5" fill="var(--mute)">${esc(cs)}</text>${F==="kids"?"":`<text x="${cx}" y="${cy-14}" text-anchor="middle" font-size="12.5" fill="var(--accent)" font-weight="700">Open in tree ›</text>`}</g>`;
 s+=`<text x="40" y="${cy+30}" font-size="14" fill="${F==="kids"?"var(--mint)":"var(--mute)"}" font-weight="700">${F==="kids"?"Dad's side":"Father's side"}</text><text x="${2*cx-40}" y="${cy+30}" text-anchor="end" font-size="14" fill="${F==="kids"?"var(--peri)":"var(--mute)"}" font-weight="700">${F==="kids"?"Mom's side":"Mother's side"}</text>`;
 const svg=document.getElementById("fan");svg.setAttribute("viewBox",`0 0 ${2*cx} ${cy+44}`);svg.innerHTML=s;
 const nav=document.getElementById("fannav");if(nav){if(F==="kids"){nav.hidden=true}else{nav.hidden=false;const back=FANHIST.length?FANHIST[FANHIST.length-1]:"kids";nav.innerHTML=`<button type="button" class="btn" data-fan="back">‹ ${esc(back==="kids"?"Back to the children":"Back to "+short(CHN(back),24))}</button><button type="button" class="btn" data-fan="home">Start over</button><span>Centered on <b>${esc(CHN(F))}</b></span>`}}
}
function fanFocus(id,push){if(push!==false)FANHIST.push(FANF);FANF=id;drawFan();if(typeof centerFan==="function")centerFan()}
const CHAINS=[["thomasb","The Pilgrim line"],["edwardsr","Fitz Randolph of Nottinghamshire"],["jacques","The Huguenot Bonnets"],["wilhelm","The Waggoners of Hesse"],["charlesf","Forinash of the Buckhannon"],["philipsr","The Beamers"],["andrewbal","The Ballantynes of Dundee"],["herman","The Bexten line"],["georgeg","The Grafs of Baden"],["johnreger","Reger of Württemberg"],["wendell","The Smiths (Schmidt) of Monroe"]];
function pathTo(target){const q=[["kids"]],seen=new Set();while(q.length){const p=q.shift(),h=p[p.length-1];if(h===target)return p;if(seen.has(h))continue;seen.add(h);const d=D[h];if(!d)continue;[d[3],d[4]].forEach(x=>{if(x&&D[x])q.push(p.concat(x))})}return null}
function drawChains(){
 document.getElementById("chains").innerHTML=CHAINS.map(([t,title])=>{const p=pathTo(t);if(!p)return"";const list=p.slice(1).reverse();return `<div class="card"><h3><span class="dot" style="background:${col(t)}"></span>${esc(title)}</h3><ol>${list.map(k=>`<li${D[k][5]==="u"?' class="unp"':""}>${esc(CHN(k))}<span class="yr">${esc(D[k][1])}</span></li>`).join("")}<li class="end">Tony and Althea's children</li></ol></div>`}).join("");
}
function fanAct(t){const o=t.closest("[data-open]");if(o){showPerson(o.dataset.open);location.hash="#tree";return true}const g=t.closest("[data-id]");if(!g)return false;const id=g.dataset.id;if(fanHas(id))fanFocus(id);else{showPerson(id);location.hash="#tree"}return true}
document.getElementById("fan").addEventListener("click",e=>fanAct(e.target));
document.getElementById("fan").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&fanAct(e.target))e.preventDefault()});
document.getElementById("fannav").addEventListener("click",e=>{const b=e.target.closest("[data-fan]");if(!b)return;if(b.dataset.fan==="home"){FANHIST=[];fanFocus("kids",false)}else{fanFocus(FANHIST.pop()||"kids",false)}});
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
 ["Send the record requests","Most letters are in the Bexten Record Request Letters doc in Claude; the library email is in your chat with Claude. Fill in the [brackets] before sending.",[
  ["natz","<b>Order Anthony Bexten's naturalization search</b> from the Archives of Michigan ($20, non-refundable) at <a href=\"https://shop.michiganology.org/products/naturalization-research\" target=\"_blank\" rel=\"noopener\">shop.michiganology.org</a>. Paste the request text into the order notes."],
  ["nysa","<b>Email the New York State Archives</b> at <a href=\"mailto:archref@nysed.gov\">archref@nysed.gov</a> for John Bonnell's Revolutionary War claim (Series A0200, Box RM-1-15-A, Roll 1, page 60)."],
  ["probate","<b>Ask the Monroe County Probate Court</b> (Monroe, Michigan) for a 1905–06 estate file for Joseph Graf (also Graff or Groff) of Whiteford Township. It names the heirs and may give his hometown in Baden."],
  ["berks","<b>Write the Berks History Center</b> (Henry Janssen Library, 160 Spring St., Reading, PA 19601; 610-375-4375) for Philip Beamer Sr.'s baptism, marriage and tax records in Reading before 1799, using letter #8 in the doc."],
  ["braxton","<b>Write the Braxton County Clerk</b> (P.O. Box 486, Sutton, WV 26601; 304-765-2833) for Philip Beamer Jr.'s deeds on Bens Run and Charles Ervin's 1874 estate, to find Rebecca Ervin's parents. Letter #9 in the doc."],
  ["monroehs","<b>Write the Monroe County Historical Society</b> (P.O. Box 465, Union, WV 24983; 304-772-4449) about Old Lebanon Cemetery, Philip Sr.'s gravestone and where Elspeth was buried. Letter #10 in the doc."],
  ["lewischancery","<b>Call the Lewis County Circuit Clerk</b> (117 Court Ave., Weston, WV 26452; 304-269-8210) about the chancery suit of William Peterson's heirs against Jacob Rush. It should list Hannah Fornash as an heir and prove her parents. Letter #11 in the doc."],
  ["wvu","<b>Submit the WVU History Center form</b> at <a href=\"https://westvirginia.libanswers.com/wvrhc\" target=\"_blank\" rel=\"noopener\">westvirginia.libanswers.com/wvrhc</a> asking about the \"Beamer Family\" file (A&amp;M 2537, Box 44)."],
  ["munster","<b>Email or mail the Bistumsarchiv Münster</b> (Georgskommende 19, 48143 Münster, Germany) for Caspar Anton Bexte's 1868 Stromberg baptism, using the German letter in the doc."],
  ["monroeobit","<b>Ask the Monroe County Library System for Brigitta Graf's obituary</b> (died Jan 25, 1914, Whiteford Township; buried St. Joseph's, Sylvania). Email or use the Ask A Librarian form for the Bedford Branch Local History Room, Temperance (734-847-6747), or the Ellis Library & Reference Center genealogy collection, Monroe (734-241-5277). It may say where in New York the Grafs lived before 1870."],
  ["bgsu","<b>Send letter #5 to Bowling Green State University</b> (Center for Archival Collections, Jerome Library, Bowling Green, OH 43403) for Louis Ackerman's naturalization papers. They may name his village in Alsace. Check the CAC website for their email and copy fee first."],
  ["tonydc","<b>Get Tony Bexten's death certificate</b> for his cause of death at the Williams County Health Department, 310 Lincoln Ave., Montpelier (419-485-3141, Mon–Fri 8:30–4:30; $25). He died in Bryan, so this office can issue it. Ask for Anthony J. Bexten, died March 29, 2011, Bryan, age 78."],
  ["bettydc","<b>Order Betty A. (Bonnell) Bexten's death certificate</b> for her cause of death, on the same trip as Mamie's: Toledo-Lucas County Health Department, Vital Statistics, 635 N. Erie St., Toledo (419-213-4100). Ask for Betty A. Bexten, died Jan 28, 1983, at the Medical College of Ohio Hospital, Toledo, age 48, state certificate no. 050369. The Ohio Department of Health in Columbus can also issue it by mail or through VitalChek."],
  ["mamiedc","<b>Order Mamie Smith's 1966 death certificate</b> from the Toledo-Lucas County Health Department, Vital Statistics, 635 N. Erie St., Toledo (419-213-4100), in person (about 15 minutes) or by mail. Ask for Mary A. Smith, died Nov 15, 1966, in Toledo, age 76, widowed, state certificate 94874. About $25. Check that it names her parents (Fred Miller and Margaret Ackerman) or one of her children as informant; that proves she is Mamie."],
  ["forestcard","<b>Ask Forest Cemetery for Katie Miller's burial card</b>: buried Jan 16, 1906, section C7, lot 5, grave 992, city burial ID 5009. Forest is run by the City of Toledo (<a href=\"https://toledo.oh.gov/residents/community/cemeteries\" target=\"_blank\" rel=\"noopener\">toledo.oh.gov cemeteries page</a>). The card may name the undertaker or the person who paid; if it's Peter Miller or another of John and Kate's children, she is our Catharina."],
  ["toledodio","<b>Email the Diocese of Toledo Archives</b> at <a href=\"mailto:Archives@toledodiocese.org\">Archives@toledodiocese.org</a> (letter #6): Jacob Langenderfer's baptism at Maumee (about 1850–52), Joseph Graf and Brigitta's marriage (about 1862) and Rosa's baptism (1864), probably at St. Joseph's, Sylvania, and John Miller's 1884 burial. Small fee per record."],
  ["barbour","<b>Optional: Barbour County Clerk</b>, Philippi, West Virginia, (304) 457-2232 (letter #7). Elizabeth's parents are now proven, so this is only for Margaret Goldsberry's maiden name (her 1844 marriage papers with Elias Yoak) and Elizabeth's first marriage to Isaac Pitman (about 1848)."],

  ["wcpl","<b>Email the Williams County Public Library</b> local history manager, Jared Schnee, at <a href=\"mailto:jared@mywcpl.org\">jared@mywcpl.org</a> for copies of the obituaries of Caroline (Leader-Enterprise, May 20, 1987), Betty (Bryan Times, Jan 29, 1983, and Leader-Enterprise, Feb 2, 1983) and Tony (Bryan Times, Mar 30–31, 2011; received). Free, up to 10 per request. Search the index at <a href=\"https://obits.mywcpl.org\" target=\"_blank\" rel=\"noopener\">obits.mywcpl.org</a>."]]],
 ["Visits and sign-ins","Things only you can do. Claude can't type your passwords for you.",[
  ["stromberg","<b>Look at Anthony's possible baptism</b> at the Toledo Ohio FamilySearch Center, 11050 Avenue Road, Perrysburg (by appointment: 419-392-4643). Ask for FamilySearch films 8206436 or 7992106, Stromberg (St. Lambertus), and find Caspar Anton Bexte, born July 16, 1868, with any notes in the margin. Also check the death register 1868–1885 for him."],
  ["deilingen","<b>On the same Perrysburg visit, look for Brigitta Reger's baptism</b> in the Deilingen (Württemberg) Catholic books, FamilySearch film 008208536. Start at March 25, 1832 (Maria Reger, entry 12) and read the next few entries for a Brigitta born March 28, 1832, daughter of a Johann Reger. She is not in the online index, so the entry may be misread or under another spelling (Brigida, Rieger)."]]],
 ["Optional extras","",[
  ["share","<b>Share the app</b> with siblings and cousins: tap the Share button next to the house on the Tree tab for a QR code and link."],
  ["ask","<b>Ask older relatives</b> for a family Bible, letters from Germany, old photos, and any details of the stowaway story (the ship, the port, who found him)"],
  ["dna","<b>Take a DNA test</b> (AncestryDNA or MyHeritage) to look for relatives descended from Anthony's three sisters in Germany"],
  ["print","<b>Print the charts</b>: open <a href=\"#charts\">Charts</a> and use Print"],
  ["sar","<b>Optional: join the Sons of the American Revolution</b> through Samuel Fitz Randolph (SAR #P-158994) or John Waggoner (#P-338764). Ask Claude for an application starter first."]]]
];
const TKEY="bexten-todo-v1";let done={};try{done=JSON.parse(localStorage.getItem(TKEY))||{}}catch(e){done={}}
if(!done._sent1){["natz","nysa","wvu"].forEach(k=>{done[k]=done[k]||Date.now()});done._sent1=1;try{localStorage.setItem(TKEY,JSON.stringify(done))}catch(e){}}
// Record requests track a status (not sent / sent / answered) with dates and a note.
const RKEY="bexten-req-v1";let req={};try{req=JSON.parse(localStorage.getItem(RKEY))||{}}catch(e){req={}}
const REQ=new Set(TODO[0][2].map(t=>t[0]));
if(!req._mig){REQ.forEach(k=>{if(done[k]&&!req[k])req[k]={s:"sent",sent:done[k]}});req._mig=1;try{localStorage.setItem(RKEY,JSON.stringify(req))}catch(e){}}
const saveReq=()=>{try{localStorage.setItem(RKEY,JSON.stringify(req))}catch(e){}};
if(!req._wvu1){req.wvu={s:"answered",sent:(req.wvu&&req.wvu.sent)||Date.parse("2026-11-23T15:18:00-05:00"),ans:Date.parse("2026-11-23T15:18:00-05:00"),note:(req.wvu&&req.wvu.note)||"Scans of the Beamer Family folder (80 pages) received from Andrew Linderman, Reference Supervisor."};req._wvu1=1;saveReq()}
if(!req._nysa1){const o=req.nysa||{};req.nysa={s:"answered",sent:o.sent||Date.parse("2026-11-23T12:00:00-05:00"),ans:Date.parse("2026-11-23T12:00:00-05:00"),note:(o.note?o.note+"\n":"")+"Answered Nov 23, 2026: the Archives sent a scan (NYSA_A0200_B1_p000060.pdf) from Series A0200, Box 1, page 60. It is a certificate signed at West Point on Feb 26, 1783, showing John Bonnell mustered as a recruit in the New York artillery, enlisted by Capt. Thomas Machin for the rest of the war. Added to John Bonnell in the app."};req._nysa1=1;saveReq()}
if(!req._wcpl1){const o=req.wcpl||{};req.wcpl={s:"partial",sent:o.sent||Date.parse("2026-11-23T15:31:00-05:00"),ans:Date.parse("2026-11-23T15:31:00-05:00"),note:(o.note?o.note+"\n":"")+"Partly answered Nov 23, 2026: the library sent Nelson A. Bexten's 1987 obituary from The Bryan Times (added to Nelson in the app). Still waiting on Caroline (Leader-Enterprise, May 20, 1987), Betty (Bryan Times, Jan 29, 1983, and Leader-Enterprise, Feb 2, 1983) and Tony (Bryan Times, Mar 30–31, 2011)."};req._wcpl1=1;saveReq()}
if(!req._wcpl2){if(req.wcpl&&req.wcpl.note)req.wcpl.note=req.wcpl.note.replace("Partly answered Nov 23, 2026. Still waiting on the rest.","Partly answered Nov 23, 2026: the library sent Nelson A. Bexten's 1987 obituary from The Bryan Times (added to Nelson in the app). Still waiting on Caroline (Leader-Enterprise, May 20, 1987), Betty (Bryan Times, Jan 29, 1983, and Leader-Enterprise, Feb 2, 1983) and Tony (Bryan Times, Mar 30–31, 2011).");req._wcpl2=1;saveReq()}
if(!req._wcpl3){const o=req.wcpl||{};req.wcpl=Object.assign({},o,{s:"partial",note:(o.note?o.note+"\n":"")+"Nov 24, 2026: Tony's Bryan Times obituary (March 2011) received and added to his card. Still waiting on Caroline (Leader-Enterprise, May 20, 1987) and Betty (Bryan Times, Jan 29, 1983, and Leader-Enterprise, Feb 2, 1983)."});req._wcpl3=1;saveReq()}
const fmtD=t=>new Date(t).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});
function reqCard(k,html){
 const r=req[k]||{},st=r.s||"";
 const when=st==="partial"?`Sent ${r.sent?fmtD(r.sent):"—"} · partly answered ${fmtD(r.ans)}`:st==="answered"?`Sent ${r.sent?fmtD(r.sent):"—"} · answered ${fmtD(r.ans)}`:st==="sent"?`Sent ${fmtD(r.sent)} · waiting for a reply`:"";
 const btn=(v,l)=>`<button type="button" data-rq="${k}" data-s="${v}" aria-pressed="${st===v}" class="${st===v?"on":""}">${l}</button>`;
 return `<div class="task req ${st}"><span class="rqdot" aria-hidden="true"></span><div><span class="rqtext">${html}</span>
 <div class="rqbar" role="group" aria-label="Status">${btn("","Not sent")}${btn("sent","Sent")}${btn("partial","Partly")}${btn("answered","Answered")}</div>
 ${when?`<p class="rqwhen">${when}</p>`:""}
 ${st?`<textarea data-note="${k}" rows="2" placeholder="Notes: fee paid, who you talked to, what came back…">${esc(r.note||"")}</textarea>`:""}</div></div>`;
}
function drawTodo(){
 const rk=k=>({"":0,sent:1,partial:2,answered:3})[(req[k]||{}).s||""]??0;
 const all=TODO.flatMap(s=>s[2]),isDone=k=>REQ.has(k)?(req[k]||{}).s==="answered":!!done[k];
 const n=all.filter(t=>isDone(t[0])).length,w=[...REQ].filter(k=>["sent","partial"].includes((req[k]||{}).s)).length;
 document.getElementById("todo-prog").innerHTML=`<b>${n}</b> of ${all.length} done`+(w?` · <b>${w}</b> waiting for a reply`:"");
 document.getElementById("todo-list").innerHTML=TODO.map(([h,hint,items])=>`<h2>${esc(h)}</h2>${hint?`<p class="hint">${esc(hint)}</p>`:""}${(items.some(t=>REQ.has(t[0]))?[...items].sort((a,b)=>rk(a[0])-rk(b[0])):[...items].sort((a,b)=>(done[a[0]]?1:0)-(done[b[0]]?1:0))).map(([k,html])=>REQ.has(k)?reqCard(k,html):`<label class="task ${done[k]?"done":""}"><input type="checkbox" data-k="${k}" ${done[k]?"checked":""}><span>${html}</span></label>`).join("")}`).join("");
}
const tl=document.getElementById("todo-list");
tl.addEventListener("change",e=>{const k=e.target.dataset.k;if(k){if(e.target.checked)done[k]=Date.now();else delete done[k];try{localStorage.setItem(TKEY,JSON.stringify(done))}catch(err){}drawTodo();return}
 const nk=e.target.dataset.note;if(nk&&req[nk]){req[nk].note=e.target.value;saveReq()}});
tl.addEventListener("input",e=>{const nk=e.target.dataset.note;if(nk&&req[nk]){req[nk].note=e.target.value;saveReq()}});
tl.addEventListener("click",e=>{const b=e.target.closest("button[data-rq]");if(!b)return;const k=b.dataset.rq,v=b.dataset.s,r=req[k]||{};
 if(!v){delete req[k]}else{r.s=v;if(v==="sent"){r.sent=r.sent||Date.now();delete r.ans}if(v==="answered"||v==="partial"){r.sent=r.sent||Date.now();r.ans=Date.now()}req[k]=r}
 saveReq();drawTodo()});
drawTodo();
