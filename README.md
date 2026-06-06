# NexStore ⚡

Premium electronics storefront with AI shopping assistant. Built with React + Vite.

## Features

- 8 products across 5 categories (AUDIO, COMPUTE, WEARABLE, TIMEPIECE, INPUT)
- Product modal with image zoom + gallery
- Cart drawer with qty controls
- Wishlist
- AI chat assistant (Claude-powered)
- Countdown flash sale timer
- Animated hero canvas
- Confetti on add-to-cart

## Stack

- **React 18** + **Vite 5**
- **Unsplash CDN** for product images (no account needed — public CDN)
- **Anthropic API** for AI chat (`claude-sonnet-4-20250514`)
- **Vercel** for hosting

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and add your Anthropic API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at https://console.anthropic.com/

> **Security note:** This key is exposed to the browser (it's a client-side app). For production, consider proxying Anthropic calls through a backend (e.g. a Vercel Edge Function) so the key stays server-side.

### 3. Run dev server

```bash
npm run dev
```

Open http://localhost:5173

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow prompts. When asked for build settings, Vite is auto-detected.

Add your env var in the Vercel dashboard:  
**Settings → Environment Variables → `VITE_ANTHROPIC_API_KEY`**

### Option B — GitHub + Vercel dashboard

1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Vercel auto-detects Vite — no config needed
5. Add `VITE_ANTHROPIC_API_KEY` under **Environment Variables**
6. Click **Deploy**

### Build command (auto-detected)
```
npm run build
```

### Output directory (auto-detected)
```
dist
```

---

## Image Notes

All product images are served from `images.unsplash.com` — a public CDN. No API key or account is needed. Images use `?auto=format&fit=crop` for optimal WebP/AVIF delivery.

If you see broken images locally due to network restrictions, they will work fine once deployed.

---

## Project Structure

```
nexstore/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx       # All components + data
│   └── main.jsx      # React entry point
├── index.html
├── vite.config.js
├── vercel.json       # SPA routing rule
├── .env.example
├── .gitignore
└── package.json
```
