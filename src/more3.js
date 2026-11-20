
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
 else{var y=now.getFullYear(),up=OTD_EVENTS.map(function(e){var t=new Date(y,e.mo,e.d);if(t<new Date(y,mo,d))t=new Date(y+1,e.mo,e.d);return {e:e,t:t}}).filter(function(x){return (x.t-now)/864e5<=45}).sort(function(a,b){return a.t-b.t}).slice(0,3);
  if(!up.length){box.hidden=true;return}
  h=`<h3>Coming up</h3>`+up.map(function(x){return otdLine(x.e,now).replace("<small>",`<small>${x.t.toLocaleDateString("en-US",{month:"short",day:"numeric"})} · `)}).join("")}
 box.innerHTML=h;box.hidden=false}
document.getElementById("otd").addEventListener("click",function(e){var b=e.target.closest("[data-id]");if(b){showPerson(b.dataset.id);document.getElementById("app").scrollTo({top:0,behavior:"smooth"})}});
otdShow("kids");

// ---------- family stats ----------
function drawStats(){
 var ids=Object.keys(D).filter(function(k){return k!=="kids"});
 var gens=ids.map(genOf),maxG=Math.max.apply(null,gens);
 var proven=ids.filter(function(k){return D[k][5]==="r"}).length;
 var lives=[];ids.forEach(function(k){var m=(D[k][1]||"").match(/^c?\.?(\d{4})\D+c?\.?(\d{4})$/);if(m)lives.push({id:k,b:+m[1],dd:+m[2],age:+m[2]-+m[1]})});
 var avg=Math.round(lives.reduce(function(s,x){return s+x.age},0)/lives.length);
 var oldest=lives.slice().sort(function(a,b){return b.age-a.age})[0];
 var earliest=ids.map(function(k){var m=(D[k][1]||"").match(/(\d{4})/);return m?{id:k,y:+m[1]}:null}).filter(Boolean).sort(function(a,b){return a.y-b.y})[0];
 var REG=[["Germany",/Germany|Westphalia|Baden|Württemberg|Prussia|Hesse/],["Holland",/Leiden|Holland/],["England",/England|Nottingham|Cambridge|Sutton/],["Massachusetts",/Barnstable|Massachusetts/],["New Jersey",/New Jersey|Piscataway/],["Pennsylvania",/Pennsylvania|Reading|White Marsh/],["New York",/New York/],["Virginia & West Virginia",/Virginia|County|Buckhannon|Weston|Philippi|New Market/],["Ohio",/Ohio|Toledo|Raab/],["Michigan",/Michigan|Monroe, Michigan/]];
 var places={};ids.forEach(function(k){var f=D[k][2].find(function(x){return /^Born\b/.test(x)});if(!f)return;for(var i=0;i<REG.length;i++){if(REG[i][1].test(f)){places[REG[i][0]]=(places[REG[i][0]]||0)+1;return}}});
 var pl=Object.keys(places).map(function(k){return [k,places[k]]}).sort(function(a,b){return b[1]-a[1]}),pmax=pl.length?pl[0][1]:1;
 var names={};ids.forEach(function(k){var n=D[k][0].replace(/^Rev\.\s+/,"").replace(/[“"][^”"]*[”"]\s*/g,"").split(" ")[0];if(n.length>1)names[n]=(names[n]||0)+1});
 var top=Object.keys(names).map(function(k){return [k,names[k]]}).filter(function(x){return x[1]>1}).sort(function(a,b){return b[1]-a[1]||a[0].localeCompare(b[0])}).slice(0,6);
 var tile=function(n,l,s){return `<div class="stat"><div class="n">${n}</div><div class="l">${l}</div>${s?`<div class="s">${s}</div>`:""}</div>`};
 document.getElementById("stats-box").innerHTML=`<div class="tiles">${tile(ids.length,"ancestors named")}${tile(maxG,"generations back","to the Pilgrims, about 1580")}${tile(Math.round(proven/ids.length*100)+"%","backed by records","the rest from published genealogies and trees")}${tile(avg,"average lifespan, years",lives.length+" ancestors with both dates")}${tile(oldest.age,"longest life, years",esc(D[oldest.id][0])+", "+oldest.b+"–"+oldest.dd)}${tile(earliest.y<1600?"c."+earliest.y:earliest.y,"earliest birth",esc(D[earliest.id][0]))}</div>
 <div class="card statcard"><h3>Where they were born</h3><p class="note">For the ${pl.reduce(function(s,x){return s+x[1]},0)} ancestors whose birthplace is recorded</p>${pl.map(function(x){return `<div class="bar"><span>${x[0]}</span><i style="width:${Math.max(6,x[1]/pmax*100)}%"></i><b>${x[1]}</b></div>`}).join("")}</div>
 <div class="card statcard"><h3>Most common first names</h3>${top.map(function(x){return `<div class="nm"><span>${esc(x[0])}</span><b>${x[1]}</b></div>`}).join("")}</div>`;
}
drawStats();

// ---------- share ----------
var SHARE_URL="https://jbexten89.github.io/Bexten-Family-Explorer/";
(function(){var sh=document.getElementById("share");
 function open(){sh.hidden=false;document.body.classList.add("modal")}
 function close(){sh.hidden=true;document.body.classList.remove("modal")}
 document.getElementById("sharebtn").addEventListener("click",open);
 sh.addEventListener("click",function(e){if(e.target===sh||e.target.closest("[data-close]"))close()});
 document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!sh.hidden)close()});
 document.getElementById("share-go").addEventListener("click",function(){if(navigator.share){navigator.share({title:"The Bexten Family Explorer",text:"Our family tree, maps and story",url:SHARE_URL}).catch(function(){})}else{location.href="mailto:?subject="+encodeURIComponent("The Bexten Family Explorer")+"&body="+encodeURIComponent(SHARE_URL)}});
 document.getElementById("share-copy").addEventListener("click",function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(SHARE_URL):Promise.reject()).then(function(){b.textContent="Copied"},function(){b.textContent=SHARE_URL});setTimeout(function(){b.textContent="Copy link"},2500)});
})();

// ---------- story audio ----------
(function(){var btn=document.getElementById("listen");if(!btn)return;
 if(!("speechSynthesis" in window)){btn.hidden=true;return}
 var synth=window.speechSynthesis,queue=[],idx=0,state="idle",voice=null,cur=null;
 function pickVoice(){var v=synth.getVoices().filter(function(x){return /^en(-|_)US/i.test(x.lang)});voice=v.find(function(x){return /enhanced|premium|natural/i.test(x.name)})||v.find(function(x){return /Samantha|Ava|Allison|Google US/i.test(x.name)})||v[0]||null}
 pickVoice();if(synth.onvoiceschanged!==undefined)synth.onvoiceschanged=pickVoice;
 function setBtn(s){state=s;btn.classList.toggle("on",s!=="idle");btn.querySelector("span").textContent=s==="playing"?"Pause":s==="paused"?"Resume":"Listen";btn.querySelector("svg").innerHTML=s==="playing"?'<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>':'<path d="M8 5v14l11-7z"/>'}
 function mark(el){if(cur)cur.classList.remove("reading");cur=el;if(el){el.classList.add("reading");var r=el.getBoundingClientRect();if(r.top<120||r.bottom>innerHeight-120)el.scrollIntoView({block:"center",behavior:"smooth"})}}
 function chapter(){var hs=[].slice.call(document.querySelectorAll("#story-body h2"));var start=hs[0];hs.forEach(function(h){if(h.getBoundingClientRect().top<200)start=h});var els=[],n=start;while(n){if(n!==start&&n.tagName==="H2")break;if(/^(H2|H3|P)$/.test(n.tagName))els.push(n);else if(n.tagName==="UL"||n.tagName==="OL"||n.tagName==="BLOCKQUOTE")[].push.apply(els,n.querySelectorAll("li,p"));n=n.nextElementSibling}return els.filter(function(e){return e.textContent.trim()})}
 function next(){if(state!=="playing")return;if(idx>=queue.length){stop();return}var el=queue[idx++];mark(el);var u=new SpeechSynthesisUtterance(el.textContent.replace(/\s+/g," ").trim());if(voice)u.voice=voice;u.rate=0.95;u.onend=function(){if(state==="playing")next()};u.onerror=function(){if(state==="playing")next()};synth.speak(u)}
 function stop(){synth.cancel();mark(null);setBtn("idle")}
 btn.addEventListener("click",function(){if(state==="playing"){synth.pause();setBtn("paused");return}if(state==="paused"){synth.resume();setBtn("playing");return}synth.cancel();queue=chapter();idx=0;setBtn("playing");next()});
 window.addEventListener("hashchange",function(){if(state!=="idle"&&!/^#story/.test(location.hash))stop()});
})();
