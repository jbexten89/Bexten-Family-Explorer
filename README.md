# Bexten Family Explorer

The Bexten family history in one app: an interactive family tree, a migration map, the family story, the full research report, printable charts and the research to-do list. It installs to an iPhone home screen and works offline once opened.

## Tabs

| Tab | What it shows |
|---|---|
| Tree | Tap anyone to move back a generation; search by name |
| Map | Routes from England, Holland and Germany to Ohio, line by line |
| Story | *The Bexten Family Story*, oldest first |
| Report | The full research notes, with sources |
| Charts | Five-generation fan chart and lines of descent (Print button) |
| To-do | Record requests and next steps; checkmarks are saved on the device |

## Install on iPhone

Open the site in Safari, tap Share, then **Add to Home Screen**.

## Editing

The published page is the single file `index.html`, built from `src/`:

- `src/base.html`: tree and map, including the people data (`const D`) and map routes (`const LINES`)
- `src/story.html`, `src/report.html`: story and report text
- `src/extra.js`, `src/extra.css`, `src/views.html`: charts, to-do and the extra tabs
- `src/geo.json`: map outlines

Rebuild with `python3 src/build.py`. After changing anything, bump `CACHE` in `sw.js` so installed copies update.

## Privacy

This public copy leaves out living people. Tony and Betty's six children appear only as one "Tony and Betty's children" entry. `src/public.py` strips living names from the story and report every time the page is built, and the build stops if any are left.
