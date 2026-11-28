// ---------- surname meanings ----------
const SURN={
 "Ankenbrandt":["German","The meaning isn't certain. It's a rare name, found among Germans who settled around Monroe, Michigan.",1],
 "Ballantyne":["Scottish","Named after a place in the Scottish Borders (spelled Bellenden or Ballantyne in old records).",0],
 "Beamer":["German, Americanized","An American spelling of Böhmer, meaning “someone from Bohemia,” today part of the Czech Republic.",0],
 "Böhmer":["German","“Someone from Bohemia,” today part of the Czech Republic. In America it became Beamer.",0],
 "Bexten":["German (Westphalia)","A farm name. Bexten was a farm in Ennigerloh parish, near Beckum, Westphalia: the Prince-Bishop of Münster's records of bonded farms have a file on it for 1698–1724, and Johann Bernard Bexte, Anthony's grandfather, was a farm holder (Colon) at Ennigerloh. In the Münsterland a family took the name of the farm it held, so other, unrelated families named Bexten held farms of the same name at Einen (Grosse and Lütke Bexten) and Liesborn (Schulze Bexten). The Ennigerloh church books spell the family Bexte; Anthony used Bexten in America. Said in German “BEX-tuh” (Bexte) and “BEX-ten” (Bexten), stress on the first syllable, so the two sound almost alike. The original meaning of the farm name hasn't been settled.",1],
 "Blossom":["English","From the Middle English word for a flower or bloom, probably a nickname.",1],
 "Bonnell":["English or French","Either a form of the English name Bunnell, or the French name Bonnel, which some Huguenot families brought to England and America.",0],
 "Bonnet":["French","A hatmaker's name, from French bonnet, a cap or hat. The family were Huguenots who left France for their faith.",0],
 "Bonnett":["French","An English spelling of Bonnet, a hatmaker's name, from French bonnet, a cap or hat.",0],
 "Byrd":["English","A form of Bird, a nickname, perhaps for someone cheerful or light on their feet.",0],
 "Crites":["German, Americanized","An American spelling of Kreutz, for someone who lived near a roadside or boundary cross.",0],
 "Desreux":["French","The meaning isn't certain.",1],
 "Elsdon":["English","Named after the village of Elsdon in Northumberland, in the far north of England.",0],
 "Ervin":["Scottish or English","A form of Erwin or Irvine; Irvine is a place in Ayrshire, Scotland.",1],
 "Erwin":["Scottish or English","Either from an old English personal name or a form of Irvine, a place in Ayrshire, Scotland.",1],
 "Fitz Randolph":["Anglo-Norman","“Son of Randolph.” Fitz comes from the Norman French word for son.",0],
 "Fleischer":["German","A butcher, from German Fleisch, meat.",0],
 "Forinash":["German, Americanized","Possibly an American spelling of vorm Esch, “in front of the open field,” a North German name for someone who lived by the village fields.",1],
 "Goldsborough":["English","Named after Goldsborough, one of two villages of that name in Yorkshire. The old name means a fort belonging to a man named Godel or Golda.",0],
 "Graf":["German","From the old German title Graf, a count or a royal official. It could also mark someone who served a count, or be a nickname for someone with airs.",0],
 "Hardman":["English","Usually a herdsman, someone who looked after livestock.",0],
 "Harris":["English","“Son of Harry,” the everyday medieval form of Henry.",0],
 "Howes":["English","Usually for someone who lived by a hill or burial mound.",1],
 "Johnson":["English","“Son of John.”",0],
 "Langenderfer":["German, Americanized","An American spelling of Langendörfer, “someone from Langendorf” (“long village”), a common German place name.",0],
 "Martin":["English and French","From the personal name Martin, popular in the Middle Ages after St. Martin of Tours.",0],
 "May":["English","The name has several possible origins, including an old word for a young man; which one fits this family isn't known.",1],
 "Ackerman":["German","From Ackermann, a ploughman or farmer, someone who worked the field (Acker).",0],
 "Miller":["English or German","A grain miller. In America it is often the English form of German Müller.",0],
 "Peterson":["English or Scandinavian","“Son of Peter.”",0],
 "Plant":["English","Probably a gardener or someone who raised young plants.",1],
 "Reger":["German","From the old German word for a heron, a nickname for a tall, thin person; or a nickname for a lively, restless one.",0],
 "Smith":["English, and German Schmidt","A smith, someone who worked metal. Our Smiths were German: Frank J. Smith's father was Wendelin Schmidt.",0],
 "Waggoner":["German, Americanized","An American spelling of Wagner, a wagon maker or wagon driver.",0],
 "Wine":["English or German","The meaning isn't certain; in some families it's an American spelling of a German name.",1]
};
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
 ["Germany",[["Westphalia",/Westphalia/],["Stromberg",/Stromberg/],["Baden",/Baden/],["Württemberg",/Württemberg/],["Ober-Seemen, Hesse",/Ober-Seemen/],["St. Wendel",/St\. Wendel/],["Bavaria",/Bavaria/]]],
 ["France",[["Alsace",/Alsace/]]],
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
 let html=`<div class="ixaz">${az}</div><p class="ixsrc">Tap a name to see what it means and who carried it. Meanings follow the Dictionary of American Family Names and similar references; some old names can't be pinned down.</p>`,cur="";
 sk.forEach(s=>{const l=L(s);if(l!==cur){cur=l;html+=`<h3 class="ixl" id="ix-${l}">${l}</h3>`}
  const ids=IX.sur[s].slice().sort((a,b)=>(parseInt(D[a][1].replace(/\D/g," "))||9999)-(parseInt(D[b][1].replace(/\D/g," "))||9999));
  html+=`<details class="ixr"><summary>${ixDots(ids)}<b>${esc(s)}</b><span class="ixc">${ids.length} ${ids.length>1?"people":"person"}</span></summary><div class="ixps">${SURN[s]?`<p class="ixm"><span>${esc(SURN[s][0])}</span>${esc(SURN[s][1])}${SURN[s][2]?' <em>Not certain.</em>':""}</p>`:""}${ids.map(i=>ixPerson(i)).join("")}</div></details>`});
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
 const b=e.target.closest("[data-id]");if(b){showPerson(b.dataset.id);location.hash="#tree"}});
document.getElementById("indexbtn").addEventListener("click",()=>{location.hash="#index"});
