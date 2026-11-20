"""Public-copy filter: removes living people from the story and report text.

The list of names to strip lives in src/private/fixes.py, which is git-ignored
and stays on your computer. The story and report files in this repository have
already been cleaned. When you re-export them from the docs, keep fixes.py next
to this file and the build will clean them again (and stop if any name is left).
"""
import re
try:
    from private.fixes import LIVING, FIX, REGEX
except ImportError:
    LIVING, FIX, REGEX = [], [], []

def clean(h):
    h=h.replace('&#39;',"'")
    for a,b in REGEX: h=re.sub(a,b,h,flags=re.S)
    for a,b in FIX: h=h.replace(a,b)
    left=[w for w in LIVING if re.search(r'\b'+w+r'\b',h)]
    assert not left, 'living names left: %s'%left
    return h
