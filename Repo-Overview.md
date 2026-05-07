# StackUp — Repository Overview

See root `**README.md**` for portfolio context, deploy notes, and a concise changelog.

---

## What this project is

**StackUp** is a **static, multi-page marketing / novelty web app** that lets someone enter a **monthly salary**, pick a **high-net-worth public figure** from a gallery, and land on a **rich comparison results page** with animations, charts, and playful “wealth gap” stats. The codebase uses **lots of imagery** (celebrity tiles, backgrounds, chart textures, badges); your local clone folder name may differ from the product name **StackUp**.

There is **no backend**, **no package manifest** (`package.json`), and **no build step** in the tracked tree: it is **plain HTML + CSS + JavaScript**, suitable for static hosting (the root `**CNAME`** file contains `stackup.app`, which is typical of **GitHub Pages** with a custom domain). **License:** MIT — see `**LICENSE`** (copyright John Anthony).

---

## Repository layout

| Location | Responsibility |
| -------- | ---------------- |
| **`index.html`** | Landing — salary capture, EUR-style adjustment checkbox, routing to **`pages/selection.html`** |
| **`pages/selection.html`** | Sortable searchable grid → **`result.html`** |
| **`pages/result.html`** | Charts, timers, modal content, footer |
| **`css/`** | `reset.css`; page skins: `style.css`, `style-selection.css`, `style-result.css`; shared `header.css`, `style-footer.css` |
| **`js/`** | Navigation chrome, **`localStorage`**, math, Chart.js adapters, UI popovers |
| **`images/`** | Icons; HTML references additional PNG/JPG paths that may be absent depending on checkout |
| **`.gitignore`** | Mixed template (IDE/build noise + project-specific exclusions) |
| **`README.md`** | Project overview, runbook, Pages notes |
| **`LICENSE`** | MIT |

---

## User journey

### 1. Landing (`index.html`)

- User submits **monthly salary** with comma normalization; **`MAX_SALARY`** capped in **`js/landing.js`** (high bound to avoid unrealistic input and numeric edge cases).
- Optional currency control multiplies entered value by **`~1.09`** before persistence.
- **Compare** stores **`userSalary`** in **`localStorage`** then loads **`pages/selection.html`**.

### 2. Selection (`pages/selection.html`)

- **`selection.js`** filters by name; sorts by parsed **`p.net-worth`** text.
- Selecting a figure writes **`starName`**, numeric **`netWorth`**, and **`profileImage`** (asset URL), then navigates to **`result.html`**.

### 3. Results (`pages/result.html`)

- **`result.js`**: scroll-synced **`jet_riche.mp4`** playback; restores **`starName`** and hero image via storage.
- **`fieldSalary.js`**: computes comparison statistics from **`netWorth / 10`** (schematic decade-style denominator), illustrative lifestyle metrics (**CountUp**, live counter).
- **`graph.js`**: Chart.js donut and GDP-scale bar visuals with minimum-slice safeguards.
- **`popup.js`** / **`header.js`** / **`landing.js`** (landing only): ancillary UI behaviors.

CDN: Chart.js **4.4.2**, CountUp **2.0.7**.

---

## Technical notes

- **State**: **`localStorage`** only — **`userSalary`**, **`starName`**, **`netWorth`**, **`profileImage`**; clearing storage resets the funnel.
- **Figures**: **Illustrative**; not auditing-grade finance.
- **Locale**: Primary UI **English**.
- **Analytics**: `gtag` ID **`G-T7E23MRMSX`** wired on HTML shells.
- **Footer**: Attribution **John Anthony** — link **`https://github.com/anthonyjohn17`**; landing retains Forbes / Product Hunt badge assets.

---

## Implementation detail

Several **`pages/result.html`** `<script>` lines place **`defer` on its own physical line**, so **`defer`** is **not** a valid HTML attribute token for those URLs. Scripts execute in DOM order instead. **`graph.js`** expects globals from **`result.js`** / **`fieldSalary.js`**.

---

## Summary

Delivered **by John Anthony** ([profile](https://github.com/anthonyjohn17)): a static **salary-versus-net-worth comparison** SPA with visualization and motion. Binary assets serve the UX only — this repo is not an image-generation pipeline.
