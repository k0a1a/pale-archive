# The Pale Archives

## To install this experimental addon:

To install (Chrome/Chromium):
 - Download https://github.com/k0a1a/pale-archive/archive/refs/heads/main.zip
 - Unzip `pale-archive-main.zip` file
 - Go to chrome://extensions → enable Developer Mode → Load unpacked → select `pale-archives-addon` folder

## To run the Archive

To run (Chrome/Chromium):
 - Click Extensions icon in the toolbar (puzzle piece) → The Pale Archives → Run

## About

**The Pale Archives**  
The web we navigate is not the web that exists. It is the web that prevailed, pages that accumulated enough links, enough traffic, enough institutional or commercial backing to survive the ranking systems that decide what is worth showing on the first page of search results. Everything else sinks below.

What sinks is not random. It is pages from small language communities, from regions with poor connectivity infrastructure. It is work by individuals and groups without the technical or social means to earn backlinks. It is movements and cultures operating outside the Western platform mainstream.

The early web's promise of a truly horizontal publishing space quietly broke along the same lines as everything else: language the crawlers were trained to prioritise, internet connections fast enough to serve pages before a crawler moved on, communities large enough to be of importance, cultural production legible enough to be considered relevant at all.

The Pale Archives is a browser extension that searches within that remainder. It is partly an instrument of curiosity. It offers a way to encounter the web as something stranger, wider, and more faceted than search engines suggest. It is also a diagnostic tool.

What was never seen was never randomly distributed. It follows the same lines of inequality that predate the platforms -- built into the engineering long before anyone had a social media account. The platforms didn't create this, they just made it bigger. Surfacing these pages doesn't undo that, but it raises the question of who it continues to benefit.

**How it works**  
The extension queries two public infrastructures directly. The first is Common Crawl, which maintains a multi-petabyte open repository of web crawl data. The second is the Wayback Machine API, which holds historical snapshots of pages across decades.

From these sources, the extension pulls pages with near-zero capture counts. These are pages crawled once or twice, never revisited, unlinked, and unindexed by major search engines.

Crucially, the extension talks to these APIs directly from the browser. There is no central service, no pre-compiled selection and no curatorial hand deciding in advance what gets shown.

**A note on the current demo**  
This version of The Pale Archives uses the Hotglue.me platform archive as its data source. Hotglue.me serves as a contained and conceptually fitting corpus for demonstration purposes. The live version will query Common Crawl and the Wayback Machine directly.
