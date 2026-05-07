# StackUp

**StackUp** is a playful, polished **static web app** that compares your **monthly salary** to the **published net worth** of well-known figures. Enter your pay, choose someone from the gallery, then explore scroll-driven visuals, Chart.js dashboards, animated stats, and pop-up explainers on the results page.

[License: MIT](LICENSE)

**Live site (GitHub Pages):** [https://anthonyjohn17.github.io/StackUp/index.html](https://anthonyjohn17.github.io/StackUp/index.html) (same as […`/StackUp/`](https://anthonyjohn17.github.io/StackUp/))

The hostname **stackup.app** is not this project’s hosting: it is a separate domain on the public internet (often sold or parked).

**Works in incognito but normal Chrome sends you to GoDaddy / `stackup.app`:** while this repo used a **custom domain**, GitHub Pages typically replied with a **permanent redirect (301)** from **`anthonyjohn17.github.io`** to **`stackup.app`**. Chrome **caches 301s for a long time**; Incognito has a clean cache, so it sees the current behavior (no redirect). This is browser state, not something the repo can override.

**Fix in Chrome (pick one):**

1. **Clear cached data for GitHub’s host:** paste `chrome://settings/content/all` in the address bar → search **`github`** → open **`github.io`** → **Delete data** (or use **Delete browsing data…** and include **Cached images and files**).
2. **One-off bypass:** open [`…/StackUp/index.html`](https://anthonyjohn17.github.io/StackUp/index.html) or add a junk query (e.g. `…/StackUp/?v=2`); that URL is often **not** the same cache entry as the old redirect.
3. Remove bookmarks / typed history that still open **`stackup.app`** directly.

---

## Architecture

- **End-to-end product shape:** landing → selection → immersive results without a backend.
- **Modern UI craft:** responsive layout, sticky/blur header, bento-grid storytelling, CDN libraries used intentionally (Chart.js, CountUp).
- **Stateful static app:** progression is driven entirely by `**localStorage`** (`userSalary`, `starName`, `netWorth`, `profileImage`).
- **Zero build step:** ship as plain HTML/CSS/JS — ideal for GitHub Pages or any static host.

---

## Features


| Area | Description |
| ---- | ----------- |
| **Landing** | Comma-formatted salary input, USD/EUR-style adjustment toggle, bounded validation, entry into the comparison flow |
| **Selection** | Keyword search, net-worth sorting, summary of entered salary in the header, persisted profile choice per card tap |
| **Results** | Scroll-synced hero video, profile and comparison copy, doughnut and bar charts, incremental counters, modals |


Net worth figures on cards are **illustrative snapshots** for UX (not audited valuations). Comparative math on the results page uses **simple heuristics** (for example interpreting star wealth as a rough decadal proxy) — it’s intentional fun, not financial advice.

---

## Tech stack

- **HTML5**, **CSS3** (per-page skins, shared layout tokens)
- **Vanilla JavaScript**
- **[Chart.js](https://www.chartjs.org/)** and **[CountUp.js](https://github.com/inorganik/CountUp.js)** via CDN
- **Google Analytics** (`gtag`) — replace or remove measurement ID **`G-T7E23MRMSX`** when repointing hosting

---

## Repository layout

```
├── index.html              # Landing / salary capture
├── pages/
│   ├── selection.html      # Celebrity picker
│   └── result.html        # Charts, stats, video, footer
├── css/                    # Styles (reset, layouts, themes)
├── js/                     # All client behavior
├── images/                 # UI assets (full celeb PNG set may vary by checkout)
├── serve-dev.py            # Tiny local server with cache-busting headers
├── Repo-Overview.md       # Deeper architectural notes
├── LICENSE                 # MIT
└── README.md               # You are here
```

---

## Local development

Serve the **repository root** so paths (`/images/`, `pages/`, etc.) resolve.

```bash
python3 serve-dev.py
```

Open **http://127.0.0.1:8080/** .

Alternatively use any static server (VS Code Live Server, `npx serve`, etc.) rooted at this directory.

---

## Deployment (GitHub Pages)

1. Push the repository to GitHub.
2. Enable **Pages** with source **branch `main`** and folder **`/` (root)**.
3. The site is served at **`https://<user>.github.io/<repo>/`** (for example `https://anthonyjohn17.github.io/StackUp/` or `…/StackUp/index.html`).
4. Update or strip **Google Analytics** if you fork the repository.

---

## Maintenance summary

- **Landing:** Increased salary ceiling and input width; navigate back via **Change salary** / branding; persisted salary repopulates the field after return.
- **Selection:** Salary summary in fixed header; one legacy card removed from the grid; card net-worth text refreshed from periodic list snapshots (**illustrative**).
- **Attribution:** **John Anthony**, **https://github.com/anthonyjohn17**. Discord-oriented UI and links removed; Discord icon asset deleted.
- **Documentation:** README (this document), **`Repo-Overview.md`** (internals), **`LICENSE`**.

Further detail: [`Repo-Overview.md`](Repo-Overview.md) (`localStorage` contract, **`result.html`** script ordering, etc.).

---

## License

Released under the [MIT License](LICENSE).

Copyright © John Anthony.
