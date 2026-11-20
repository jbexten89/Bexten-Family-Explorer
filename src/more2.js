
// ---------- brothers and sisters (cousins) ----------
const SIBS={
 tony:{list:[["Joanne Lucille (later Johnson)","1934–2020"],["Carl, called Carly","died as a baby, 1936"],["A brother","born about 1939"],["Patricia Ann (later Delcamp)","1942–2024"]]},
 betty:{list:[["Robert Eugene Bonnell","1927–2007"],["Wallace L. Bonnell","1928–1983"],["Charles Eddie Bonnell","1931–1933"]]},
 nelson:{list:[["Joseph Herman Bexten","1900–1989"],["Mary Theresia (Mrs. Arnold C. Miller)","1905–1992"],["Lawrence Arnold Bexten","1909–1999"]]},
 caroline:{list:[["Sylvester G. Smith","born March 7, 1908"],["Gertrude, “Aunt DoDo” (later Lentz)","born about 1912"],["Lucille M. (later Boutwell)","born 1919"],["Kathryn (later Brozozwicz)","born about 1921"],["Mildred, “Aunt PeeWee” (later Frelin)","born about 1924"],["Roland Smith","born about 1928"],["Al H. “Whitey” Smith","1930–2017"],["Frederick “Fritz” Smith","born about 1931"]],note:"The 1920, 1930 and 1940 censuses name these eight and Caroline: nine children. Herbert's 1949 obituary counts ten and names a son Herbert, who may be Al under another name or a tenth child."},
 genevieve:{list:[["Blanche Jane (later Beall)","born about 1893"],["Raymond B. Beamer","born about 1898"],["Bertha F. Beamer","born about 1899"],["Vada I. Beamer","born about 1903"],["Lora Pearl (later Firth)","half-sister, 1885–1953"],["Bessie M. (later Davidson)","half-sister, died 1972"]],note:"From the 1910 census of Calvin and Cora's household in Braxton County, where a daughter of 3 indexed as “Verdie J.” is probably Genevieve. Lora and Bessie were daughters of Calvin's first wife, Elizabeth Gillespie."},
 onal:{list:[["Dorsey (Dorcie) Bonnell","born about 1896"],["Myrtle (later Murphy)","born about 1899"],["Dorothy Iva Bonnell","born about 1902"],["Mamie (later Paugh)","born about 1904"],["Ruth Loretta (later McIntosh)","born about 1909"],["Carl Bonnell","born about 1912"],["John Franklin Bonnell","twin, born about 1915"],["Joseph Cure Bonnell","twin, born about 1915"],["Earnest B. Bonnell","half-brother, born about 1887"],["Jesse N. Bonnell","half-brother, born about 1889"],["Retta G. Bonnell","half-sister, born about 1890"]],note:"From the 1900–1930 censuses of John W. Bonnell's household in Lewis County. The last three were children of John's first wife, Tabitha Jeffries."},
 herbert:{list:[["Frank Smith","of Toledo"],["Olive (Mrs. Carl Rise)","later St. Petersburg, Florida"],["Earl Smith","of Maumee"],["Mildred (Mrs. Leonard Ackerman)","of Toledo"]]},
 frankj:{list:[["Kate (Mrs. Collins)","of Detroit"],["Mrs. John Ranse","of Toledo"],["Mrs. John Conrad","of Toledo"],["Barbara (later Cullen)",""]],note:"Sisters named in Frank's 1931 obituary and records."},
 anthony:{list:[["Elisabeth Bexte","born 1860"],["Bernard and August Bexte","twins, born 1861"],["Johanna and Anna Antonia Bexte","twins, born 1863"],["Anna Sophia Bexte","born 1865"]],note:"Three sisters were still living in Germany when he died in 1950. If he is the Caspar Anton Bexte baptized at Stromberg in 1868 (a strong lead, not yet proven), these are his brothers and sisters from the Stromberg baptism books."},
 rosa:{list:[["Maria Jaeger","half-sister, born about 1859"],["Teresia (Tracy) Jaeger","half-sister, about 1861–1881"]],note:"Brigitta's daughters by her first husband. Both married into the Hecker family."},
 elizabethw:{list:[["Mary Waggoner","taken captive with her in 1792; home after 1795"],["Peter Waggoner","taken at about 6; found in 1812 living with the Shawnee"]],note:"Several other brothers and sisters were killed in the 1792 raid."},
 samuelbonnett:{list:[["Margaret Bonnet","b. 1725"],["Johann Adam Bonnet","b. 1726/27"],["Susanna Magdalena Bonnet","b. 1729"],["Christina Bonnet","b. 1731"],["John Martin Bonnet","b. 1733"],["Lewis Bonnett Sr.","b. 1737; married Anna Elizabeth Waggoner"]],note:"Two little sisters died on the 1733 voyage."},
 johnw:{list:[["Anna Elizabeth Waggoner","half-sister; married Lewis Bonnett Sr."]]}
};
const CORD=["","first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh"];
const genOf=id=>{const p=allPaths(id)[0];return p?p.length-1:0};
const cousinLine=g=>g===1?"Their children are first cousins of Tony and Althea's children.":g===2?"Their grandchildren are second cousins of Tony and Althea's children.":`Their descendants in the same generation as Tony and Althea's children are ${CORD[g]||ordn(g)} cousins.`;
function sibsHTML(id){const s=SIBS[id];if(!s)return"";return `<div class="sibs"><h4>Brothers and sisters</h4>${s.list.length?`<ul>${s.list.map(([n,y])=>`<li><b>${esc(n)}</b>${y?`<span>${esc(y)}</span>`:""}</li>`).join("")}</ul>`:""}${s.note?`<p class="note">${esc(s.note)}</p>`:""}<p class="cz">${cousinLine(genOf(id))}</p></div>`}
function drawCousins(){
 const ids=Object.keys(SIBS).sort((a,b)=>genOf(a)-genOf(b));let h="",last=0;
 ids.forEach(id=>{const g=genOf(id);if(g!==last){h+=`<h3 class="cgh">${(CORD[g]||ordn(g)).replace(/^./,c=>c.toUpperCase())} cousins</h3>`;last=g}
  const s=SIBS[id];h+=`<div class="card ccard"><button type="button" class="cwho" data-person="${id}"><span class="dot" style="background:${col(id)}"></span>${esc(CHN(id))}'s brothers and sisters<small>${esc(D[id][1])}</small></button>${s.list.length?`<ul>${s.list.map(([n,y])=>`<li>${esc(n)}${y?` <span>${esc(y)}</span>`:""}</li>`).join("")}</ul>`:""}${s.note?`<p class="note">${esc(s.note)}</p>`:""}</div>`});
 document.getElementById("cousins-list").innerHTML=h;
}
document.getElementById("cousins-list").addEventListener("click",e=>{const b=e.target.closest("[data-person]");if(b){showPerson(b.dataset.person);location.hash="#tree"}});
drawCousins();

// ---------- timeline ----------
// [year label, sort year, text, person id or "" for world history]
const TL=[
 ["1605",1605,"Thomas Blossom marries Anne Elsdon at St. Clement's, Cambridge","thomasb"],
 ["1607",1607,"Edward Fitz Randolph baptized at Sutton-in-Ashfield, Nottinghamshire","edward"],
 ["1607",1607.1,"Jamestown, the first lasting English colony, is founded in Virginia",""],
 ["1609",1609,"The Blossoms are with the Separatist congregation in Leiden, Holland","thomasb"],
 ["1620",1620,"The Mayflower lands at Plymouth",""],
 ["c.1620",1620.5,"Elizabeth Blossom is born in Leiden","elizblossom"],
 ["1629",1629,"Thomas Blossom reaches Plymouth Colony","thomasb"],
 ["1630",1630,"Edward Fitz Randolph comes to Massachusetts with the Winthrop Fleet","edward"],
 ["1633",1633,"Thomas Blossom dies in the Plymouth epidemic","thomasb"],
 ["1637",1637,"Edward Fitz Randolph marries Elizabeth Blossom at Scituate","edward"],
 ["1659",1659,"Thomas Fitz Randolph is born at Barnstable","thomasfr"],
 ["1692",1692,"The Salem witch trials in Massachusetts",""],
 ["1733",1733,"Jacques and Marie Bonnet land at Philadelphia on the Elizabeth; two daughters died on the voyage","jacques"],
 ["1738",1738,"Samuel Fitz Randolph is born at Piscataway, New Jersey","samuel"],
 ["1748",1748,"Wilhelm Waggoner lands at Philadelphia on the Patience and Margaret","wilhelm"],
 ["1751",1751,"John Waggoner is born at White Marsh, Pennsylvania","johnw"],
 ["c.1755",1755,"Wilhelm Waggoner is killed in a raid on the South Branch of the Potomac","wilhelm"],
 ["1761",1761,"Samuel and Margaret Fitz Randolph, first cousins, marry","samuel"],
 ["1772",1772,"Charles Forinash claims 400 acres on the Buckhannon River","charlesf"],
 ["1775",1775,"The Revolutionary War begins",""],
 ["1776",1776,"The Declaration of Independence",""],
 ["1781",1781,"John Waggoner is at the Siege of Yorktown","johnw"],
 ["1787",1787,"The U.S. Constitution is written",""],
 ["1792",1792,"Shawnee raid on Hacker's Creek: Margaret Waggoner killed, Elizabeth, 12, taken captive","elizabethw"],
 ["1795",1795,"Treaty of Greenville ends the frontier war; Elizabeth is home again","elizabethw"],
 ["1798",1798,"Elizabeth Waggoner marries John Dexter Hardman","elizabethw"],
 ["c.1799",1799,"Philip Beamer Sr. settles near Hillsdale, Monroe County, Virginia","philipsr"],
 ["1812",1812,"War of 1812; Peter Waggoner is found living with the Shawnee",""],
 ["1825",1825,"Samuel Fitz Randolph, founder of New Salem, dies","samuel"],
 ["1829",1829,"Charles Bonnell marries Jane Martin in Harrison County","charles"],
 ["1832",1832,"John Waggoner applies for his Revolutionary War pension","johnw"],
 ["1834",1834,"Joseph Graf is born in Baden","joseph"],
 ["1845",1845,"Andrew Ballentine Beamer marries Rebecca Erwin","andrew"],
 ["1848",1848,"Revolutions across the German states send many Germans to America",""],
 ["c.1859",1859,"Brigitta Reger is in Michigan","brigitta"],
 ["1861",1861,"The Civil War begins; Floyd Bonnell enlists in the 6th West Virginia Infantry","floyd"],
 ["1863",1863,"West Virginia becomes a state",""],
 ["1863",1863.1,"Floyd Bonnell marries Elizabeth Goldsborough Pitman","floyd"],
 ["1864",1864,"Rosa Graf is born","rosa"],
 ["1865",1865,"The Civil War ends",""],
 ["1867",1867,"Anthony Bexten is born in Westphalia","anthony"],
 ["1868",1868,"William Forinash marries Cynthia Hardman","william"],
 ["1880",1880,"Anthony Bexten, about 12, crosses to America alone","anthony"],
 ["1888",1888,"Frank J. Smith marries Carrie Langenderfer","frankj"],
 ["1889",1889,"Herbert Smith is born in Toledo","herbert"],
 ["1891",1891,"Calvin Beamer marries Cora Forinash","calvin"],
 ["1896",1896,"John W. Bonnell marries Amanda May","johnwj"],
 ["1899",1899,"Anthony Bexten marries Rosa Graf","anthony"],
 ["1903",1903,"Nelson Bexten is born","nelson"],
 ["1903",1903.1,"The Wright brothers fly at Kitty Hawk",""],
 ["1905",1905,"Joseph Graf is killed when a train hits his buggy at Sylvania","joseph"],
 ["1906",1906,"Onal Bonnell and Genevieve Beamer are born","onal"],
 ["1910",1910,"Caroline Smith is born","caroline"],
 ["1917",1917,"The U.S. enters World War I; Herbert Smith serves","herbert"],
 ["1918",1918,"The influenza pandemic",""],
 ["1928",1928,"Nelson Bexten marries Caroline Smith","nelson"],
 ["1929",1929,"The stock market crash begins the Great Depression",""],
 ["1933",1933,"Tony Bexten is born","tony"],
 ["1934",1934,"Althea Bonnell is born in Weston","betty"],
 ["1940",1940,"Onal Bonnell dies at 34","onal"],
 ["1941",1941,"The U.S. enters World War II",""],
 ["1945",1945,"Rosa Bexten and Carrie Smith die; World War II ends","rosa"],
 ["1950",1950,"Anthony Bexten dies at Ottawa Lake","anthony"],
 ["1954",1954,"Tony Bexten marries Althea Bonnell in Toledo","tony"],
 ["1969",1969,"Apollo 11 lands on the Moon",""],
 ["1983",1983,"Althea dies","betty"],
 ["1987",1987,"Nelson and Caroline Bexten die","nelson"],
 ["1990",1990,"Genevieve dies","genevieve"],
 ["2011",2011,"Tony dies","tony"]
];
let tlf="all";
function drawTL(){
 const rows=TL.filter(([, ,t,id])=>tlf==="all"?true:tlf==="fam"?!!id:id&&(SIDE[id]===tlf||(id==="tony"&&tlf==="F")||(id==="betty"&&tlf==="M")));
 let h="",cent=0;
 rows.sort((a,b)=>a[1]-b[1]).forEach(([y,s,t,id])=>{const c=Math.floor(s/100);if(c!==cent){h+=`<li class="cent">${c+1}${c+1===21?"st":"th"} century</li>`;cent=c}
  h+=id?`<li class="ev fam"><span class="yr">${esc(y)}</span><button type="button" data-person="${id}"><span class="dot" style="background:${col(id)}"></span><span>${esc(t)}</span></button></li>`:`<li class="ev world"><span class="yr">${esc(y)}</span><span class="wt">${esc(t)}</span></li>`});
 document.getElementById("tl").innerHTML=h;
}
document.getElementById("tl").addEventListener("click",e=>{const b=e.target.closest("[data-person]");if(b){showPerson(b.dataset.person);location.hash="#tree"}});
document.querySelector(".tlbar").addEventListener("click",e=>{const b=e.target.closest("[data-tlf]");if(!b)return;tlf=b.dataset.tlf;document.querySelectorAll("[data-tlf]").forEach(x=>x.setAttribute("aria-pressed",x===b));drawTL()});
drawTL();
function setStorySub(){const t=location.hash.split("/")[1]==="timeline";document.getElementById("tl-wrap").hidden=!t;document.getElementById("story-wrap").hidden=t;document.getElementById("seg-tl").setAttribute("aria-selected",t);document.getElementById("seg-story").setAttribute("aria-selected",!t)}
window.addEventListener("hashchange",setStorySub);setStorySub();
