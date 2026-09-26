# Brand: logo and colors

This file is the reference for the Web Scraper Pro logo and brand colors. Use it whenever you place
the logo, pick an accent color, or add a new colored element to the site.

## The logo

The logo is a bold, forward-leaning letter **W** drawn as one continuous stroke, on a brand-blue
rounded-square tile. The last stroke ends early, and a **mint dot** completes it. The dot stands for
a single piece of collected data. The forward lean gives the mark a sense of motion.

The mark has three parts:

| Part | Color | Notes |
|---|---|---|
| Tile | Brand blue `#2772ED` | Rounded square, corner radius about 23% of the width |
| W | White `#FFFFFF` | One stroke, heavier on the downstrokes, slanted forward about 10° |
| Dot | Mint 300 `#7CF2C4` | Always a perfect circle, never slanted with the W |

The W and the dot together fill about 90% of the tile, which leaves clear space around the dot.

### Files

| File | Use |
|---|---|
| `public/logo.svg` | Header, footer, and anywhere the logo appears on a page |
| `public/favicon-16.png` | Browser tab icon on standard screens |
| `public/favicon-32.png` | Browser tab icon on high-density screens |
| `public/apple-touch-icon.png` | iPhone and iPad home-screen icon (180×180) |

The favicon settings live in `app/layout.tsx` (`metadata.icons`). The PNGs are listed first so
browsers use them for tabs; the SVG is the fallback.

The master files live in the extension repo, not here:

- `chrome-extension-source/web_store_assets/logo/logo.svg`: the master logo.
- `chrome-extension-source/web_store_assets/logo/logo-16.svg`: the 16px version, with a larger dot
  so the mint still shows at toolbar size.
- `chrome-extension-source/scripts/build-icons.mjs`: renders the extension icon set from those two
  files.

### Animated marks

The extension's chat shows the logo, without its tile, as a small spider while it works. The same
marks are available here as standalone SVGs in `public/brand/`, for loading states and demos:

| File | Motion | Use |
|---|---|---|
| `thinking-crawl.svg` | The dot walks along the W's strokes, pausing at each joint | Collecting: a tool is running ("Searching maps…") |
| `thinking-step.svg` | The W's two halves rock like legs stepping in place | Waiting: the assistant is thinking |
| `thinking-scuttle.svg` | Legs step while the mark slides side to side | Not used in the product yet; for larger moments |
| `logo-mark.svg` | Still | The mark at rest, and the fallback for reduced motion |

Use them with a plain `<img>`, for example `<img src="/brand/thinking-crawl.svg" alt="" width="28"
height="28">`. They switch to the dark-mode colors on their own when the viewer's system is in dark
mode. The motion is SMIL, which an `<img>` can't pause, so when the viewer prefers reduced motion,
show `logo-mark.svg` instead.

These files are generated from `components/chat/ThinkingMark.tsx` in `chrome-extension-source` by
`npx vite-node scripts/build-logo-animations.ts`, which writes them to
`web_store_assets/logo/animations/`. Change the animation there, then copy the files here again.

### Changing the logo

1. Edit the master files in `chrome-extension-source/web_store_assets/logo/`.
2. In `chrome-extension-source`, run `node scripts/build-icons.mjs` to regenerate `public/icon/`.
3. Copy the results into this repo:
   - `web_store_assets/logo/logo.svg` → `public/logo.svg`
   - `public/icon/16.png` → `public/favicon-16.png`
   - `public/icon/32.png` → `public/favicon-32.png`
4. Re-render `public/apple-touch-icon.png` at 180×180 from `public/logo.svg`.
5. Check the logo at 16px in a real browser tab. That's the size where problems show first.

### Rules

- Don't stretch, rotate, or recolor the logo. The dot is always mint, the W always white.
- Don't place the blue tile directly on a brand-blue background. Put it on white, a light surface,
  or a dark surface.
- Don't add effects: no shadows, outlines, gradients, or glow.
- Keep clear space around the tile of at least a quarter of its width.
- Don't show the logo smaller than 16px.

## Colors

### Brand blue

| Token | Hex | Use |
|---|---|---|
| Brand blue | `#2772ED` | Primary buttons, links, active states, the logo tile |

Brand blue is the **only** color for main action buttons, such as "Add to Chrome". Don't make buttons
in the accent color.

### Mint accent

Mint is the brand accent. Mint 300 is the brand color itself. The other shades exist because
Mint 300 is too pale to read on white (1.4:1 contrast).

| Token | Hex | Contrast | Use |
|---|---|---|---|
| Mint 300 | `#7CF2C4` | 3.3:1 on blue, 13:1 on dark | The logo dot. Highlights and small labels on blue or dark backgrounds only |
| Mint 50 | `#EAFBF4` | Background only | Soft backgrounds for badges and highlight cards on white |
| Mint 600 | `#12A37B` | 3.2:1 on white | Icons, checkmarks, and other non-text accents on white |
| Mint 700 | `#0B7A5C` | 5.3:1 on white | Accent text on white, such as badge labels and secondary links |

Use mint for:

- Badges and status labels ("New", "48 rows collected").
- Checkmarks in feature lists.
- Highlights behind a key word in a headline.
- Small accent labels on blue or dark sections.

Don't use mint for:

- Primary buttons.
- Body text.
- Large filled areas that compete with brand blue.

### Text colors

These match the extension's text tokens, so the site and the product read the same.

| Token | Hex | Use |
|---|---|---|
| Ink | `#0F172A` | Headings and strong text |
| Ink muted | `#334155` | Body text |
| Ink subtle | `#475569` | Captions and small print |

### Existing green on the site

Many components still use Tailwind's `emerald-*` classes for checks and badges. Emerald is close to
the mint family but not the same. When you touch one of those components, switch it to the mint
tokens above.
