
// ---------- on this day ----------
var MON={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
var OTD_EVENTS=(function(){var out=[],re=/\b(Born|Married|Died|Killed)\b([^;]*?)\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sept?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.? (\d{1,2})(?: or \d{1,2})?, (\d{4})/g;
 Object.keys(D).forEach(function(id){if(id==="kids")return;D[id][2].forEach(function(f){var m;re.lastIndex=0;while((m=re.exec(f))){var kind=m[1]==="Born"?"born":m[1]==="Married"?"married":"died";var who=m[2].replace(/^\s+|\s+$/g,"");out.push({id:id,kind:kind,mo:MON[m[3].slice(0,3).toLowerCase()],d:+m[4],y:+m[5],extra:kind==="married"?who.replace(/^to /,""):""})}})});
 var seen={};return out.filter(function(e){var k=e.kind+e.mo+"-"+e.d+"-"+e.y+(e.kind==="married"?"":e.id);if(seen[k])return false;seen[k]=1;return true})})();
function otdLine(e,now){var n=D[e.id][0],ago=now.getFullYear()-e.y;var what=e.kind==="born"?esc(n)+" was born":e.kind==="died"?esc(n)+" died":esc(n)+" married"+(e.extra?" "+esc(e.extra):"");return `<button type="button" data-id="${e.id}"><span class="dot" style="background:${col(e.id)}"></span><span><b>${e.y}</b> · ${what}<small>${ago} years ago</small></span></button>`}
function otdShow(id){var box=document.getElementById("otd");if(!box||!OTD_EVENTS)return;if(id!=="kids"){box.hidden=true;return}
 var now=new Date(),mo=now.getMonth(),d=now.getDate();
 var today=OTD_EVENTS.filter(function(e){return e.mo===mo&&e.d===d});
 var h="";
 if(today.length){h=`<h3>On this day</h3>`+today.map(function(e){return otdLine(e,now)}).join("")}
 else{var y=now.getFullYear(),up=OTD_EVENTS.map(function(e){var t=new Date(y,e.mo,e.d);if(t<new Date(y,mo,d))t=new Date(y+1,e.mo,e.d);return {e:e,t:t}}).filter(function(x){return (x.t-now)/864e5<=7}).sort(function(a,b){return a.t-b.t}).slice(0,3);
  if(!up.length){box.hidden=true;return}
  var f=up[0],fd=f.t.toLocaleDateString("en-US",{month:"short",day:"numeric"});h=`<details class="otdc"><summary><span class="otdl">This week</span><span class="otds">${fd}: ${esc(CHN(f.e.id))}${up.length>1?" and "+(up.length-1)+" more":""}</span></summary>`+up.map(function(x){return otdLine(x.e,now).replace("<small>",`<small>${x.t.toLocaleDateString("en-US",{month:"short",day:"numeric"})} · `)}).join("")+`</details>`}
 box.innerHTML=h;box.hidden=false}
document.getElementById("otd").addEventListener("click",function(e){var b=e.target.closest("[data-id]");if(b){showPerson(b.dataset.id);document.getElementById("app").scrollTo({top:0,behavior:"smooth"})}});
otdShow("kids");

// ---------- family stats ----------
var STATS_SIDE="all";
function sideOK(k){return STATS_SIDE==="all"||SIDE[k]===STATS_SIDE}
function sideChips(){var o=[["all","Both sides"],["F","Dad's side"],["M","Mom's side"]];return `<div class="statside" role="group" aria-label="Which side">${o.map(function(x){return `<button type="button" class="chip" data-sside="${x[0]}" aria-pressed="${STATS_SIDE===x[0]}">${x[0]!=="all"?`<span class="dot" style="background:${x[0]==="F"?"var(--mint)":"var(--peri)"}"></span>`:""}${x[1]}</button>`}).join("")}</div>`}
function drawStats(){
 var ids=Object.keys(D).filter(function(k){return k!=="kids"&&sideOK(k)});
 var gens=ids.map(genOf),maxG=Math.max.apply(null,gens);
 var proven=ids.filter(function(k){return D[k][5]==="r"}).length;
 var lives=[];ids.forEach(function(k){var m=(D[k][1]||"").match(/^c?\.?(\d{4})\D+c?\.?(\d{4})$/);if(m)lives.push({id:k,b:+m[1],dd:+m[2],age:+m[2]-+m[1]})});
 var avg=Math.round(lives.reduce(function(s,x){return s+x.age},0)/lives.length);
 var oldest=lives.slice().sort(function(a,b){return b.age-a.age})[0];
 var earliest=ids.map(function(k){var m=(D[k][1]||"").match(/(\d{4})/);return m?{id:k,y:+m[1]}:null}).filter(Boolean).sort(function(a,b){return a.y-b.y})[0];
 var REG=[["Germany",/Germany|Westphalia|Baden|Württemberg|Prussia|Hesse/],["Holland",/Leiden|Holland/],["England",/England|Nottingham|Cambridge|Sutton/],["Massachusetts",/Barnstable|Massachusetts/],["New Jersey",/New Jersey|Piscataway/],["Pennsylvania",/Pennsylvania|Reading|White Marsh/],["New York",/New York/],["Michigan",/Michigan/],["Ohio",/Ohio|Toledo|Raab/],["Virginia & West Virginia",/Virginia|County|Buckhannon|Weston|Philippi|New Market/]];
 var places={};ids.forEach(function(k){var f=D[k][2].find(function(x){return /^Born\b/.test(x)});if(!f)return;for(var i=0;i<REG.length;i++){if(REG[i][1].test(f)){places[REG[i][0]]=(places[REG[i][0]]||0)+1;return}}});
 var pl=Object.keys(places).map(function(k){return [k,places[k]]}).sort(function(a,b){return b[1]-a[1]}),pmax=pl.length?pl[0][1]:1;
 var names={};ids.forEach(function(k){var n=D[k][0].replace(/^Rev\.\s+/,"").replace(/[“"][^”"]*[”"]\s*/g,"").split(" ")[0];if(n.length>1)names[n]=(names[n]||0)+1});
 var top=Object.keys(names).map(function(k){return [k,names[k]]}).filter(function(x){return x[1]>1}).sort(function(a,b){return b[1]-a[1]||a[0].localeCompare(b[0])}).slice(0,6);
 var tile=function(n,l,s){return `<div class="stat"><div class="n">${n}</div><div class="l">${l}</div>${s?`<div class="s">${s}</div>`:""}</div>`};
 document.getElementById("stats-box").innerHTML=sideChips()+`<div class="tiles">${tile(ids.length,"ancestors named")}${tile(maxG,"generations back",STATS_SIDE==="F"?"to Westphalia, Baden and Alsace":"to the Pilgrims, about 1580")}${tile(Math.round(proven/ids.length*100)+"%","backed by records",proven===ids.length?"every one proven by records":"the rest from published genealogies and trees")}${tile(avg,"average lifespan, years",lives.length+" ancestors with both dates")}${tile(oldest.age,"longest life, years",esc(D[oldest.id][0])+", "+oldest.b+"–"+oldest.dd)}${tile(earliest.y<1600?"c."+earliest.y:earliest.y,"earliest birth",esc(D[earliest.id][0]))}</div>
 <div class="card statcard"><h3>Where they were born</h3><p class="note">For the ${pl.reduce(function(s,x){return s+x[1]},0)} ancestors whose birthplace is recorded</p>${pl.map(function(x){return `<div class="bar"><span>${x[0]}</span><i style="width:${Math.max(6,x[1]/pmax*100)}%"></i><b>${x[1]}</b></div>`}).join("")}</div>
 <div class="card statcard"><h3>Most common first names</h3>${top.map(function(x){return `<div class="nm"><span>${esc(x[0])}</span><b>${x[1]}</b></div>`}).join("")}</div>`;
drawAges();
}
var AGES_ORDER="old";
function drawAges(){
 var box=document.getElementById("stats-box");if(!box)return;
 var all=Object.keys(D).filter(function(k){return k!=="kids"&&sideOK(k)});
 var rows=[];all.forEach(function(k){var t=ageAtDeath(k);if(!t)return;var inf=/infant/.test(t),m=t.match(/(\d+)/);var a=inf?0:(m?+m[1]:null);if(a===null)return;rows.push({id:k,a:a,about:/about/.test(t),inf:inf})});
 rows.sort(function(x,y){return AGES_ORDER==="old"?(y.a-x.a||D[x.id][0].localeCompare(D[y.id][0])):(x.a-y.a||D[x.id][0].localeCompare(D[y.id][0]))});
 var max=rows.reduce(function(m,r){return Math.max(m,r.a)},1),missing=all.length-rows.length;
 var html=`<div class="card statcard agescard" id="ages-card"><div class="ageshead"><h3>Ages at death</h3><div class="agesort" role="group" aria-label="Order"><button type="button" class="chip" data-ages="old" aria-pressed="${AGES_ORDER==="old"}">Oldest first</button><button type="button" class="chip" data-ages="young" aria-pressed="${AGES_ORDER==="young"}">Youngest first</button></div></div><p class="note">${rows.length} ancestors. Tap a name to open their card. “About” means the age is worked out from the years alone.</p><ol class="ages">${rows.map(function(r){return `<li><button type="button" data-id="${r.id}"><span class="dot" style="background:${col(r.id)}"></span><span class="an"><b>${esc(D[r.id][0])}</b><small>${esc(D[r.id][1]||"")}</small></span><i style="width:${Math.max(3,r.a/max*100)}%;background:${col(r.id)}"></i><em>${r.inf?"infant":(r.about?"about ":"")+(r.inf?"":r.a)}</em></button></li>`}).join("")}</ol>${missing?`<p class="note">${missing} more ancestors are left out because their age at death isn't known yet.</p>`:""}</div>`;
 var old=document.getElementById("ages-card");if(old)old.outerHTML=html;else box.insertAdjacentHTML("beforeend",html);
}
document.getElementById("stats-box").addEventListener("click",function(e){var sd=e.target.closest("[data-sside]");if(sd){STATS_SIDE=sd.dataset.sside;drawStats();return}var c=e.target.closest("[data-ages]");if(c){AGES_ORDER=c.dataset.ages;drawAges();return}var b=e.target.closest("#ages-card [data-id]");if(b){showPerson(b.dataset.id);location.hash="#tree"}});
drawStats();

// ---------- share ----------
var SHARE_URL="https://jbexten89.github.io/Bexten-Family-Explorer/";
(function(){var sh=document.getElementById("share");
 function open(){sh.hidden=false;document.body.classList.add("modal")}
 function close(){sh.hidden=true;document.body.classList.remove("modal")}
 document.getElementById("sharebtn").addEventListener("click",open);
 sh.addEventListener("click",function(e){if(e.target===sh||e.target.closest("[data-close]"))close()});
 document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!sh.hidden)close()});
 var SHARE_MSG="Here's our family history app: the Bexten family tree, maps and story.\n\n"+SHARE_URL+"\n\nTo keep it on your phone like an app:\n• iPhone: open the link in Safari, tap the Share button, then Add to Home Screen.\n• Android: open it in Chrome, tap the ⋮ menu, then Add to Home screen (or Install app).\n\nTap Tree to explore, Map for where they lived, and Story to read it all.";
 document.getElementById("share-go").addEventListener("click",function(){if(navigator.share){navigator.share({title:"The Bexten Family Explorer",text:SHARE_MSG}).catch(function(){})}else{location.href="mailto:?subject="+encodeURIComponent("The Bexten Family Explorer")+"&body="+encodeURIComponent(SHARE_MSG)}});
 document.getElementById("share-copy").addEventListener("click",function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(SHARE_MSG):Promise.reject()).then(function(){b.textContent="Copied"},function(){b.textContent=SHARE_URL});setTimeout(function(){b.textContent="Copy link and instructions"},2500)});
})();

// ---------- story audio ----------
