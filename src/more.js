
// ---------- relationship, sources and burials ----------
const FS="https://www.familysearch.org/ark:/61903/1:1:",FT="https://www.familysearch.org/tree/person/details/",DCR="https://doddridgecountyroots.com/bk6html/";
const L={
 fgTony:["grave","Find a Grave memorial","https://www.findagrave.com/memorial/199974407/anthony-joseph-bexten","Grave photos"],
 fgBetty:["grave","Find a Grave memorial","https://www.findagrave.com/memorial/199973502/betty-althea-bexten","Grave photos"],
 fgNelson:["grave","Find a Grave memorial","https://www.findagrave.com/memorial/155169424/nelson_a-bexten","Grave photos"],
 fgAnthony:["grave","Find a Grave memorial","https://www.findagrave.com/memorial/155168093/anthony_h_joseph-bexten","Grave photos"],
 fgRosa:["grave","Find a Grave memorial","https://www.findagrave.com/memorial/155168127/rosa_a-bexten","Grave photos"],
 wed:["news","Toledo Blade: marriage license and wedding announcement, Dec 1954"],
 eleanor:["news","Eleanor M. Bexten obituary, 2020 (Thompson-Geesey Funeral Homes)","https://www.thethompsonfuneralhome.com/obituaries/eleanor-bexten"],
 c1940b:["census","1940 census, Weston, West Virginia (Bonnell household)",FS+"K7CG-JP1","1940 census page"],
 genObit:["news","Toledo Blade: Genevieve Bonnell Rosentreter obituary, Oct 8, 1990, p. 12"],
 mar1928:["church","Nelson Bexten and Caroline Smith marriage index, 1928, Lucas County",FS+"2Q4Q-DN3","Marriage index, 1928"],
 dcAnthony:["cert","Anthony Bexten's Ohio death certificate, 1950 (Nelson was the informant)",FS+"X62J-86G","Death certificate, 1950"],
 obAnthony:["news","Toledo Blade: Anthony Bexten obituary, Jan 9, 1950, p. 19, and death notices"],
 c1900b:["census","1900 census, Whiteford Township, Michigan (Bexten household)",FS+"MS9F-316","1900 census page"],
 c1910b:["census","1910 census, Whiteford, Michigan",FS+"MLYC-CKZ","1910 census page"],
 c1920b:["census","1920 census, Whiteford Township (Westphalia named as birthplace)",FS+"MZQV-L8L","1920 census page"],
 stowaway:["family","Family story told by Tony Bexten"],
 dcRosa:["cert","Rosa Bexten's Michigan death certificate, 1945",FS+"KFQF-1X2","Death certificate, 1945"],
 obRosa:["news","Toledo Blade: Rosa Bexten obituary, Aug 21, 1945, p. 9"],
 stjoe:["church","St. Joseph Church, Sylvania: family register (FamilySearch film 004342389)","https://www.familysearch.org/en/search/catalog/koha:1046109"],
 cards:["census","Monroe County, Michigan genealogy card file: 1870 and 1880 census cards for the Grafs"],
 dcHerbert:["cert","Herbert H. Smith's Ohio death certificate, 1949",FS+"X6RH-ZN1","Death certificate, 1949"],
 obHerbert:["news","Toledo Blade: Herbert H. Smith obituary, June 4, 1949, p. 6"],
 c1900s:["census","1900 census, Toledo (Frank Smith household)",FS+"MMDN-K1D","1900 census page"],
 c1950m:["census","1950 census, Toledo (Mary A. Smith)",FS+"6JKT-C6RG","1950 census page"],
 kidsRec:["cert","Her children's marriage and Social Security records (maiden name Miller)"],
 dcFrank:["cert","Frank J. Smith's Ohio death certificate, 1931",FS+"XD1F-5F9","Death certificate, 1931"],
 obFrank:["news","Toledo Blade: “Illness Is Fatal to Frank Smith,” March 18, 1931, p. 24"],
 dcCarrie:["cert","Carrie Smith's Ohio death certificate, 1945"],
 fsShared:["tree","FamilySearch shared tree (volunteer-built, not yet checked)"],
 dcJoseph:["cert","Joseph Graff's Michigan death certificate, 1905 (Michiganology)","https://michigan.access.preservica.com/uncategorized/IO_6a5df06a-6507-4978-9773-50ac7272afb0/","Death certificate, 1905"],
 obJoseph:["news","Toledo Blade: “Joseph Graff Met His Death,” Dec 11, 1905, p. 4"],
 c1900g:["census","1900 census, Whiteford Township (Joseph Graf)",FS+"MS9F-31Z","1900 census page"],
 dcBrig:["cert","Bridgette Graff's Michigan death certificate, 1914 (Michiganology)","https://michigan.access.preservica.com/uncategorized/IO_b0e9f3a2-038b-4443-91b5-e82425d05594/","Death certificate, 1914"],
 wvdc:p=>["cert",p+"'s West Virginia death certificate"],
 mar:(t)=>["church",t],
 drFloyd:["book","Doddridge County Roots: Floyd Neely Bonnell",DCR+"f19455.html"],
 drJB:["book","Doddridge County Roots: John Bonnell and Rulanah Fitz Randolph",DCR+"f20157.html"],
 drSam:["book","Doddridge County Roots: Samuel Fitz Randolph",DCR+"f19355.html"],
 drEJG:["book","Doddridge County Roots: Elizabeth Jane Goldsborough",DCR+"f48087.html"],
 efr:["book","Descendants of Edward Fitz Randolph (1929)","https://archive.org/stream/descendantsofedw00chri/descendantsofedw00chri_djvu.txt","Family genealogy (1929 book)"],
 werEdw:["tree","WeRelate: Edward Fitz Randolph","https://www.werelate.org/wiki/Person:Edward_Fitz_Randolph_(7)"],
 anderson:["book","Robert Charles Anderson's sketch of Thomas Blossom (Great Migration study)","https://www.robinrichmond.com/familymedia/rr/ftm/NEHGS%20Bio.htm"],
 wtBlossom:["tree","WikiTree: Blossom family","https://www.wikitree.com/genealogy/Blossom-Family-Tree-5"],
 monroe:["book","History of Monroe County, W.Va. (1916): Beamer sketch","http://genealogytrails.com/wva/monroe/bios_b.html","County history (1916)"],
 fsBohmer:["tree","FamilySearch shared tree: Johann Adam Böhmer",FT+"G9C6-KWQ"],
 fsJacob:["tree","FamilySearch shared tree: Jacob Forinash",FT+"KZ9T-MCK"],
 fsBetty:["tree","FamilySearch shared tree: Betty Althea Bonnell",FT+"G464-KK8"],
 fsNelson:["tree","FamilySearch shared tree: Nelson A. Bexten",FT+"MCNZ-GFK"],
 fsEW:["tree","FamilySearch shared tree: Elizabeth Waggoner",FT+"LR5F-FNL"],
 wtEW:["tree","WikiTree: Elizabeth (Waggoner) Hardman","https://www.wikitree.com/wiki/Waggoner-1229"],
 wtPH:["tree","WikiTree: Peterman Hardman","https://www.wikitree.com/wiki/Hardman-876"],
 sarJW:["mil","SAR patriot record: John Waggoner (P-338764)","https://sarpatriots.sar.org/patriot/display/338764"],
 pension:["mil","John Waggoner's Revolutionary War pension file, S7824","https://revwarapps.org/s7824.pdf","Pension file, 1832"],
 werMW:["tree","WeRelate: Margaret Waggoner","https://www.werelate.org/wiki/Person:Margaret_Waggoner_(10)"],
 onview:["book","West Virginia History OnView: the Waggoner home on Jesse's Run","https://wvhistoryonview.org/catalog/030546","Photo: Waggoner home, Jesse's Run"],
 werWW:["tree","WeRelate: Wilhelm Waggoner","https://www.werelate.org/wiki/Person:Wilhelm_Waggoner_%281%29"],
 rwWW:["tree","RootsWeb: Descendants of Wilhelm Waggoner","http://freepages.rootsweb.com/~mdmalone/genealogy/Surname%20Pages/waggoner.htm"],
 sarSFR:["mil","SAR patriot record: Samuel Fitz Randolph (P-158994)","https://sarpatriots.sar.org/patriot/display/158994"],
 onMach:["photo","WV History OnView: Macpelah Cemetery, Weston, 1910 photo","https://onview.lib.wvu.edu/catalog/037468","Photo: Machpelah Cemetery, 1910"],
 sdb:["book","History of Seventh Day Baptists in West Virginia (1905), with a photo of Samuel and Margaret's graves at Salem","https://archive.org/details/historyofseventh00rand","Photo of their graves (1905 book)"],
 trees:["tree","Published family histories and online trees"]
};
const W=L.wvdc,M=L.mar;
const SRC={
 tony:[L.fgTony,L.wed,L.eleanor],
 betty:[L.fgBetty,L.c1940b,L.wed,L.genObit,L.fsBetty],
 nelson:[["cert","Nelson's Michigan birth record, Whiteford, June 3, 1903 (Ancestry)","https://www.ancestry.com/search/collections/62374/records/2687836"],L.fgNelson,L.mar1928,L.dcAnthony,L.fsNelson,["cert","Social Security records (birth date June 3, 1903)"]],
 caroline:[L.mar1928,L.obHerbert,["grave","Find a Grave memorial","https://www.findagrave.com/memorial/155169473/caroline-m-bexten","Grave photos"],["census","1920 census, Toledo (Herbert H. Smith household)","https://www.familysearch.org/ark:/61903/1:1:MD58-BB1","1920 census page"]],
genevieve:[L.genObit,["church","Indiana marriage record: John Rosentreter and Genevieve Bonnell, 1957","https://www.familysearch.org/ark:/61903/1:1:85VB-CZW2","Marriage record, 1957"],["census","1910 census, Holly District, Braxton County (Beamer household)","https://www.familysearch.org/ark:/61903/1:1:MPNW-H9N","1910 census page"],["cert","Braxton County, W.Va. birth record, 1906"],L.c1940b],
 anthony:[L.dcAnthony,["church", "Baptism index: Caspar Anton Bexte, Stromberg (St. Lambertus), July 1868", "https://www.familysearch.org/ark:/61903/1:1:NRZR-P31", "Possible baptism, 1868"], ["church", "Marriage index: Theodor Hermann Bexte and Catharina Ruedingloh, St. Vit, 1860", "https://www.familysearch.org/ark:/61903/1:1:JHDN-LZN"],L.obAnthony,L.fgAnthony,L.c1900b,L.c1910b,L.c1920b,L.stowaway],
 rosa:[L.dcRosa,L.obRosa,L.fgRosa,L.stjoe,L.c1900b,L.cards],
 herbert:[["cert","Michigan marriage record, Monroe, Feb 3, 1908 (Ancestry; as Henry H. Smith)","https://www.ancestry.com/search/collections/9093/records/816678"],L.dcHerbert,L.obHerbert,L.c1900s],
 mamie:[["cert","Michigan marriage record, Monroe, Feb 3, 1908 (Ancestry; names her parents)","https://www.ancestry.com/search/collections/9093/records/3627954"],["cert","Sylvester G. Smith's birth record, Toledo, March 7, 1908 (mother: Minnie Miller)","https://www.familysearch.org/ark:/61903/1:1:X6L6-97W"],L.c1950m,L.kidsRec,L.obHerbert,["census","1920 census, Toledo","https://www.familysearch.org/ark:/61903/1:1:MD58-BB1","1920 census page"],["census","1930 census, Toledo","https://www.familysearch.org/ark:/61903/1:1:X44C-VMM","1930 census page"],["census","1940 census, Toledo","https://www.familysearch.org/ark:/61903/1:1:KW8R-V33","1940 census page"]],
 johnwj:[W("John W. Bonnell"),M("Lewis County marriage record, 1896"),["census","1900 census, Collins Settlement, Lewis County","https://www.familysearch.org/ark:/61903/1:1:M9C5-J76","1900 census page"],["census","1910 census, Lewis County","https://www.familysearch.org/ark:/61903/1:1:MPNT-936","1910 census page"],["census","1920 census, Lewis County","https://www.familysearch.org/ark:/61903/1:1:MNKK-CZ6","1920 census page"]],
 amanda:[W("Amanda Bonnell"),["cert","Lewis County birth record, 1876"],M("Lewis County marriage record, 1896")],
 calvin:[W("Calvin B. Beamer"),["cert","Lora Pearl Firth's West Virginia death record, 1953 (mother: Elizabeth Gillespie)","https://www.familysearch.org/ark:/61903/1:1:NMXN-WYF","Lora's death record"],["grave","Find a Grave index: Lewis County Memorial Gardens","https://www.familysearch.org/ark:/61903/1:1:QVL1-LFF6"],["census","1910 census, Holly District, Braxton County","https://www.familysearch.org/ark:/61903/1:1:MPNW-H9N","1910 census page"],M("Braxton County marriage record, 1891"),["cert","Genevieve's Braxton County birth record, 1906"]],
 cora:[M("Braxton County marriage record, 1891"),["cert","Genevieve's Braxton County birth record, 1906"],L.trees],
 onal:[W("Onal Bonnell"),L.c1940b,L.onMach,["census","1910 census, Lewis County (his parents’ household)","https://www.familysearch.org/ark:/61903/1:1:MPNT-936","1910 census page"]],
 herman:[L.dcAnthony,L.c1920b,["church", "Baptism index: Caspar Anton Bexte, Stromberg (St. Lambertus), July 1868", "https://www.familysearch.org/ark:/61903/1:1:NRZR-P31", "Possible baptism, 1868"], ["church", "Marriage index: Theodor Hermann Bexte and Catharina Ruedingloh, St. Vit, 1860", "https://www.familysearch.org/ark:/61903/1:1:JHDN-LZN"]],
 joseph:[L.dcJoseph,L.obJoseph,L.c1900g,L.cards],
 brigitta:[L.dcBrig,L.cards,L.stjoe],
 floyd:[L.drFloyd,W("John W. Bonnell")],
 elizabethg:[L.drEJG,M("Taylor County marriage index, 1863"),W("John W. Bonnell")],
 johnmay:[W("John May"),M("Braxton County marriage record, 1872"),W("Amanda Bonnell")],
 sarah:[W("Sarah Johnson May"),M("Braxton County marriage record, 1872"),W("Amanda Bonnell")],
 andrew:[W("Calvin B. Beamer"),M("Greenbrier County marriage record, 1845"),L.monroe],
 rebecca:[W("Calvin B. Beamer"),M("Greenbrier County marriage record, 1845")],
 william:[M("Braxton County marriage record, 1868"),L.trees],
 cynthia:[M("Braxton County marriage record, 1868"),L.wtEW,L.trees],
 jamesg:[L.drEJG],
 charles:[M("Harrison County marriage record, 1829"),M("Doddridge County marriage records, 1872 and 1877 (name his parents)"),["cert","Floyd Bonnell's West Virginia death record"]],
 janemartin:[M("Harrison County marriage record, 1829")],
 johnrmay:[W("John May"),M("Braxton County marriage record, 1842")],
 jemimah:[W("John May"),M("Braxton County marriage record, 1842")],
 phelden:[W("Sarah Johnson May")],
 nancywine:[W("Sarah Johnson May")],
 philipjr:[L.monroe,M("Monroe County marriage record, 1817")],
 elspeth:[L.monroe],
 charleservin:[M("Greenbrier County marriage record, 1823"),L.trees],
 catharine:[M("Greenbrier County marriage record, 1823"),L.trees],
 isaac:[M("Lewis County marriage record, 1841"),L.fsJacob,L.trees],
 millie:[M("Lewis County marriage record, 1841"),L.trees],
 johng:[M("Lewis County marriage record, 1838"),L.wtEW],
 malinda:[M("Lewis County marriage record, 1838"),L.fsJacob],
 johnbonnell:[M("Charles Bonnell's 1872 and 1877 marriage records"),L.drJB,["mil","New York State Archives: Revolutionary War accounts and claims index"]],
 rulanah:[L.drJB,L.sarSFR,L.efr],
 philipsr:[L.monroe,L.fsBohmer],
 elizabethb:[L.monroe],
 jacob:[L.fsJacob,L.trees],
 catherinecrites:[L.fsJacob],
 hannah:[L.fsJacob],
 johndexter:[L.wtEW,L.wtPH,L.trees],
 elizabethw:[L.pension,L.wtEW,L.fsEW,L.onview],
 samuel:[L.sarSFR,L.drSam,L.efr,L.sdb],
 margaretfr:[L.drSam,L.efr,L.sdb],
 johannadam:[L.fsBohmer],
 charlesf:[L.trees],
 peterman:[L.wtPH,L.wtEW],
 charlotte:[L.wtPH],
 johnw:[L.sarJW,L.pension,L.werMW,L.onview],
 margaretb:[L.werMW,L.pension],
 jonathan:[L.efr],
 david:[L.efr],
 thomasfr:[L.efr],
 edward:[L.efr,L.werEdw,["church","Sutton-in-Ashfield parish register, 1607 baptism"]],
 elizblossom:[L.anderson,L.efr,L.wtBlossom],
 thomasb:[L.anderson,L.wtBlossom],
 annee:[L.anderson],
 edwardsr:[L.efr,L.werEdw],
 franceshowes:[L.efr,L.werEdw],
 wilhelm:[L.werWW,L.rwWW],
 agnesa:[L.werWW,L.rwWW],
 frankj:[L.dcFrank,L.obFrank,L.c1900s],
 carrie:[L.dcCarrie,L.c1900s,L.obFrank],
 wendelL:[L.dcCarrie,L.fsShared],
 maryL:[L.dcCarrie,L.fsShared],
 wendell:[L.dcFrank,L.fsShared,["church","Monroe County, Michigan deed, July 1869 (recorded 1873)","https://www.familysearch.org/ark:/61903/3:1:3Q9M-C37K-N3K8-S","Monroe deed, 1869"]],
 barbara:[L.dcFrank,L.fsShared,["church","Monroe County, Michigan deed, July 1869 (recorded 1873)","https://www.familysearch.org/ark:/61903/3:1:3Q9M-C37K-N3K8-S","Monroe deed, 1869"]],
 georgeg:[L.dcJoseph],
 johnreger:[L.dcBrig],
 samuelbonnett:[L.trees],
 jacques:[L.trees],
 marie:[L.trees]
};

const STYPE={photo:"Photo",cert:"Record",census:"Census",news:"Newspaper",grave:"Grave",church:"Church or court",book:"Published",tree:"Online tree",mil:"Military",family:"Family story"};

const GRAVES=[
 {id:"floral",name:"Floral Grove Cemetery",town:"Pioneer, Ohio",ll:[41.6651,-84.5461],who:["tony","betty"]},
 {id:"stjoe",name:"St. Joseph Cemetery",town:"Sylvania, Ohio",ll:[41.7104,-83.6995], who:["nelson","caroline","anthony","rosa","brigitta"],note:"On Ravine Drive, beside Ravine Cemetery. Joseph Graf was buried in Sylvania in 1905, very likely here"},
 {id:"ohmp",name:"Ottawa Hills Memorial Park",town:"Toledo, Ohio",ll:[41.6806,-83.6408],who:["genevieve"],note:"4210 W. Central Ave."},
 {id:"carmel",name:"Mount Carmel Cemetery",town:"Toledo, Ohio",ll:[41.6861,-83.5453],who:["herbert","frankj","carrie"],note:"15 E. Manhattan Blvd."},
 {id:"machpelah",name:"Machpelah Cemetery",town:"Weston, West Virginia",ll:[39.0487,-80.4643],who:["onal"]},
 {id:"masonic",name:"Weston Masonic Cemetery",town:"Weston, West Virginia",ll:[39.0224,-80.4202],who:["johnwj","amanda","calvin"],note:"Now Lewis County Memorial Gardens, Chapman Ave."},
 {id:"salem",name:"Seventh Day Baptist Cemetery",town:"Salem, West Virginia",ll:[39.2829,-80.5654],who:["samuel","margaretfr"],note:"Pin is approximate: the old church graveyard in Salem",approx:1}
];
const BURIED={};GRAVES.forEach(g=>g.who.forEach(p=>BURIED[p]=g));
const OHIO_TRIP="https://www.google.com/maps/dir/?api=1&travelmode=driving&destination="+GRAVES[3].ll.join(",")+"&waypoints="+encodeURIComponent([GRAVES[0],GRAVES[1],GRAVES[2]].map(g=>g.ll.join(",")).join("|"));
const gmapUrl=g=>`https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${g.ll.join(",")}`;
const amap=g=>`https://maps.apple.com/?daddr=${g.ll.join(",")}&q=${encodeURIComponent(g.name+", "+g.town)}`;

function allPaths(t){const out=[];(function go(p){const h=p[p.length-1];if(h===t){out.push(p);return}const d=D[h];if(!d||p.length>16)return;[d[3],d[4]].forEach(x=>{if(x&&D[x])go(p.concat(x))})})(["kids"]);return out}
function ordn(n){const s=["th","st","nd","rd"],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0])}
function relName(path){const g=path.length-1,id=path[g],ch=path[g-1],male=D[ch][3]===id;const b=male?"father":"mother";if(g===1)return male?"Father":"Mother";if(g===2)return "Grand"+b;if(g===3)return "Great-grand"+b;return ordn(g-2)+" great-grand"+b}
function afterPerson(id){
 if(id==="kids"||!D[id])return;
 const box=document.getElementById("focus");const meta=box.querySelector(".meta");
 const ps=allPaths(id);
 if(ps.length&&meta){const g=ps[0].length-1;let h=`<div class="rel"><b>${relName(ps[0])}</b> of Tony and Althea's children${g>1?` · ${g} generations back`:""}${ps.length>1?` · <span class="twice">related ${ps.length===2?"twice":ps.length+" ways"}</span>`:""}</div>`;
  if(g>1)h+=`<details class="chain"><summary>How they're connected</summary>${ps.map(p=>`<ol>${p.slice(1).reverse().map(k=>`<li${k===id?' class="me"':""}>${k===id?esc(D[k][0]):`<button type="button" data-id="${k}">${esc(D[k][0])}</button>`}<span>${esc(D[k][1]||"")}</span></li>`).join("")}<li class="end">Tony and Althea's children</li></ol>`).join('<p class="or">and also</p>')}</details>`;
  meta.insertAdjacentHTML("afterend",h)}
 const gr=BURIED[id];
 if(gr)box.insertAdjacentHTML("beforeend",`<a class="buried" href="#map/g-${gr.id}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/></svg><span>Buried at <b>${esc(gr.name)}</b>, ${esc(gr.town)}</span></a>`);
 box.insertAdjacentHTML("beforeend",sibsHTML(id));
 const s=SRC[id];
 const tiles=(s||[]).filter(x=>x[3]&&x[2]);
 if(tiles.length){const host=u=>u.includes("familysearch")?"FamilySearch":u.includes("michigan.access")?"Michiganology":u.includes("findagrave")?"Find a Grave":u.includes("archive.org")?"Internet Archive":u.includes("revwarapps")?"Southern Campaigns pensions":u.includes("wvu.edu")||u.includes("wvhistoryonview")?"WV History OnView":u.includes("genealogytrails")?"Genealogy Trails":"Web";
  const ico={cert:'<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h4"/>',census:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M4 15h16M10 4v16"/>',grave:'<path d="M7 21V9a5 5 0 0 1 10 0v12"/><path d="M5 21h14M10 12h4M12 10v5"/>',photo:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-8 8"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/>'};
  box.insertAdjacentHTML("beforeend",`<div class="recs"><h4>See the records</h4><div class="rtiles">${tiles.map(([t,lab,u,tl])=>`<a class="rtile" href="${u}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true">${ico[t]||ico.cert}</svg><b>${esc(tl)}</b><span>${host(u)} ↗</span></a>`).join("")}</div></div>`)}
 if(s&&s.length)box.insertAdjacentHTML("beforeend",`<details class="srcs"><summary>Sources <span>${s.length}</span></summary><ul>${s.map(([t,lab,u])=>`<li><span class="st st-${t}">${STYPE[t]}</span>${u?`<a href="${u}" target="_blank" rel="noopener">${esc(lab)}</a>`:`<span>${esc(lab)}</span>`}</li>`).join("")}</ul><p class="note">Linked FamilySearch records need a free account. Newspaper articles are in the Toledo Blade archive at the Toledo-Lucas County Public Library.</p></details>`);
}
function drawGraves(){
 const el=document.getElementById("graves-list");if(!el)return;
 el.innerHTML=GRAVES.map(g=>`<div class="card grave" id="g-${g.id}"><h3>${esc(g.name)}</h3><p class="town">${esc(g.town)}${g.note?` · ${esc(g.note)}`:""}</p><div class="who">${g.who.map(p=>`<button type="button" data-person="${p}"><span class="dot" style="background:${col(p)}"></span>${esc(D[p][0])}<small>${esc(D[p][1])}</small></button>`).join("")}</div><a class="dir" data-dir="${g.id}" href="${amap(g)}" target="_blank" rel="noopener">Directions</a></div>`).join("")
 +`<div class="card grave"><h3>Weston, West Virginia</h3><p class="town">Cemetery not yet identified</p><div class="who">${["johnmay","sarah"].map(p=>`<button type="button" data-person="${p}"><span class="dot" style="background:${col(p)}"></span>${esc(D[p][0])}<small>${esc(D[p][1])}</small></button>`).join("")}</div></div>`;
 document.getElementById("trip").href=OHIO_TRIP;
}
document.getElementById("graves-list").addEventListener("click",e=>{const b=e.target.closest("[data-person]");if(b){showPerson(b.dataset.person);location.hash="#tree"}});
let gmap=null;
function initGraveMap(){
 if(gmap||document.getElementById("view-map").hidden)return;
 if(!window.L){if(!document.getElementById("lf-js")){const c=document.createElement("link");c.rel="stylesheet";c.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(c);const s=document.createElement("script");s.id="lf-js";s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";s.onload=initGraveMap;s.onerror=()=>{document.getElementById("gmap").innerHTML='<p class="note" style="padding:16px">The map needs an internet connection.</p>'};document.head.appendChild(s)}return}
 gmap=window.L.map("gmap",{scrollWheelZoom:false,attributionControl:true});
 window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(gmap);
 const pts=[];GRAVES.forEach(g=>{pts.push(g.ll);const c=col(g.who[0]);window.L.circleMarker(g.ll,{radius:8,color:"#07080A",weight:2,fillColor:c,fillOpacity:1}).addTo(gmap).bindPopup(`<b>${esc(g.name)}</b><br>${esc(g.town)}<br>${g.who.map(p=>esc(D[p][0])).join("<br>")}<br><a data-dir="${g.id}" href="${amap(g)}" target="_blank" rel="noopener">Directions</a>`)});
 const oh=GRAVES.filter(g=>g.ll[0]>41).map(g=>g.ll);gmap.fitBounds(oh,{padding:[30,30]});
 document.querySelectorAll("[data-gfit]").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.gfit;gmap.fitBounds(k==="oh"?oh:k==="wv"?GRAVES.filter(g=>g.ll[0]<40).map(g=>g.ll):pts,{padding:[30,30]});document.querySelectorAll("[data-gfit]").forEach(x=>x.setAttribute("aria-pressed",x===b))}));
}
drawGraves();
function setMapSub(){const sub=location.hash.split("/")[1]||"";const g=sub==="graves"||sub.startsWith("g-");document.getElementById("gv").hidden=!g;document.getElementById("mig").hidden=g;document.getElementById("seg-gv").setAttribute("aria-selected",g);document.getElementById("seg-mig").setAttribute("aria-selected",!g);if(g){setTimeout(()=>{initGraveMap();if(gmap)gmap.invalidateSize()},60)}}
window.addEventListener("hashchange",setMapSub);setMapSub();
function centerGrave(){const h=location.hash.split("/")[1];if(!(h&&h.startsWith("g-")))return;const c=document.getElementById(h);if(!c)return;c.classList.remove("flash");void c.offsetWidth;c.classList.add("flash");
 const go=()=>{const app=document.getElementById("app"),r=c.getBoundingClientRect(),hd=document.querySelector("header"),top=hd?hd.getBoundingClientRect().bottom:0,nav=document.querySelector("nav"),bot=nav?nav.getBoundingClientRect().top:innerHeight;
  const mid=top+(bot-top)/2;app.scrollTo({top:app.scrollTop+r.top+r.height/2-mid,behavior:"auto"})};setTimeout(go,80);setTimeout(go,350)}
window.addEventListener("hashchange",centerGrave);setTimeout(centerGrave,300);

// ---------- directions: Apple or Google ----------
function mapsPref(){try{return localStorage.getItem("bexten-maps")||""}catch(e){return""}}
function setMapsPref(v){try{v?localStorage.setItem("bexten-maps",v):localStorage.removeItem("bexten-maps")}catch(e){}const sel=document.getElementById("mapsapp");if(sel)sel.value=v||""}
function openDir(g,app){window.open(app==="google"?gmapUrl(g):amap(g),"_blank","noopener");setTimeout(()=>{const f=document.activeElement;if(f&&f.blur)f.blur()},0)}
function chooseMaps(g){const old=document.getElementById("mapchoose");if(old)old.remove();
 document.body.insertAdjacentHTML("beforeend",`<div class="mapchoose" id="mapchoose" role="dialog" aria-modal="true" aria-label="Open directions in"><div class="mcbox"><h3>Directions to ${esc(g.name)}</h3><button type="button" class="btn" data-app="apple">Apple Maps</button><button type="button" class="btn" data-app="google">Google Maps</button><label class="mcrem"><input type="checkbox" id="mcrem" checked> Always use this app</label><button type="button" class="mccancel" data-app="">Cancel</button></div></div>`);
 const el=document.getElementById("mapchoose");el.addEventListener("click",e=>{const b=e.target.closest("[data-app]");if(!b&&e.target!==el)return;const app=b?b.dataset.app:"";if(app){if(document.getElementById("mcrem").checked)setMapsPref(app);openDir(g,app)}el.remove()})}
document.addEventListener("click",e=>{const a=e.target.closest("[data-dir]");if(!a)return;const g=GRAVES.find(x=>x.id===a.dataset.dir);if(!g)return;e.preventDefault();const p=mapsPref();if(p)openDir(g,p);else chooseMaps(g)});
(function(){const sel=document.getElementById("mapsapp");if(!sel)return;sel.value=mapsPref();sel.addEventListener("change",()=>setMapsPref(sel.value))})();
