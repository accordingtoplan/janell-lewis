# Janell Lewis — Portfolio Prototype

Prototype portfolio site for Janell Lewis, ceramic sculptor (Claremont, CA; resident artist at AMOCA Ceramics Studio, Pomona, Studio 15, since ~2016). Started September 2026 in claude.ai, restructured locally since. Context: Janell Lewis of the Lewis family (Randall Lewis); adjacent to F's Lewis Group work but deliberately its own repo with its own visual identity. It does not use the Lewis brand system.

## Repo and deployment

- Repo: `accordingtoplan/janell-lewis`, single branch `main`, GitHub Pages from root
- CNAME in repo: `janell-lewis.accordingtoplan.co` (per-project subdomain approach). Pages URL: https://accordingtoplan.github.io/janell-lewis/
- Cloudflare DNS for the subdomain: CNAME `janell-lewis` → `accordingtoplan.github.io`, DNS-only (grey cloud), SSL mode Full
- Workflow: design and code sessions run from the local repo on F's Mac; F pushes from his own terminal. Content sessions run through Claude Code on the web and go through a pull request (see "Content sessions" below).

## Stack and structure

Static site, no build step. Framework-free.

- `index.html` — home: hero, selected work (subset of the grid), about, exhibitions, press, contact
- `work.html` — full work index, 18 pieces, several with multiple photos
- `css/site.css`, `js/site.js` — shared styles and behavior (theme toggle, mobile overlay menu, scroll reveals, hero parallax, lightbox carousel)
- `img/` — all photography plus favicons; root-absolute paths (`/img/...`) throughout
- `404.html`

## Design system

- Mood since Oct 2026: black and white, after the 1979 Manhattan one-sheet. Paper, ink, film grain, one typeface.
- Font: Archivo only, loaded as a variable font with the width axis (`wdth 62..125`, `wght 100..900`). Display (h1, h2, nav brand, mobile menu) is weight 900 at 62% width, uppercase. Work and exhibition titles are weight 300 uppercase. Labels, eyebrows and captions are weight 400 uppercase with light tracking (the `.mono` class name survives from the earlier IBM Plex Mono setup). Gloock and Plex Mono are no longer loaded.
- Two themes on CSS variables (`:root` / `[data-theme="dark"]`), half-circle toggle in nav, persisted in localStorage `jl-theme`, inline head script prevents flash. Light is default. Variable names (`--black`, `--bone`, `--gold`) predate the palette; `--gold` now equals the ink colour, so there is no accent.
  - Light paper: bg #F8F7F4, text #111110, secondary #6E6C67, bands #F1F0EC and #EBE9E4
  - Dark: bg #111110, text #ECEBE7, secondary #8E8C86, bands #161615 and #1B1B19
- Photography: every `img` is grayscale with raised contrast via a global filter; a noise overlay (`--grain`) sits on the hero, the 404 image and the work thumbnails. Colour originals go in `img/` untouched; the site does the conversion.
- Sections separate through tonal background bands, no horizontal rules (F's call; only line left is the nav hairline). Thumbnails have no border, no hover zoom; the frame count is plain text over the image.
- Favicon: "JL" set in Gloock, 32/512/apple-touch in `img/`. Predates the restyle, still to be redone in condensed Archivo.
- Motion: restrained, Apple-style. Hero cascade, rAF parallax, IntersectionObserver reveals. All off under prefers-reduced-motion.
- Lightbox: carousel with prev/next peeking at the edges as click targets, keyboard, swipe left/right, swipe down closes, no shadow

## Rules for any edits

- No em-dashes or en-dashes anywhere in copy. F's standing rule. Periods and commas instead.
- Copy in Janell's or F's voice: apply the frederik-voice skill. Short declarative sentences.
- Targeted edits, never full-file rewrites. Nothing gets described as final.
- Global fixes over per-page patches; styles and behavior live in `css/site.css` and `js/site.js`, not inline.

## Content sessions (Janell's side)

Janell's team updates copy and images themselves through Claude Code on the web. Rosie is the first person doing this; she works in digital marketing and is not technical. Treat any session as a content session unless the person says they are Frederik. In a content session:

**Scope**
- Edit copy and images only: text, titles, dimensions, years, materials, exhibitions, press, contact details, photos, works added or removed. Files touched: `index.html`, `work.html`, `img/`, and the "Content status" and "Open items" sections of this file.
- Do not touch `css/site.css`, `js/site.js`, `404.html`, `CNAME`, the page `<head>`, the nav, or any class names. A design or layout request goes to Frederik: say so and stop.
- Keep every rule under "Rules for any edits". No dashes, short sentences, nothing described as final.

**Facts**
- Never invent a title, year, dimension, material, venue or credit. If one is missing, ask for it. Leave a marked placeholder (`Title to be confirmed`, `[ To be supplied ]`) rather than a guess.
- When a working title is confirmed or replaced, remove its "Title to be confirmed" sentence and update "Content status" below.

**Images**
- Save photos to `img/` as JPG, long edge 1600px (`sips -Z 1600` or equivalent), named after the work in lowercase with hyphens: `heron.jpg`, then `heron-2.jpg`, `heron-3.jpg` for further frames. Never overwrite another work's file.
- Root-absolute paths (`/img/heron.jpg`). Every image gets a plain, specific `alt`. On `work.html` thumbnails carry `loading="lazy"`; on `index.html` they do not.
- A work with several frames lists them all in `data-frames="a|b|c"` on the card and shows `<span class="count">N frames</span>` in `.ph`.
- No photos with recognisable people who have not agreed, and none with children. One was removed for this reason already.

**Adding or removing a work**
- Copy the structure of an existing `.work` card exactly. On `work.html`, place it in the right section (Figures, Animals & Birds, Garden & Still Life). The home page grid is a curated selection of nine: add there only when asked.
- Update the counts: the eyebrow on `work.html` ("Eighteen works"), the `.grid-foot` note on `index.html` ("Nine of eighteen works"), and the "Content status" line below.

**Before anything goes out**
1. Make the edit, then describe what changed and where, in plain words. For copy, quote the new text. Keep going until the person is happy.
2. Wait for an explicit "publish". Nothing is committed before that.
3. On "publish": commit on a branch named `content/<short-slug>` with a one-line message saying what changed, push the branch, and open a pull request to `main` with the same description. Never push to `main` in a content session.
4. Tell the person the change is with Frederik for a quick check and will be live a few minutes after approval.

## Content status

18 works on `work.html`, all real photography. Titles that came verified from Claremont Museum of Art / California Botanic Garden Clayfornia posts: Rabbit, Rosie, Stonehenge Birds (the assignment of the black crested bird pair to that title is still an inference). The rest are working titles from the build, several still marked "to be confirmed" in the markup: Dancer, Wolf, Colossus, Big Bird, Agave Stalks, Dressed Rat, plus the newer additions (Handstand, Tiger, Among the Palms, Pig & Companion, Lookouts, Pomegranate, Pumpkin, Asparagus, Blossom Vessel).

Verified facts used on the site: AMOCA residency since ~2016 (four years as of Aug 2020 per AMOCA's post); 2018 studio show with Gary Lett; Clayfornia: Ceramic Sculpture in the California Sunshine, California Botanic Garden, Nov 8 2020 to May 31 2021 (extended run), fourteen AMOCA studio artists; Claremont Courier named her as a participating Claremont artist, Oct 2020; the AMOCA Ceramics Studio is Pomona's only clay center, housed in a former bank building.

## Open items, all need Janell

- Real titles, years, dimensions, materials for every working-title piece; confirm Rosie and Stonehenge Birds
- Artist statement (placeholder in About)
- Education and Collections lines (placeholders in About facts)
- Contact email (`mailto:hello@example.com` is a marked placeholder)
- Photography credits (footer placeholder)
- Exhibitions and press beyond the two documented entries
- Higher-res originals of the Clayfornia pieces (the Facebook copies are 1080px and it shows in the lightbox)

## History note

The first ~30 commits were made one file at a time through the GitHub Contents API from a claude.ai chat; normal git history starts with the local restructure. The PAT used in that chat is exposed in its history and should be rotated at github.com/settings/tokens if it still exists.
