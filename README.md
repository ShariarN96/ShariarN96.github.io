# Shahriar Namvar — portfolio

Static portfolio for Shahriar Namvar, Chemical Engineering Ph.D. candidate at the University of Illinois Chicago (electrocatalysis, battery testing, and Python data/AI tools). No build step; GitHub Pages serves the files as they are.

Live at **https://shariarn96.github.io/** once published.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | All page content: hero, expertise cards, research focus, featured work, tabbed experience, education, publications, skills, contact |
| `styles.css` | Dark glass-card theme (navy with blue, emerald, and orange accents), layout, and mobile styles |
| `script.js` | Mobile menu, header on scroll, active nav highlighting, experience tabs, and the animated network in the hero |
| `favicon.svg` | Browser tab icon |
| `assets/shahriar-namvar.jpg` | Portrait photo |
| `assets/Shahriar-Namvar-CV.pdf` | CV linked from the "Download CV" buttons |
| `.github/workflows/static.yml` | GitHub Actions workflow that deploys the site on every push to `main` |

## Publish on GitHub Pages

1. On GitHub, create a new **public** repository named exactly `ShariarN96.github.io`.
2. Upload everything in this folder to the repository root, including the hidden `.github` folder. (On the repo page choose **Add file → Upload files** and drag the folder contents in, or use GitHub Desktop / `git push`.)
3. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy static content to Pages" to finish (about a minute).
5. Visit https://shariarn96.github.io/

## Common edits

- **Email**: search `index.html` for `snamva2@uic.edu`.
- **CV**: replace `assets/Shahriar-Namvar-CV.pdf` with a new file of the same name.
- **Photo**: replace `assets/shahriar-namvar.jpg` (square image, about 640×640 px).
- **Featured work card**: copy one `<article class="resource-card">` block. The `card-media` div is the illustration; reuse any existing `media-*` class.
- **New job tab**: add a `<button class="tab">` in the `tab-list` and a matching `<article role="tabpanel">` with the same id pair (`tab-x` / `panel-x`). New panels need the `hidden` attribute.
- **Publication**: copy one `<a class="publication-row">` and update the year, DOI link, title, and journal.
- **Icons**: all icons are `<symbol>` elements at the top of `index.html`; use one with `<svg><use href="#i-name" /></svg>`.
- **Colors**: change `--blue`, `--green`, `--orange` (and their `-rgb` versions) at the top of `styles.css`.
