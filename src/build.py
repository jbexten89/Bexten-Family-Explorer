import re,json,html,pathlib,sys
sys.path.insert(0,str(pathlib.Path(__file__).parent))
from public import clean
S=pathlib.Path(__file__).parent;OUT=S.parent
t=(S/'base.html').read_text()
def slug(s):return re.sub(r'[^a-z0-9]+','-',html.unescape(re.sub('<[^>]+>','',s)).lower()).strip('-')
ICONS={'tree':'<path d="M12 21v-7"/><path d="M12 14c-4 0-7-2.6-7-6a7 7 0 0 1 14 0c0 3.4-3 6-7 6z"/><path d="M9 21h6"/>',
'map':'<path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/>',
'story':'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
'report':'<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>',
'charts':'<path d="M3 18a9 9 0 0 1 18 0z"/><path d="M12 9v9M7.5 11l4.5 7M16.5 11L12 18"/>',
'todo':'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.5l2.5 2.5 5-5.5"/>'}
NAV_HTML='<nav aria-label="Views">'+''.join(f'<a href="#{k}" data-v="{k}"><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[k]}</svg><span>{n}</span></a>' for k,n in [('tree','Tree'),('map','Map'),('story','Story'),('report','Report'),('charts','Charts'),('todo','To-do')])+'</nav>'
story=(S/'story.html').read_text()
story=re.sub(r'<h2>(.*?)</h2>',lambda m:f'<h2 id="s-{slug(m.group(1))}">{m.group(1)}</h2>',story)
rep=(S/'report.html').read_text()
rep=re.sub(r'^<h1.*?</h1>\s*<p><time.*?</p>\s*','<h1>Bexten Family History Report</h1>\n',rep,flags=re.S)
rep=re.sub(r'<figure data-embed=.*?</figure>','<p>Open the <a href="#tree">interactive family tree</a> or the <a href="#charts">fan chart</a>.</p>',rep,flags=re.S)
rep=rep.replace('<a href="https://claude.ai/artifact/KTg1LEmzykp7uUBUShtViF">Bexten Family Tree Charts</a>','the <a href="#charts">Charts</a> tab').replace('href="https://claude.ai/artifact/KTg1LEmzykp7uUBUShtViF"','href="#charts"')
rep=re.sub(r'<h([23]) id="([^"]+)"',r'<h\1 id="r-\2"',rep)
rep=re.sub(r'<a href="(https?:[^"]+)"',r'<a href="\1" target="_blank" rel="noopener"',rep)
assert 'claude.ai/artifact' not in rep and 'data-atom' not in rep, [m for m in re.findall(r'claude\.ai/artifact\S*|data-atom\S*',rep)]
story=clean(story);rep=clean(rep)
views=(S/'views.html').read_text().replace('__STORY__',story).replace('__REPORT__',rep)
t=t.replace('<nav aria-label="Views"><a href="#tree" id="nav-tree">Family tree</a><a href="#map" id="nav-map">Migration map</a></nav>',
 NAV_HTML)
t=t.replace('</main>',views+'\n</main>')
t=t.replace('</style>',(S/'extra.css').read_text()+'</style>')
t=t.replace('<title>Bexten Family Explorer</title>','<title>Bexten Family Explorer</title>\n<meta name="description" content="The Bexten family tree, migration map, family story and research notes.">\n<meta name="theme-color" content="#07080A">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n<meta name="apple-mobile-web-app-title" content="Bexten Family">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="icon" href="icons/icon-192.png">\n<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">')
old=re.search(r'// ---------- views ----------\nfunction route\(\)\{.*?\n',t).group(0)
new='''const VIEWS=["tree","map","story","report","charts","todo"];
function route(){const h=location.hash.slice(1).split("/");const v=VIEWS.includes(h[0])?h[0]:"tree";VIEWS.forEach(k=>{document.getElementById("view-"+k).hidden=k!==v});document.querySelectorAll("nav a[data-v]").forEach(a=>{if(a.dataset.v===v)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});const tgt=h[1]&&document.getElementById(h[1]);if(tgt)tgt.scrollIntoView({block:"start"});else document.getElementById("app").scrollTo(0,0)}
'''
t=t.replace(old,(S/'extra.js').read_text()+(S/'more.js').read_text()+'\n// ---------- views ----------\n'+new)
t=t.replace('__GEO__',(S/'geo.json').read_text().strip())
t=t.replace('</body>','<script>(function(){var h=document.documentElement,mm=function(q){return window.matchMedia?window.matchMedia(q).matches:false};function f(){if(!(navigator.standalone||mm("(display-mode: standalone)")))return;var p=mm("(orientation: portrait)"),H=p?Math.max(screen.height,screen.width):Math.min(screen.height,screen.width);h.classList.add("sa");h.style.setProperty("--sh",Math.max(H,innerHeight)+"px")}f();addEventListener("resize",f);addEventListener("load",f);setTimeout(f,500);setTimeout(f,2000);addEventListener("orientationchange",function(){setTimeout(f,300)})})()</script>\n</body>').replace('</body>','<script>if("serviceWorker"in navigator&&location.protocol==="https:")navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(r=>r.update()).catch(()=>{})</script>\n</body>')
(OUT/'index.html').write_text(t)
print(len(t))
