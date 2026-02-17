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

## Deploy

The repo is set up for **Vercel** (recommended for Next.js):

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New** → **Project** and import **VishwajeetJK/CalMU-VJK-Venture-Ecosystem-Pitch**.
3. Leave the default settings (Framework: Next.js) and click **Deploy**.
4. Your site will be live at `https://your-project.vercel.app`. You can add a custom domain in Project Settings.

**Campus video:** The Campus Walk video is not in the repo (size limit). After deploy, add `calmu-campus-walk.mp4` to the `public/` folder via Vercel’s dashboard or redeploy with the file included locally, or host it elsewhere and set the video `src` in `CampusInfrastructureSection.tsx`.
