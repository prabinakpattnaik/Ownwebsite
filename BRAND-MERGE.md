# Brand merge — Netrivium identity pack

Merged on 2026-08-24. Source of truth for the identity system:
`D:\personal\Own-Product-Code\emergent\mecon\netrivium-brand\` (see its `README.md`).

This folder is **not under version control** (no `.git`), so every overwritten file
was copied to `brand-backup/` first. To undo any single change, copy the file back —
names use `__` where a subfolder was involved (`assets__netrivium-hero-mark.png`
came from `public/assets/netrivium-hero-mark.png`).

Once you're happy, `brand-backup/` can be deleted.

---

## Code changed (4 files)

| File | Change |
| --- | --- |
| `src/components/AppBar.js` | Header logo now SVG; added a scroll-aware reversal (see below) |
| `src/components/Footer.js` | `netrivium-lockup-dark.png` → `/brand/logo-horizontal-white.svg` |
| `src/components/FlowingNetwork.js` | `assets/netrivium-hero-mark.png` → `/brand/icon.svg` |
| `public/index.html` | Real icon set: `.ico` + SVG + PNG apple-touch; JSON-LD logo → PNG |
| `public/manifest.json` | PWA icons switched from SVG to PNG at 192/512 |

### The scroll-aware header logo

The header is `position: fixed` and translucent. At the top of the home page it sits
over the blue hero; everywhere else it sits over the near-white page (`#F4F8FC`). A
single fixed logo colour is wrong in one of those two places, so:

```js
const scrolledPastHero = useScrollTrigger({ disableHysteresis: true, threshold: 60 });
const logoOnDarkGround = mode === 'dark' || (isHomePage && !scrolledPastHero);
```

| State | Logo |
| --- | --- |
| Home, at top (blue hero behind bar) | white |
| Home, scrolled | navy |
| Any other page | navy |
| Dark mode, anywhere | white |

`useScrollTrigger` comes from `@mui/material` — no new dependency.

---

## Assets replaced in place (existing filenames kept)

Kept the original names so nothing breaks even if the component edits are reverted.

| `public/` path | Was | Now |
| --- | --- | --- |
| `netrivium-lockup-light.png` | 1400×329, 282 KB, 3D render | 1600×279, 108 KB |
| `netrivium-lockup-dark.png` | 1400×329, 286 KB | 1600×279, 37 KB |
| `assets/netrivium-hero-mark.png` | 1524×1018, **2001 KB** | 1024×625, **273 KB** |
| `favicon.svg` | old mark | simplified mark, holds at 16 px |
| `logo192.svg`, `logo512.svg` | old mark | square padded mark |
| `og-image.png` | 1200×630 | 1200×630, rebuilt on brand navy with the tagline |

These three PNG lockups are **no longer referenced** by any component (they were the
old `img src` targets). They're left in place as a fallback — safe to delete once
you're confident in the SVG versions.

## Assets added

| `public/` path | Why |
| --- | --- |
| `brand/*.svg` (12 files, ~140 KB) | Vector lockups for site use — see table below |
| `favicon.ico` | 16–256 px in one file; legacy browsers and Windows pinned sites |
| `apple-touch-icon.png` (180) | **iOS ignores SVG `apple-touch-icon`** — there was previously no iPhone home-screen icon |
| `logo192.png`, `logo512.png` | PWA install icons; Android prefers PNG. `logo512.png` is also the JSON-LD `logo` |
| `favicon-32.png` | Classic PNG favicon fallback |

### `public/brand/` contents

```
logo-horizontal.svg              logo-horizontal-white.svg
logo-horizontal-small.svg        logo-horizontal-small-white.svg   ← header (simplified mark)
logo-horizontal-tagline.svg      logo-horizontal-tagline-white.svg
logo-horizontal-ondark.svg
logo-stacked.svg                 logo-stacked-white.svg
icon.svg                         icon-white.svg                    ← hero mark
icon-compact.svg
```

Pick `-small` under 320 px wide and `icon-compact` under 56 px — below those sizes the
full trace pattern muddies. The `-small` file has the **same width and height** as
`logo-horizontal.svg`, so swapping never shifts layout.

---

## Net effect

Header + footer + hero images: **~570 KB of PNG → ~20 KB of SVG**, and they're now
resolution-independent. The hero mark alone dropped 1.7 MB.

## Not changed, on purpose

- **`#00B7E3`** is used in 15 places in `src/`. The brand cyan is `#35D9FF`. The logo
  doesn't use `#00B7E3`, so nothing looks wrong today, but the two cyans will drift
  apart over time. Worth reconciling in a separate pass.
- **Four unreferenced SVGs** in `public/`: `logo-full.svg`, `logo-horizontal.svg`,
  `logo-horizontal-dark.svg`, `logo-icon.svg`. Nothing imports them. Left alone;
  delete when you're ready.
- **No maskable PWA icon.** A `purpose: "maskable"` entry was deliberately left out —
  Android crops maskable icons to a central 80 % safe zone and expects a full-bleed
  background, which a transparent 6 % padded icon does not satisfy. Doing it properly
  means a separate icon with a navy plate and the mark inset to ~60 %.
- **Pre-existing React warning:** `Highlights` renders a list without a `key` prop.
  Unrelated to branding; visible in the console.

## Verified

Dev server compiled clean. All three logo images load (`naturalWidth > 0`), no failed
requests, no new console errors. Logo swap confirmed in all four states: home top,
home scrolled, other page, dark mode. Header measured at `(0,0,1440,66)` in both
scroll positions.
