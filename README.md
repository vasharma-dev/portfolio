# Vansh Sharma — Portfolio

A single-page, animated portfolio (dark futuristic AI theme). No build step — pure HTML/CSS/JS
with GSAP + ScrollTrigger loaded from a CDN.

## Files
- `index.html` — all content/sections
- `style.css` — styling + animations
- `script.js` — particle network, typed text, scroll reveals, counters
- `Vansh_Sharma_Resume.html` — linked from the "Résumé" buttons
- `assets/` — drop your photo here

## Add your photo
Save a square photo as **`assets/profile.jpg`**. It's detected automatically and replaces the
"VS" initials inside the spinning ring. (No code change needed.)

## Preview locally
Just double-click `index.html`. (For the photo auto-detect to work over `file://` it should be
fine in most browsers; if not, use a tiny local server: `npx serve .` or VS Code Live Server.)

## Publish & get a link

### Option A — GitHub Pages (free)
1. Create a public repo, e.g. `vasharma-dev/portfolio`.
2. Push these files to the `main` branch.
3. Repo → **Settings → Pages** → Source: `main` / `/root` → Save.
4. Live at `https://vasharma-dev.github.io/portfolio/` in ~1 min.

### Option B — Netlify / Vercel (free, drag-and-drop)
- Netlify: go to app.netlify.com → "Add new site" → "Deploy manually" → drag this folder in.
- You get a link like `https://vansh-sharma.netlify.app` (renameable).

## Link it from your résumé
Once live, replace `github.com/vasharma-dev` (or add a line) in the résumé with your portfolio URL.

## Tweak content
Everything is plain HTML in `index.html` — edit the text directly. Theme colors live at the top
of `style.css` under `:root` (`--violet`, `--cyan`, etc.).
