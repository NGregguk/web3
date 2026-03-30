# Editorial Watch Template

A polished Next.js product landing page template for watches and similarly detail-led objects.

The template combines:

- a looping hero film
- a dedicated procedural WebGL stage
- editorial typography and structured sections
- light and dark themes
- reduced-motion and static fallbacks

## Stack

- Next.js 16
- React 19
- plain CSS modules and global CSS variables
- GSAP for reveal motion
- Three.js via `@react-three/fiber` for the abstract WebGL scenes

## Run locally

```powershell
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Template Controls

There are two main files to customize:

- `data/templateConfig.js`
  Purpose: brand identity, metadata, theme storage key, hero asset paths, and WebGL figcaptions.
- `data/siteContent.js`
  Purpose: navigation labels, hero copy, product details, specifications, gallery captions, and reviews.

## Asset Locations

Hero video:

- `public/videos/hero-video/watch-turning.mp4`

The secondary WebGL section is procedural, so it does not require a model file in `public/`.

## Quick Customization

1. Update brand and metadata in `data/templateConfig.js`.
2. Replace the hero video path in `data/templateConfig.js`.
3. Rewrite the product copy in `data/siteContent.js`.
4. If needed, retune the procedural WebGL section in `components/webgl/WebglFeatureScene.jsx` and `components/webgl/ScenePrimitives.jsx`.
5. Run `npm run build` before publishing.

## Structure

- `app/`
  Layout, metadata, and global design tokens.
- `components/layout/`
  Header and footer.
- `components/providers/`
  Theme state and persistence.
- `components/motion/`
  GSAP reveal behavior.
- `components/shared/`
  Shared UI building blocks.
- `components/sections/`
  Landing-page sections.
- `components/webgl/`
  Hero media shell and procedural WebGL scenes.
- `data/`
  Template config and all editable content.

## Notes

- The hero video falls back to static artwork for reduced-motion users or media load failures.
- The WebGL stage lazy-loads near the viewport to keep the opening section lighter.
- The template is designed to be edited from the data layer first, not by rewriting components.
