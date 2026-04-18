# The Pale Archives

## To install this experimental addon:

To install (Chrome/Chromium):
 - Download https://github.com/k0a1a/pale-archive/archive/refs/heads/main.zip
 - Unzip main.zip
 - Go to chrome://extensions → enable Developer Mode → Load unpacked → select `pale-archives-addon` folder

## To run the Archive

To run (Chrome/Chromium):
 - Click Extensions icon in the toolbar (puzzle piece) → The Pale Archives → Run

## About

**The Pale Archives**  
The web we navigate is not the web that exists. It is the web that dominated. These are pages that accumulated enough links, enough traffic, and enough institutional or commercial backing to survive the ranking systems that decide what is worth finding. Everything else recedes.

What recedes is not random. It includes pages from underrepresented communities, from regions with poor connectivity infrastructure. It includes work by individuals and groups without the technical or social means to earn backlinks. It includes movements and cultures operating outside the Western platform mainstream. The early web promised a truthfully horizontal publishing space. That promise quietly broke. It broke along the same fault lines as everything else: language, geography, race, economic infrastructure, and cultural legibility.

The Pale Archives is a browser extension that searches within that remainder. It is partly an instrument of curiosity, partly a diagnostic tool. It offers a way to encounter the web as something stranger, wider, and more faceted than search engines suggest. The distribution of what was never seen reveals the web’s structural inequalities. These inequalities did not begin with platforms. They were encoded earlier, at the level of engineering priorities. Platforms inherited and amplified them.

Surfacing these pages does not recover what was lost. Instead, it makes the condition of their loss visible. It asks who that condition continues to serve.


**How it works**  
The browser extension queries directly two public infrastructures. The first is Common Crawl, which maintains a multi-petabyte open repository of web crawl data. The second is the Wayback Machine API, which holds historical snapshots of pages across decades.

From these sources, the extension surfaces pages with near-zero capture counts. These are pages crawled once or twice, never revisited, unlinked, and unindexed by major search engines. Crucially, the extension talks to these APIs directly from the browser. There is no central service or pre-compiled selection. There is no curatorial hand deciding in advance what gets shown. Each encounter is live. It is unmediated. It is different every time.

The extension filters for signals that the infrastructure was never designed to amplify. These include low hit counts, absent backlinks, and expired or marginal domains. It brings these pages to the surface as something worth looking at.


**A note on the current demo**  
This version of The Pale Archives uses the Hotglue.me platform archive as its data source. Hotglue.me serves as a contained and conceptually fitting corpus for demonstration purposes. The live version will query Common Crawl and the Wayback Machine directly.
