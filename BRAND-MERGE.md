# Brand assets — Netrivium Technologies

Updated 2026-08-24.

**Every logo on this site is the company's own approved artwork.** Nothing is redrawn.
The assets below are crops, trims and rescales of the master files only.

## Masters

| Master | Used for |
| --- | --- |
| `netrivium-lockup-v3-transparent.png` (2031×558) | the light-background lockup and every icon |
| `netrivium-lockup-dark.png` (1400×329) | the reversed lockup — white "Netrivium" + cyan "Technologies" |

The v3 master is the only clean cutout available: 80.6 % fully transparent, real opaque
content, antialiased edges. Two other files in the pack are **not usable**:

- `netrivium-hero-mark-transparent.png` — has **0 % fully-opaque pixels**. The
  background was made semi-transparent rather than removed, so the whole image is
  translucent and renders as a washed-out dark block.
- `netrivium-mark-dotsreduced.png` — failed background removal; black blob artifacts
  scattered across the artwork.

The hero mark is therefore **cropped out of the v3 lockup** (x 40–760), which gives a
clean transparent mark of the identical artwork.

## Files in `public/`

| File | Size | Source |
| --- | --- | --- |
| `netrivium-lockup-light.png` | 1600×370 | v3, trimmed |
| `netrivium-lockup-dark.png` | 1600×369 | reversed master, trimmed |
| `assets/netrivium-hero-mark.png` | 1024×663 | mark cropped from v3 |
| `favicon.ico` | 16→256 in one file | mark from v3 |
| `apple-touch-icon.png` | 180×180 | mark from v3 — iOS ignores SVG apple-touch icons |
| `logo192.png`, `logo512.png` | PWA icons | mark from v3 |
| `favicon-16/32/48/64/128/256.png` | icon set | mark from v3 |
| `og-image.png` | 1200×630 | reversed lockup on brand navy |
| `favicon.svg`, `logo192.svg`, `logo512.svg` | — | the company's own originals, unchanged |

## Where each logo is used

| Component | Asset |
| --- | --- |
| `AppBar.js` | `netrivium-lockup-light.png` / `netrivium-lockup-dark.png`, 64 px tall |
| `Footer.js` | `netrivium-lockup-dark.png`, 56 px tall |
| `FlowingNetwork.js` | `assets/netrivium-hero-mark.png` |

### Header logo switching

The header is `position: fixed` and translucent. At the top of the home page it sits
over the blue hero; everywhere else over the near-white page. One fixed colour is wrong
in one of those places, so it picks between the two approved variants:

```js
const scrolledPastHero = useScrollTrigger({ disableHysteresis: true, threshold: 60 });
const logoOnDarkGround = mode === 'dark' || (isHomePage && !scrolledPastHero);
```

| State | Variant |
| --- | --- |
| Home, at top (blue hero behind the bar) | reversed (`-dark`) |
| Home, scrolled | standard (`-light`) |
| Any other page | standard (`-light`) |
| Dark mode, anywhere | reversed (`-dark`) |

`useScrollTrigger` ships with `@mui/material` — no new dependency.

### Header height: 64 px, not 48

Measured from the lockup's own proportions (total content 447 px tall, wordmark band
93 px, tagline band 32 px):

| Header height | Wordmark caps | Tagline |
| --- | --- | --- |
| 48 px | ~10 px | ~3.4 px — illegible |
| **64 px** | **~13 px** | ~4.6 px — reads as a decorative rule |
| 80 px | ~17 px | ~5.8 px |

The mark is large relative to the text in this lockup, so **the tagline cannot be
legible at any reasonable header size**. 64 px makes "Netrivium Technologies" readable
while keeping the header compact. If the tagline needs to read in the header, the
lockup itself has to be re-proportioned (larger text relative to the mark) — that's a
design decision, not something to fix with CSS.

## Known limitation

The v3 cutout has slight alpha fringing around the outer glow — faint speckles at the
edge of the halo, visible if you zoom in on a light background. It comes from the
master's background removal and is present in the source artwork. Re-cutting from the
original layered file (or the original render without a background) would remove it.

## Not part of the brand work

- `#00B7E3` appears 15 times in `src/`; the logo's cyan is `#35D9FF`. Nothing looks
  wrong today, but the two will drift. Worth reconciling separately.
- Unreferenced files in `public/`: `logo-full.svg`, `logo-horizontal.svg`,
  `logo-horizontal-dark.svg`, `logo-icon.svg`. Nothing imports them.
- `src/components/AnimatedLogo.js` and `SitemarkIcon.js` are imported nowhere.
- `brand-backup/` is local undo material with no purpose in a deployed repo.
