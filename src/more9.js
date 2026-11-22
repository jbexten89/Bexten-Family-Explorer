// ---------- what's new ----------
// [date, person id or "", headline, detail]. Newest first. Research finds only; app changes go in the "app" group.
const NEWS=[
 ["2026-11-22","wendelL","Proven: the Langenderfers came from near Sankt Wendel","Wendel (born 1828) and Anna Maria (born 1826) were both from Hofeld-Mauschbach in the Prussian Rhineland. They married at Sankt Wendel in 1849 and landed at New York together in 1850. Their baptisms add four new ancestors: Wilhelm Langendoerfer, Gertrud Lay, Jacob Langendoerfer and Anna Maria Bick."],
 ["2026-11-22","brigitta","Brigitta was in New York, 1858–1864","Her Jaeger daughters married the Hecker brothers in a double wedding in 1880. Their records say both girls were born in New York, like Rosa, so Brigitta, Mr. Jaeger and then Joseph Graf were in New York before coming to Michigan."],
 ["2026-11-22","brigitta","The Grafs in the Sylvania parish census","St. Joseph's, Sylvania, kept a household census in the 1880s. The Graf page gives the Jaeger daughters' exact birthdays and confirms Rosa was born May 6, 1864. Two Regers in the same parish came from Deilingen, Württemberg, the best lead yet for Brigitta's home village."],
 ["2026-11-22","elizabethg","Proven: Elizabeth's parents were James and Margaret","Her Nov 8, 1863, marriage to Floyd Bonnell at Grafton, Taylor County, names her as Elisabeth Pitman, 29, daughter of Jas. and Margaret Goldeborough."],
 ["2026-11-22","jamesg","James Goldsberry's estate, 1846","Barbour County court records show James Goldsberry dead by April 1846, his estate administered by John Shockey. In 1850 his daughter Rebecca was living with the Shockeys."],
 ["2026-11-22","margaretg","Elizabeth Goldsborough's mother: Margaret Goldsberry","Her younger sisters' Barbour County marriage records (1856, 1860) name their parents as James and Margaret Goldsberry. Margaret now fills the empty place in the tree."],
 ["2026-11-21","catharinar","Anthony grew up with a stepfather","Catharina Rüdingloh remarried, to Carl Sander, and had four more children at Stromberg in 1870–75. Anthony's father Hermann seems to have died while Anthony was a baby."],
 ["2026-11-21","anthony","Anthony Bexten's mother found: Catharina Rüdingloh","His 1899 marriage record names his parents as “Hamlin Baxter” and “Chaterine Redingloch,” Hermann Bexte and Catharina Rüdingloh. That matches the 1868 Stromberg baptism, so Stromberg is almost certainly his hometown."],
 ["2026-11-21","catharinaf","A possible death record for Catharina (Kate) Miller","Katie Miller, a widow aged 76 born in Germany, died Jan 14, 1906, at 3623 Erie Street in South Toledo and was buried at Forest Cemetery. Not yet proven; her burial card is on the To-do list."],
 ["2026-11-21","mamie","Mamie (Miller) Smith probably died Nov 15, 1966","The Ohio death index has a Mary A. Smith, a widow aged 76, who died in Toledo that day. Her death certificate (on the To-do list) would prove it."],
 ["2026-11-21","caroline","Caroline Bexten's 1987 obituary","Toledo Blade, May 19, 1987: she died at Bryan at 77, with her funeral at Sacred Heart, Montpelier."],
 ["2026-11-21","betty","Tony and Althea's 1954 wedding","Married on her 20th birthday at Central Avenue Methodist Church, Toledo, in a gown of chantilly lace. Also found: her yearbooks from Jesup W. Scott High School (1949–52), her birth index and her death certificate."],
 ["2026-11-21","tony","Tony's birthplace and death record","Born at Ottawa Lake, Michigan; died at Bryan in 2011, a farmer living at Pioneer."],
 ["2026-11-21","nelson","Draft cards and a misspelled birth record","Nelson's 1942 draft card gives his middle name, Anthony. His 1903 birth record calls him “Lory N. Baxter.”"],
 ["2026-11-21","herbert","Herbert Smith's World War I draft card","In 1917 he drove a beer wagon for the Buckeye Brewery and lived at 2115 Chestnut Street with his wife and two children."],
 ["2026-11-21","johnw","John Waggoner's Revolutionary War pension","Pension file S7824, applied for in 1833, describes his service in Virginia."],
 ["2026-11-21","johnbonnell","John Bonnell's Revolutionary War service proven","His widow's pension file (W6222) proves his service. It also shows the widow was Hannah (Smith) Byers, not Rulanah, a puzzle still open."],
 ["2026-11-21","floyd","Floyd Bonnell's Civil War pension","He applied as a veteran on Jan 20, 1890."],
 ["2026-11-21","johnm","A new generation: John Miller and Catharina Friedrich","Fred Miller's 1861 baptism at St. Mary's, Toledo, names his parents. Fred was a twin, and his brother Peter and sister Theresa are proven too."],
 ["2026-11-21","louisack","Louis Ackerman came from Alsace","He was born in Alsace (then France) in 1827. His wife Augusta Datzel was from Bavaria."],
 ["2026-11-21","margaretm","Margaret (Ackerman) Miller's 1952 obituary","It lists her children and her lodges."],
 ["2026-11-21","mamie","Mamie's parents named","Herbert and Mamie's 1908 marriage at Monroe, Michigan, names her parents as Fred Miller and Margaret Ackerman."],
 ["2026-11-21","wendell","Wendelin Schmidt and Barbara Ankenbrandt","Their death dates and children."],
 ["2026-11-21","wendelL","The Langenderfers in 1880","Wendel and Mary in the 1880 census, and a likely 1849 marriage at St. Wendel."],
 ["2026-11-21","joseph","Joseph Graf's 1905 train accident","The Blade reported how he was killed at Sylvania. A possible 1857 arrival was found too."],
 ["2026-11-20","anthony","A strong lead on Anthony Bexten's birthplace","A Caspar Anton Bexte was baptized at Stromberg, Westphalia, in 1868. The baptism film and a letter to the diocese archive are on the To-do list."],
 ["2026-11-20","herbert","Herbert Smith's 1949 obituary","Nine children and seven grandchildren survived him."],
 ["2026-11-20","genevieve","Genevieve's family","Her brothers and sisters, her 1957 marriage, and her father Calvin Beamer's grave and first wife."],
 ["2026-11-20","onal","Onal Bonnell's family","His brothers and sisters, plus Caroline's grave and Joseph Graf's burial."],
 ["2026-11-21","","App: record requests track their status","On the To-do tab, mark each request Not sent, Sent or Answered, with dates and notes."],
 ["2026-11-21","","App: see the record on Ancestry","Ancestry sources now link straight to the picture of the record (subscription needed)."],
 ["2026-11-21","","App: the family book","A printable book of the story and every ancestor, generation by generation, with sources."],
 ["2026-11-20","","App: index, charts and more","The Family index of surnames and places, six charts, On this day, sharing with a QR code, and Help."]
];
const NKEY="bexten-news-seen";
const newsSeen=()=>{try{return localStorage.getItem(NKEY)||""}catch(e){return""}};
const newsLatest=NEWS.reduce((m,n)=>n[0]>m?n[0]:m,"");
const fmtDay=d=>new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
function drawNews(){
 const seen=newsSeen(),days=[...new Set(NEWS.map(n=>n[0]))].sort().reverse();
 const item=n=>`<li class="nw${n[0]>seen&&seen?" fresh":""}">${n[1]&&D[n[1]]?`<button type="button" data-id="${n[1]}"><b>${esc(n[2])}</b><span>${esc(n[3])}</span><small>${esc(D[n[1]][0])} ›</small></button>`:`<div><b>${esc(n[2])}</b><span>${esc(n[3])}</span></div>`}</li>`;
 document.getElementById("news").innerHTML=days.map(d=>{const fs=NEWS.filter(n=>n[0]===d&&n[1]),ap=NEWS.filter(n=>n[0]===d&&!n[1]);
  return `<h3>${fmtDay(d)}</h3><ul class="nwl">${fs.map(item).join("")}</ul>${ap.length?`<ul class="nwl app">${ap.map(item).join("")}</ul>`:""}`}).join("");
}
document.getElementById("news").addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b){location.hash="#tree";showPerson(b.dataset.id)}});
function homeLinks(){const el=document.getElementById("homelinks");if(!el)return;const seen=newsSeen(),finds=NEWS.filter(x=>x[1]),fresh=finds.filter(x=>x[0]>seen),n=seen?fresh.length:finds.length,top=(fresh[0]||finds[0]);
 el.innerHTML=`<a href="#new" class="hl"><span class="otdl">What's new</span><span class="otds">${esc(top?top[2]:"")}</span>${n?`<span class="nbadge" aria-label="${n} new">${n}</span>`:""}<i aria-hidden="true">›</i></a>`}
homeLinks();
window.addEventListener("hashchange",()=>{const v=location.hash.slice(1).split("/")[0];
 if(v==="new"){drawNews();setTimeout(()=>{try{localStorage.setItem(NKEY,newsLatest)}catch(e){}homeLinks()},800)}
 if(v==="book")drawBook()});

// ---------- family book ----------
const GEN_NAME=g=>g===1?"Tony and Althea's children":g===2?"Parents":g===3?"Grandparents":g===4?"Great-grandparents":g===5?"2nd great-grandparents":g===6?"3rd great-grandparents":(g-3)+"th great-grandparents";
let BOOK_DONE=false;
function ahnen(){const num={},list=[];const q=[["kids",1]];
 while(q.length){const [id,n]=q.shift();if(!id||!D[id])continue;const dup=num[id]!==undefined;list.push({id,n,dup});if(dup)continue;num[id]=n;q.push([D[id][3],2*n],[D[id][4],2*n+1])}
 return{num,list}}
function srcList(id){const s=(typeof SRC!=="undefined"&&SRC[id])||[];return s.filter(Boolean).map(x=>({t:x[0],l:x[1],u:x[2]}))}
function drawBook(){if(BOOK_DONE)return;BOOK_DONE=true;
 const {num,list}=ahnen();const nm=id=>D[id]?D[id][0]:"";
 const ref=id=>id&&D[id]?`${esc(nm(id))} <span class="bkn">(${num[id]})</span>`:"";
 const gens={};list.forEach(p=>{const g=Math.floor(Math.log2(p.n))+1;(gens[g]=gens[g]||[]).push(p)});
 const G=Object.keys(gens).map(Number).sort((a,b)=>a-b);
 const people=list.filter(p=>!p.dup&&p.id!=="kids");
 const today=new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
 // story: copy the Story tab text, without its title and ids
 const sb=document.getElementById("story-body").cloneNode(true);sb.querySelectorAll("h1").forEach(h=>h.remove());sb.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));
 const person=p=>{const d=D[p.id],f=d[2]||[],s=srcList(p.id),kids=list.filter(c=>!c.dup&&Math.floor(c.n/2)===p.n&&c.id!==p.id);
  const child=Math.floor(p.n/2),cid=Object.keys(num).find(k=>num[k]===child);
  return `<article class="bkp" id="bk-${p.n}"><h4><span class="bkno">${p.n}</span>${esc(d[0])}${d[1]?` <span class="bky">${esc(d[1])}</span>`:""}</h4>
  <p class="bkm">${SIDE[p.id]==="F"?"Dad's side":SIDE[p.id]==="M"?"Mom's side":""} · ${stat[d[5]]||""}</p>
  ${f.length?`<ul>${f.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<p class="bkm">No details found yet.</p>`}
  <p class="bkrel">${d[3]||d[4]?`Parents: ${[d[3],d[4]].filter(k=>D[k]).map(ref).join(" and ")}`:"Parents not yet found"}${cid&&cid!=="kids"?` · Child in this line: ${ref(cid)}`:""}</p>
  ${s.length?`<p class="bksrc"><b>Sources:</b> ${s.map(x=>`${esc(x.l)}${x.u?` <span class="bku">${esc(x.u.replace(/^https?:\/\/(www\.)?/,"").replace(/[?#].*$/,"").slice(0,60))}</span>`:""}`).join("; ")}</p>`:""}</article>`};
 const dups=list.filter(p=>p.dup);
 const sur=Object.keys(SURN).sort((a,b)=>a.localeCompare(b));
 const idx=people.slice().sort((a,b)=>{const sa=D[a.id][0].split(" ").pop(),sb2=D[b.id][0].split(" ").pop();return sa.localeCompare(sb2)||D[a.id][0].localeCompare(D[b.id][0])});
 document.getElementById("book").innerHTML=`
 <div class="bkbar"><p>The story and every ancestor in one book, with sources.</p><div class="bkbtns"><a class="btn" href="Bexten-Family-Book.pdf" download>Download PDF</a><button class="btn" type="button" data-print>Print</button></div></div>
 <section class="bkcover"><p class="bkkick">A family history</p><h1>The Bexten Family</h1><p class="bksub">The ancestors of Tony and Althea Bexten's six children, from Plymouth Colony and the Rhine to Toledo and Pioneer</p>
 <p class="bkstat">${people.length} ancestors · ${G.length-1} generations back</p><p class="bkdate">Compiled from records, November 2026 · this copy printed ${today}</p></section>
 <section class="bktoc"><h2>Contents</h2><ol><li>The family story</li><li>Ancestors, generation by generation<ol>${G.filter(g=>g>1).map(g=>`<li>Generation ${g}: ${GEN_NAME(g)} (${gens[g].filter(p=>!p.dup).length})</li>`).join("")}</ol></li><li>Where the surnames come from</li><li>Index of names</li></ol>
 <h3>How to read this book</h3><p>Every ancestor has a number. Tony and Althea's children are number 1. A person's father is twice their number and their mother is twice plus one, so Tony is 2, Althea is 3, and Tony's parents are 4 and 5. Even numbers are men and odd numbers are women.</p>
 <p>Each person is marked <b>From records</b> (proven by birth, marriage, death, census, church or court records), <b>From published genealogies and trees</b> (taken from books or online trees and not yet checked against records), or <b>Not yet proven</b>.</p></section>
 <section class="bkpart"><h2><span>Part 1</span>The family story</h2><div class="prose bkstory">${sb.innerHTML}</div></section>
 <section class="bkpart"><h2><span>Part 2</span>Ancestors, generation by generation</h2>
 ${G.filter(g=>g>1).map(g=>`<h3 class="bkgen">Generation ${g} · ${GEN_NAME(g)}</h3>${gens[g].filter(p=>!p.dup).map(person).join("")}`).join("")}
 ${dups.length?`<p class="bkm">Some ancestors appear in the tree more than once; they are described at their first number.</p>`:""}</section>
 <section class="bkpart"><h2><span>Part 3</span>Where the surnames come from</h2><dl class="bksur">${sur.map(k=>`<dt>${esc(k)} <span>${esc(SURN[k][0])}</span></dt><dd>${esc(SURN[k][1])}</dd>`).join("")}</dl></section>
 <section class="bkpart"><h2><span>Part 4</span>Index of names</h2><ul class="bkidx">${idx.map(p=>`<li><a href="#bk-${p.n}">${esc(D[p.id][0])}</a> <span>${esc(D[p.id][1]||"")}</span> <b>${p.n}</b></li>`).join("")}</ul>
 <p class="bkend">Compiled with Claude from the records listed under each person. Living people are left out. The Bexten Family Explorer app has the same history with maps, charts and links to every record.</p></section>`;
 document.querySelectorAll("#book [data-print]").forEach(b=>b.addEventListener("click",()=>window.print()));
 document.getElementById("book").addEventListener("click",e=>{const a=e.target.closest('a[href^="#bk-"]');if(!a)return;e.preventDefault();const t=document.getElementById(a.getAttribute("href").slice(1));if(t)t.scrollIntoView({block:"start",behavior:"smooth"})});
}
window.addEventListener("hashchange",()=>document.documentElement.classList.toggle("bookmode",location.hash.slice(1).split("/")[0]==="book"));
document.documentElement.classList.toggle("bookmode",location.hash.slice(1).split("/")[0]==="book");
if(location.hash.slice(1).split("/")[0]==="book")setTimeout(drawBook,0);
if(location.hash.slice(1).split("/")[0]==="new")setTimeout(drawNews,0);
