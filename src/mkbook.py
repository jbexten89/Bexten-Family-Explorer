# Regenerates Bexten-Family-Book.pdf from the built index.html (run after build.py).
import pathlib
from playwright.sync_api import sync_playwright
R=pathlib.Path(__file__).resolve().parent.parent
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome')
    pg=b.new_page(viewport={'width':900,'height':1200})
    pg.goto((R/'index.html').as_uri()+'#book'); pg.wait_for_timeout(1500)
    pg.emulate_media(media='print')
    pg.pdf(path=str(R/'Bexten-Family-Book.pdf'),format='Letter',margin={'top':'0.7in','bottom':'0.7in','left':'0.75in','right':'0.75in'},
           display_header_footer=True,header_template='<span></span>',
           footer_template='<div style="font-size:8pt;width:100%;text-align:center;color:#777"><span class="pageNumber"></span></div>')
    b.close()
print('ok')
