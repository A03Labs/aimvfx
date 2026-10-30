# Handoff: AIM VFX studio website

## Overview
The official AIM VFX studio website: a work-first portfolio for a design & motion studio (UK · Nigeria). Four views — **Work** (filterable project grid), **Project** (case study), **Studio** (statement + services), **Contact** (brief form). Light theme by default with a dark toggle.

Goal of this handoff: deploy it as a real, fast, SEO-friendly static site.

## About the design files
Everything in `design_reference/` is a **design reference built in HTML/JSX** — a browser-compiled React 18 prototype (Babel standalone, no bundler). It shows the intended look and behaviour exactly, but it is not production code to ship as-is:
- JSX compiles in the browser on every load (slow, no SEO).
- Components attach to `window.*` instead of modules.
- Routing is a `localStorage` key, not URLs.
- Shared UI components are fetched + compiled at runtime by `_shared/aim-loader.js`.

**Task: recreate the site in a proper framework and deploy it.** Recommended: **Next.js (App Router) or Astro + React islands**, static export, hosted on Vercel/Netlify. Keep the design 1:1.

## Fidelity
**High-fidelity.** Colours, type, spacing, copy, hover states and motion are final. Recreate pixel-for-pixel. Open `design_reference/website-v2/index.html` over a local static server (e.g. `npx serve` from `design_reference/`) to see the live reference.

## Architecture to build
```
app/
  layout.tsx            Header + Footer, theme attr on <html data-theme>
  page.tsx              Work grid (IndexScreen)
  work/[slug]/page.tsx  Project (ProjectScreen) — static params from data
  studio/page.tsx       StudioScreen
  contact/page.tsx      ContactScreen
components/   Header, Footer, Tile, Poster(+Reel, Wall, YT), FlipBook, ui/* (Button, Input, Textarea, Select, Tag)
data/work.ts            port of data.js (typed)
styles/tokens.css       port of tokens/*.css (unchanged values)
public/media, public/fonts, public/logo
```
- Routes replace `go('p:'+slug)` → `/work/[slug]`, `go('studio')` → `/studio`, `go('contact')` → `/contact`, `go('index')` → `/`.
- Theme: persist `light|dark` in `localStorage` (`aim-theme`), set `data-theme` on `<html>` before paint to avoid flash. Default **light**.
- Self-host Neulis Alt (TTFs in `assets/fonts/`; convert to woff2). `font-display: swap`.
- Images: use framework image optimisation; all media already compressed (<~200 KB).
- Project pages must be statically generated; every page needs `<title>` = "Client ― Project · AIM VFX" and OG image = the project cover/thumb.

## Screens

### 1. Header (all pages) — `Header.jsx`
Sticky, `top:0`, `z-index:30`, background `var(--bg-1)`. Inner row: padding `0 var(--gutter)`, height **72px**, flex space-between.
- Left: logo `assets/logo/aimvfx-logo-color.svg` (light) / `aimvfx-logo-reversed.svg` (dark), height **26px**, links home.
- Right nav, gap 28px, items 15px/500: **Work**, **Studio**, **Contact**, theme toggle text ("Dark"/"Light", colour `--fg-3`), then `Button size="sm"` **Start a project** → /contact.
- Active link colour `--fg-1`, inactive `--fg-3`. Work is active on `/` and `/work/*`.

### 2. Work (home) — `IndexScreen.jsx`
`main` padding `0 var(--gutter)`.
- Intro section: padding `var(--space-8) 0 var(--space-7)`, column gap `--space-6`.
  - H1: `clamp(28px,3.4vw,48px)`, lh 1.12, weight 600, ls −.025em, max-width 30ch, `text-wrap:balance`. Copy: *"AIM VFX is a design & motion studio making events, products and businesses **impossible to miss.**"* — the bold span is `--aim-indigo`.
  - Filter nav: flex-wrap, gap `4px 28px`, `clamp(22px,2.2vw,32px)`/600, ls −.02em. Items: All, Events, Products, Business, Showreels, each with a superscript count (`font-size:.45em`, margin-left 4). Active `--fg-1`, inactive `--fg-3`, colour transition `--dur-fast`.
- Grid: `repeat(auto-fill, minmax(min(100%,320px),1fr))`, gap `48px 24px`. Each tile wrapper animates in with `aim-rise` (`--dur-slow`, `--ease-out`), stagger 40ms × index.
- Filter state: `all | events | products | business | showreels`. Category label on tiles hidden when a single category is selected.

### 3. Tile — `Tile.jsx`
Anchor to `/work/[slug]`, column, gap 12, colour `--fg-1`.
- Media box: `border-radius: var(--radius-sm)` (4px), overflow hidden, contains `Poster` (16/9).
- Caption row: flex, baseline, gap 10, 15px, lh 1.3: `[CATEGORY]` eyebrow (12px/600, ls .14em, uppercase; colour: showreels `--fg-3`, business `--accent-text`, products `--accent-2`, events `--fg-2`) · **Client** (600, nowrap) · `― Project` (`--fg-3`) · trailing `→` right-aligned, appears on hover (opacity 0→1, translateX −6px→0, `--dur-base --ease-out`).
- Hover is passed to Poster to "play" it.

### 4. Poster (media tile) — `Poster.jsx`
A 16/9 box (`ratio` prop; 21/9 on Studio) whose content depends on the project's data, in this precedence:
1. `wall` → **Wall**: 6×6 grid of page thumbnails (`thumbs`, cell = `thumbs[(k*5+k%3)%len]`), scaled 112%/116% and offset −6%/−8%, scale 1→1.04 on hover (1400ms ease-out); radial vignette overlay; centred 58%-wide 16/9 "page" cycling through `frames` every 850ms, shadow `0 18px 40px -10px rgba(0,0,0,.6)`.
2. `reel` (grid only, not on project page) → **Reel**: crossfading slideshow of `frames`, 4200ms total cycle, opacity 180ms, Ken Burns scale 1.06 (1.1 on hover); bottom progress bars (2px, 4px gap, white .9 / .3).
3. `cover` → single `<img>` cover, scale 1.04 on hover (900ms ease-out).
4. `youtube` → **YT** facade: own thumbnail + white 96px play disc (navy triangle) when `controls`; on click, embed `youtube-nocookie` iframe, offset `top:-64px; height:calc(100%+64px)` to crop channel name/avatar. Params `autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`.
5. `vimeo` → iframe `player.vimeo.com/video/{id}?h={h}`; on project page `&title=0&byline=0&portrait=0&dnt=1`; in grid `&background=1&dnt=1`, pointer-events none, scale 1.04 on hover.
6. `layout==='reel'` (showreels): black box, reversed logo at 42% width centred (scale 1.06 hover), year label 13px/600 ls .16em bottom-left 4%/6%; animated gradient wash fades in on hover (`linear-gradient(100deg,#fe71ff,#8368fa 35%,#5165f8 55%,#24d6f4 80%,#fe71ff)`, size 300%, pans 0%→100% over 2400ms linear, opacity .9).
Default tile background = category tint (`cats[].tint`).

### 5. Project — `ProjectScreen.jsx` (`/work/[slug]`)
- Top: padding `var(--space-7) 0 var(--space-6)`, gap `--space-5`. `← All work` (15px, `--fg-3`). H1 `clamp(40px,6vw,96px)`, lh .98, 700, ls −.035em: **Client** `― Project` (second part `--fg-3`).
- Hero: `Poster big controls` (controls only when vimeo/youtube).
- Meta grid: `repeat(auto-fit,minmax(160px,1fr))`, gap 24, padding `var(--space-6) 0`, bottom border `1px solid var(--border-1)`. Pairs: Client, Discipline, Deliverable, Year — label 12px/600 ls .14em uppercase `--fg-3`; value 17px/500.
- Description p: margin `var(--space-7) 0`, `clamp(22px,2.2vw,32px)`, lh 1.3, 500, ls −.015em, max-width 34ch.
- Body, by category:
  - **business** → `FlipBook` with `pages[]`.
  - has `gallery` → rows; each row is `grid repeat(auto-fit,minmax(min(100%,360px),1fr))`, gap 24, `align-items:start`; images `width:100%`, radius `--radius-sm`, lazy.
  - else → image-slot placeholders (hero 16/9, two 4/5, one 21/9, three 1/1). In production, render nothing or a simple gallery; the slots are an authoring aid.
- Next project: padding-top `--space-9`, eyebrow "NEXT PROJECT", a `Tile` at max-width 640 for `work[(i+1)%len]`.

### 6. FlipBook — `FlipBook.jsx` (business projects)
16/9 book in a dark navy "cover" frame, page-turn with a 16-strip 3D curl, spring physics (K=46, damping .82), drag/swipe, click right/left half, ← → keys. Preloads adjacent pages. Controls row: pill buttons `← Prev` / `Next →` (15px/600, padding 10px 18px, border `--border-1`), hint "Drag, swipe or use ← → to turn" (13px `--fg-3`), right label `LABEL · PAGE k / n` (13px/600 ls .14em uppercase).
Port the component as-is (it is self-contained React) — see source for exact gradients/shadows. Paper colour `#f4f1ea`.

### 7. Studio — `StudioScreen.jsx`
- H1 `clamp(36px,5vw,80px)`, lh 1, 700, ls −.035em, max-width 18ch: "Design that makes things clear. *Motion that makes them move.*" (italic part = `--fg-3`).
- Showreel poster (21/9) linking to the 2026 showreel project.
- "We help ideas move." section: 2-col `repeat(auto-fit,minmax(min(100%,360px),1fr))`, gap `--space-6`, padding `var(--space-9) 0 var(--space-6)`, border-bottom. Right column three stacked items: small eyebrow row (`.55em`, `--fg-3`, 12px dot in cyan/pink/indigo) "Events →" / "Products →" / "Businesses →", then "move **people.** / **understanding.** / **decisions.**" in `clamp(24px,2.6vw,40px)`/600 — coloured `--fg-2` / `--accent-2` / `--accent-text`.
- Services: 3-col `repeat(auto-fit,minmax(260px,1fr))`, padding `var(--space-8) 0`. Each: eyebrow `01 — EVENTS` (13px/600 ls .16em), list 20px/500 gap 6, link "View events work →" (15px).
  - Events: Event branding, Campaign visuals, Motion graphics, Stage & screen visuals, Photography, Video coverage, Event recap films.
  - Products: Explainer videos, Product videos, Motion graphics, UI animation, Product demos, Launch videos, 3D / visualisation.
  - Business: Pitch decks, Investor presentations, Business proposals, Company profiles, Sales presentations, Corporate communications, Data & information design.
- Footer line: `clamp(28px,3vw,44px)`/600: **Playful** (#24d6f4) **Afrocentric** (#fe71ff) **Innovation** (#5165f8) · UK · Nigeria · Working globally (`--fg-3`).

### 8. Contact — `ContactScreen.jsx`
Two-column `repeat(auto-fit,minmax(min(100%,420px),1fr))`, gap `--space-8`, top padding `--space-8`.
- Intro: eyebrow START A PROJECT; H1 `clamp(40px,5vw,80px)` "Tell us what needs to be seen." (max 12ch); p 20px `--fg-2` "A few lines is enough. We reply within one working day."; email link `m` `clamp(22px,2.4vw,34px)`/600, hover → `--aim-indigo`; social row Instagram · LinkedIn · Vimeo · UK · Nigeria · Working globally (15px `--fg-3`).
- Form (design-system components): Name*, Email*; Company (optional); "What do you need?" Tag toggles Events(cyan)/Products(pink)/Business(indigo)/Not sure yet, multi-select, Events preselected; Budget select (Under £5k, £5k – £15k, £15k – £40k, £40k+, Not sure yet); Timeline select (ASAP, 1–2 months, 3+ months, Flexible); Textarea "Tell us about it"* rows 5, placeholder "We're launching a product in March and need…"; `Button size="lg"` **Send brief** with arrow-right icon.
- Success state replaces form: eyebrow BRIEF RECEIVED (`--accent-text`), H2 `clamp(32px,3.4vw,52px)` "Thanks, we'll be in touch.", p "Expect a reply within one working day.", secondary button "Send another".
- **Production:** wire submit to a form backend (Formspree/Resend/Netlify Forms) emailing m; keep client-side required validation; show the success state on 2xx.

### 9. Footer — `Footer.jsx`
Padding `var(--space-9) var(--gutter) var(--space-6)`, flex space-between wrap, 14px `--fg-3`: "AIM VFX · UK · Nigeria" · `m` · "Instagram · LinkedIn · Vimeo" · "© 2026". Make social items real links (URLs TBC by client).

## Interactions & motion
- Easing `--ease-out: cubic-bezier(.16,1,.3,1)`; durations fast 180ms, base 320ms, slow 600ms; Poster media 900ms.
- Grid tiles rise in (`aim-rise`: translateY 24px→0, opacity) staggered 40ms.
- Hover on tile = poster plays (scale/crossfade/gradient) + arrow slides in.
- Theme toggle transitions page background over `--dur-base`.
- `prefers-reduced-motion`: durations → 0 (already in tokens).
- Scroll to top on route change.

## Design tokens
All in `design_reference/tokens/*.css` — copy verbatim. Key values:
- Navy scale 950→50: #0c1023 #121833 #1a2144 #262e58 #3a4373 #565f8f #7c84ab #a5abc8 #c9cde0 #e6e8f1 #f4f5f9. Brights: pink #fe71ff, orchid #da6efd, violet #8368fa, indigo #5165f8, blue #4387f6, sky #33b0f5, cyan #24d6f4. Tints: cyan-50 #c1f6fd, pink-50 #ffe3ff, indigo-50 #e5e8ff.
- Light theme: bg #fff / #f4f5f9 / #e6e8f1; fg-1 #0c1023, fg-2 #3a4373, fg-3 #565f8f; accent-text #3a4fe6; accent-2 #c03ad0; border-1 rgba(12,16,35,.10). Dark theme: bg #0c1023 / #121833 / #1a2144; fg-1 #fff, fg-2 #c9cde0, fg-3 #7c84ab; accent-text #24d6f4; accent-2 #fe71ff; border-1 rgba(255,255,255,.10).
- Category colours: Events #24d6f4, Products #fe71ff, Business #5165f8, Showreels #000.
- Spacing 4/8/12/16/24/32/48/64/96/128/160; radius 4/10/20/32/pill; gutter `clamp(20px,4vw,56px)`; container 1280.
- Type: Neulis Alt (100–900). Body 17px, small 15, caption/eyebrow 13 (ls .16em, uppercase).

## Data
`design_reference/website-v2/data.js` — `cats[]` and `work[]`. Each work item: `slug, cat, client, project, layout, word, year` plus optional `client2, desc, cover, thumb, reel[], reelPos, gallery[][] (rows of image paths), youtube, vimeo+h, wall{thumbs,frames}, pages[]`. Port to a typed TS module; keep order (it drives "Next project" and grid order).

## Assets
- `assets/logo/` — colour, reversed, mono logo + mark (SVG).
- `assets/fonts/` — Neulis Alt TTFs (licensed to AIM VFX; convert to woff2).
- `website-v2/media/<project>/` — all project imagery, pre-compressed. `the-99-prospectus/` has full (1600×900), `m/` (960) and `t/` (400) variants used by Wall/FlipBook.
- Icons: Lucide (`arrow-right`) — use `lucide-react`.
- Embeds: Vimeo IDs/hashes and YouTube IDs are in data.js.

## Files in this bundle
- `design_reference/website-v2/index.html` — entry (app shell, routing, tweaks). Open via a static server.
- `design_reference/website-v2/*.jsx` — screens and components listed above.
- `design_reference/website-v2/data.js` — content.
- `design_reference/_shared/aim-loader.js` — how shared UI components were loaded (not needed in production).
- `design_reference/components/**` — Button, IconButton, Input, Textarea, Select, Checkbox, Tag, SectionHeader, Card, Tabs, Dialog, Toast, Tooltip (JSX + `.d.ts` prop types). Port the ones the site uses: Button, Input, Textarea, Select, Tag.
- `design_reference/styles.css` + `tokens/` — design tokens.
- `design_reference/assets/` — fonts, logos.

## Out of scope / to confirm with client
Social URLs, form backend, analytics, privacy page, favicon/OG defaults, domain (aimvfx.com).
