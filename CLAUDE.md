# Janell Lewis — Portfolio Prototype

Prototype portfolio site for Janell Lewis, ceramic sculptor (Claremont, CA; resident artist at AMOCA Ceramics Studio, Pomona, Studio 15, since ~2016). Started September 2026 in claude.ai, restructured locally since. Context: Janell Lewis of the Lewis family (Randall Lewis); adjacent to F's Lewis Group work but deliberately its own repo with its own visual identity. It does not use the Lewis brand system.

## Repo and deployment

- Repo: `accordingtoplan/janell-lewis`, single branch `main`, GitHub Pages from root
- CNAME in repo: `janell-lewis.accordingtoplan.co` (per-project subdomain approach). Pages URL: https://accordingtoplan.github.io/janell-lewis/
- Cloudflare DNS for the subdomain: CNAME `janell-lewis` → `accordingtoplan.github.io`, DNS-only (grey cloud), SSL mode Full
- Workflow: local repo on F's Mac, F pushes from his own terminal

## Stack and structure

Static site, no build step. Framework-free.

- `index.html` — home: hero, selected work (subset of the grid), about, exhibitions, press, contact
- `work.html` — full work index, 18 pieces, several with multiple photos
- `css/site.css`, `js/site.js` — shared styles and behavior (theme toggle, mobile overlay menu, scroll reveals, hero parallax, lightbox carousel)
- `img/` — all photography plus favicons; root-absolute paths (`/img/...`) throughout
- `404.html`

## Design system

- Fonts: Gloock (display), Archivo (body), IBM Plex Mono (labels, captions, eyebrows), via Google Fonts
- Two themes on CSS variables (`:root` / `[data-theme="dark"]`), half-circle toggle in nav, persisted in localStorage `jl-theme`, inline head script prevents flash. Light is default.
  - Light "hardened clay": bg #C9B9A4, text #161310, accent #8A5A28
  - Dark clay: bg #382D22, text #F0EAE1, accent #B78B4E
- Sections separate through tonal background bands, no horizontal rules (F's call; only line left is the nav hairline)
- Favicon: "JL" set in real Gloock, 32/512/apple-touch in `img/`
- Motion: restrained, Apple-style. Hero cascade, rAF parallax, IntersectionObserver reveals. All off under prefers-reduced-motion.
- Lightbox: carousel with prev/next peeking at the edges as click targets, keyboard, swipe left/right, swipe down closes, no shadow

## Rules for any edits

- No em-dashes or en-dashes anywhere in copy. F's standing rule. Periods and commas instead.
- Copy in Janell's or F's voice: apply the frederik-voice skill. Short declarative sentences.
- Targeted edits, never full-file rewrites. Nothing gets described as final.
- Global fixes over per-page patches; styles and behavior live in `css/site.css` and `js/site.js`, not inline.

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
