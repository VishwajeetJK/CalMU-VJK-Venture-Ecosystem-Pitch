# CalMU X Vishwajeet Venture Ecosystem — Orbital Venture Engine

A high-fidelity, interactive Venture Pitch web application built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Theme & branding

- **Background:** Creamy Green (`#fdfdf6`)
- **Accents:** Deep Black (`#000000`), Lime/Chartreuse (`#d9f99d`)
- **Fonts:** Playfair Display (headers), Inter (body)

## Features

- **Sticky nav:** Dark navbar with logo, Methodology / Roadmap / Simulator links, and “Hire Vishwajeet” CTA with lime hover
- **Hero:** “Orbital Venture Engine” title and interactive pentagon diagram (center card + 5 orbital cards with animated power lines)
- **Roadmap:** 15-month vertical timeline (Phase I–III) with Framer Motion
- **Hire section:** Profile card, compensation, 12+3 Month protocol, Global Founder proposition

## Logo

Place the CalMU logo as **`public/logo.png`** so it appears in the navbar. If the file is missing, a “C” fallback is shown.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy on GitHub Pages (github.io)

1. **Enable GitHub Pages:** In your repo go to **Settings** → **Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
2. **Push to trigger deploy:** Every push to `main` runs the workflow. After it completes, the site is live at:
   **https://vishwajeetjk.github.io/CalMU-VJK-Venture-Ecosystem-Pitch/**
3. To deploy now, push any commit to `main` (or re-run the **Deploy to GitHub Pages** workflow from the **Actions** tab).

**Campus video:** The Campus Walk video is not in the repo (size limit). Host `calmu-campus-walk.mp4` elsewhere (e.g. Cloudinary, YouTube unlisted) and set the video `src` in `CampusInfrastructureSection.tsx`, or add it to `public/` and redeploy.
