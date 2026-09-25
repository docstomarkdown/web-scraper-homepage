# webscraper-homepage — agent rules

Marketing site for Web Scraper Pro (Next.js App Router, Tailwind, framer-motion). These rules apply
to any coding agent working in this repo.

## Light and dark mode — always both

The site follows the visitor's OS setting (`prefers-color-scheme`). There is **no theme switch**, and
none should be added.

- Theme comes from `next-themes` in `components/theme-provider.tsx` (`defaultTheme="system"`,
  `attribute="class"`, own `storageKey`). Don't change it to a fixed theme and don't render
  `components/theme-toggle.tsx` anywhere.
- **Every light colour class gets a `dark:` counterpart in the same class string.** Page and section
  backgrounds use `dark:bg-slate-950`; cards and panels `dark:bg-slate-900`; borders
  `dark:border-slate-800`; text steps up the scale (`text-slate-900` → `dark:text-white`,
  `text-slate-600` → `dark:text-slate-300`, `text-slate-500` → `dark:text-slate-400`). Brand blue
  `#2772ED` works in both. The darker link blue `#1f5ec2` pairs with `dark:text-[#7aa7ff]`.
- **No hard-coded light colours in inline styles or animations** (`#fff`, `#e2e8f0`, …). For
  patterns, set the colour with a class (`text-slate-300 dark:text-slate-700`) and use
  `currentColor` in the style. For highlight animations, animate a `boxShadow` ring rather than a
  light `borderColor`.
- Decorative glows and gradients need dark variants too (a `blue-50` blob becomes a grey smudge on
  a dark background).
- **Verify both modes before calling UI work done.** In the browser pane, emulate `colorScheme: dark`
  and then `light`, reload, and check the changed section at desktop and phone widths. Screenshot
  proof of both.

## SEO-ready structure

Build every section so a later SEO pass only has to tune it, not restructure it:

- One `<h1>` per page (the hero). Each section gets an `<h2>`; items inside a section get `<h3>`.
- Keep text as real text. Never bake copy into images, and never render key copy only through
  JavaScript after load.
- Link text says where it goes ("Scrape local business leads"), never "Learn more" or "Click here".
- Describe each feature or data type in a sentence or two, with the fields it returns, not just a label.
- Decorative images and icons get `aria-hidden` or empty `alt`; meaningful images get descriptive `alt`.

## Copy rules

- **Before writing or changing any page or post**, read `docs/content-standards.md` (helpful content,
  spam policies, duplicates, internal/external links, per-page-type rules, pre-publish checklist) and
  `docs/writing-style.md` (voice, word list, structure). Both are binding. New pages go where
  `docs/site-structure.md` says; update its status column when a page ships.
- Review new or changed copy by walking the page as each persona in `docs/personas.md`, and keep copy
  consistent with the product facts listed there.

- Write "Maps" / "Maps leads", never "Google Maps" (trademark). That includes mock address bars in
  demos.
- No invented proof: no user counts, star ratings, testimonials, or logos unless they are real and
  sourced.
- Demo/sample data must be clearly fake (555 phone numbers, generic names) and labelled "Sample data".

## Other

- Logo files, logo usage rules, and brand colors (brand blue plus the mint accent family) are in
  `docs/brand.md`. Use those tokens for new colored elements instead of arbitrary Tailwind colors.
- Respect `prefers-reduced-motion` in animated components (`useReducedMotion` from framer-motion):
  show the final state without motion.
- Layouts must work at phone width (375px) with no horizontal scroll.
- The site is deliberately `noindex` (`middleware.ts`, `app/robots.ts`). Don't change that without
  the owner's say-so.
