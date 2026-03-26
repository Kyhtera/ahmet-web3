# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run Next.js linting
```

## Architecture

This is a **Next.js portfolio/personal brand website** for Ahmet USLU — a musician, developer, and artist. The site is primarily Turkish-language.

### Data Flow

```
posts/*.md (markdown with YAML frontmatter)
    → lib/posts.js (gray-matter parsing)
    → pages/index.js + pages/posts/[slug].js (getStaticProps/Paths)
    → src/components/* (Framer Motion animations)
    → Browser (Lenis smooth scrolling)
```

### Page Structure

- `pages/index.js` — Single-page layout rendering all section components in sequence (Hero → Music → Projects → Videos → Drawings → BlogSection → About)
- `pages/posts/[slug].js` — Dynamic blog post pages rendering markdown as HTML; uses ISR (`revalidate: 60`)
- `pages/api/blog-data.js` — Hardcoded blog metadata API (appears legacy/unused; BlogSection uses static props)

### Component Patterns

- All animated components use **Framer Motion** (`useScroll`, `useTransform`, `AnimatePresence`, `motion.*`)
- **Lenis** handles global smooth scrolling, initialized in `_app.js`
- `Header.js` tracks scroll state for visual changes and manages a mobile hamburger menu
- Section components receive data via props from `getStaticProps` in `pages/index.js`

### Styling

- Single global CSS file: `styles/globals.css` with the full design system
- CSS variables: dark theme (`#111111` bg, `#ff3333` accent), custom easing `cubic-bezier(0.22, 1, 0.36, 1)`
- Custom fonts: Space Grotesk, Syne, Zen Dots, Inter (loaded via `_document.js`)
- Fluid typography via `clamp()`, glassmorphism via `backdrop-filter: blur`

### Path Aliases

`@/*` resolves to the project root (configured in `jsconfig.json`).

### Blog Content

Markdown files live in `/posts/`. Gray-matter parses YAML frontmatter; remark converts body to HTML. Adding a new post just requires adding a `.md` file to that directory.
