// ---------- record checklist ----------
const RC_ITEMS=[
 ["birth","Birth",/birth record|birth certificate|birth register|baptism|christening/i,/^\s*(Born|Baptized)\b/i],
 ["parents","Parents",null,null],
 ["marriage","Marriage",/marriage|married|wedding|license/i,/\bMarried\b|\bmarried\b/],
 ["census","Census",/census/i,/census/i],
 ["immig","Immigration",/passenger|naturaliz|\bship\b|arriv/i,/Arrived|arrived|Came to|came to|immigrat|naturaliz|stowaway|Reached/],
 ["death","Death",/death|died|obituar/i,/\bDied\b|\bdied\b|Killed|killed/],
 ["burial","Burial",/grave|cemetery|burial|buried/i,/buried|Buried|Cemetery/]
];
const RC_ABROAD=/Germany|Westphalia|Baden|Württemberg|Hesse|Prussia|England|Nottinghamshire|Cambridge|Leiden|Holland|Netherlands|France|Palatinate/;
function rcRegion(f){const t=f.join(" ");return /Toledo|Ohio|Lucas County|Pioneer|Sylvania|Bryan/.test(t)?"oh":/Michigan|Monroe|Whiteford|Ottawa Lake|Detroit/.test(t)?"mi":/Virginia|Weston|Lewis County|Braxton|Harrison County|Doddridge|Barbour|Philippi|Clarksburg/.test(t)?"wv":/New Jersey|Piscataway|Massachusetts|Plymouth|Barnstable|Scituate|Pennsylvania|Philadelphia/.test(t)?"col":RC_ABROAD.test(t)?"eu":""}
const RC_HINT={
 birth:{oh:"Ohio county probate courts kept birth registers 1867–1908; later births are at the Ohio Department of Health.",mi:"Michigan counties recorded births from 1867; the county clerk holds them.",wv:"West Virginia county births from 1853 are free at West Virginia Vital Research Records (wvculture.org).",eu:"The home parish's church book (baptisms), on FamilySearch or at the diocese archive.",col:"Town and church records, and published family genealogies.",x:"A baptism record, family Bible or later record that gives the birth date."},
 parents:{x:"A death certificate, marriage record or baptism usually names the parents.",eu:"The baptism entry in the home parish's church book names both parents."},
 marriage:{oh:"The county probate court (Lucas County for Toledo) holds marriage records.",mi:"The county clerk; Michigan marriages 1867–1952 are also indexed on FamilySearch.",wv:"West Virginia county marriages from the 1780s are at West Virginia Vital Research Records (wvculture.org).",eu:"The church book of the bride's parish.",col:"Church and town records, and published family genealogies.",x:"County marriage records or a church register."},
 census:{x:"U.S. censuses 1790–1950 are free to search on FamilySearch."},
 immig:{x:"Passenger lists, and naturalization papers at the county court or the National Archives."},
 death:{oh:"Ohio death certificates 1908–1953 are free on FamilySearch; later deaths are in the Ohio Death Index and newspaper obituaries.",mi:"Michigan death records 1897–1952 are free on Michiganology.",wv:"West Virginia county deaths from 1853 are at West Virginia Vital Research Records (wvculture.org).",eu:"The parish burial register.",col:"Church and town records, gravestones and published genealogies.",x:"A death certificate, obituary or gravestone."},
 burial:{x:"Find a Grave and BillionGraves, or the cemetery office; obituaries usually name the cemetery."}
};
function rcTokens(n){const nick=(n.match(/[“"]([^”"]+)[”"]/)||[])[1];const w=n.replace(/[“"][^”"]*[”"]/g,"").replace(/\([^)]*\)/g,"").replace(/^Rev\.\s*/,"").trim().split(/\s+/).slice(0,-1).filter(x=>x.length>2&&!/\.$/.test(x));if(nick)w.push(nick);return w.map(x=>x.toLowerCase())}
function rcMine(lab,tok,all){const has=t=>tok.some(x=>t.toLowerCase().includes(x));const pos=[...lab.matchAll(/([A-Za-z]+)'s\b/g)];if(pos.length&&!pos.some(m=>has(lab.slice(Math.max(0,m.index-22),m.index+m[0].length))))return false;const ix=lab.match(/index:\s*([A-Z][a-z]+)/);if(ix&&!tok.includes(ix[1].toLowerCase()))return false;if(/obituar/i.test(lab)&&!has(lab))return false;return true}
function recordCheck(id){const d=D[id];if(!d)return[];const tok=rcTokens(d[0]),facts=d[2]||[],all=d[0].replace(/[“”"().]/g," ").toLowerCase().split(/\s+/).filter(Boolean),src=(SRC[id]||[]).filter(x=>rcMine(x[1],tok,all)),yrs=String(d[1]||"").match(/\d{4}/g)||[],b=+(yrs[0]||0),dd=+(yrs[1]||0);
 const born=facts.find(f=>/^\s*(Born|Baptized)/i.test(f))||"",abroad=RC_ABROAD.test(born)||id==="anthony";
 const reg=rcRegion(facts)||"x";const out=[];
 RC_ITEMS.forEach(([k,lab,sre,fre])=>{
  if(k==="immig"&&(!abroad||reg==="eu"))return;
  if(k==="census"&&(reg==="eu"||(dd&&dd<1790)||(!dd&&b&&b<1720)||(b&&b>1950)))return;
  let st=0,how="";
  if(k==="parents"){const n=[d[3],d[4]].filter(p=>p&&D[p]).length;st=n===2?2:n?1:0;how=n===2?"Both found":n?"One found":"Not found yet"}
  else{const rec=src.find(x=>sre.test(x[1])||(k==="census"&&x[0]==="census")||(k==="burial"&&x[0]==="grave"));
   const fact=facts.find(f=>fre.test(f))||(k==="burial"&&BURIED[id]?"y":"")||(k==="death"&&dd?"y":"")||(k==="birth"&&b?"y":"");
   if(rec){st=2;how="Record linked"}else if(fact){st=1;how="Known, record not linked yet"}else{st=0;how="Not found yet"}}
  const ff=k==="parents"?born:(facts.find(f=>fre&&fre.test(f))||""),r2=(k==="birth"||k==="parents")&&abroad?"eu":(rcRegion([ff])||reg);const hint=st<2?((RC_HINT[k][r2]||RC_HINT[k].x)):"";
  out.push({k,lab,st,how,hint})});return out}
function checklistHTML(id){const r=recordCheck(id);if(!r.length)return"";const done=r.filter(x=>x.st===2).length,next=r.find(x=>x.st===0)||r.find(x=>x.st===1);
 const ic=["○","◐","✓"];
 const strip=`<span class="rcstrip" aria-hidden="true">${r.map(x=>`<span class="rc${x.st}"><i>${ic[x.st]}</i><em>${esc({Immigration:"Immig.",Marriage:"Married"}[x.lab]||x.lab)}</em></span>`).join("")}</span>`;
 return`<details class="rchk"><summary><span class="rct">Record checklist</span>${strip}<span class="rcs">${done} of ${r.length} documented${next?` · next: ${esc(next.lab.toLowerCase())}`:""}</span></summary><ul>${r.map(x=>`<li class="rc${x.st}"><span class="rci" aria-hidden="true">${ic[x.st]}</span><span><b>${esc(x.lab)}</b> <i>${esc(x.how)}</i>${x.hint?`<small>Where to look: ${esc(x.hint)}</small>`:""}</span></li>`).join("")}</ul><p class="note">✓ a record is linked in Sources · ◐ known from other records, but its own record isn't linked yet · ○ not found yet.</p></details>`}
function surnameHTML(id){const n=D[id][0];let s=/Fitz Randolph/.test(n)?"Fitz Randolph":null;if(!s){const w=n.replace(/[“"][^”"]*[”"]/g,"").replace(/\([^)]*\)/g,"").replace(/^Rev\.\s*/,"").trim().split(/\s+/);let l=w[w.length-1];if(/^(Jr\.?|Sr\.?)$/.test(l))l=w[w.length-2];s=w.length>1?l:null}
 const m=s&&SURN[s];if(!m)return"";return`<div class="sname"><b>The name ${esc(s)}</b> <span>${esc(m[0])}</span><p>${esc(m[1])}${m[2]?" <em>Not certain.</em>":""}</p></div>`}
const _afterPerson0=afterPerson;
afterPerson=function(id){_afterPerson0(id);if(id==="kids"||!D[id])return;const box=document.getElementById("focus");
 const at=box.querySelector(".recs")||box.querySelector(".srcs");const h=surnameHTML(id)+checklistHTML(id);
 if(at)at.insertAdjacentHTML("beforebegin",h);else box.insertAdjacentHTML("beforeend",h)};
