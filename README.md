<div align="center">

# Ethics Toolkit

**Put values into action.** An interactive workspace for ethical review of products, AI systems, and decisions — adapted from the Stanford McCoy Family Center *Ethics Toolkit*.

Five worksheets · nine Value Cards · save, share & export to a polished PDF

</div>

---

## Overview

The Ethics Toolkit turns a paper worksheet process into a focused web app. Teams work through five structured tools — **Future Story**, **Impacts Explorer**, **Ethics Frame**, **Ethics Gauge**, and **Weighing Options** — to surface benefits, harms, and trade‑offs before they ship.

| Capability | What it does |
|---|---|
| **Learn** | Definition, benefits, how‑to, and a worked example for every tool |
| **Use** | A guided worksheet for each tool, with autosave to the form as you type |
| **Save Draft** | Stores the draft privately in your browser (`localStorage`) |
| **Share** | Generates a 6‑character code; collaborators paste it to load the draft |
| **Download PDF** | Exports a professional, print‑ready PDF laid out like the original toolkit |
| **Value Cards** | Nine ethical values with concrete *degrading ↔ promoting* spectra |

Built with **Next.js 14**, **Tailwind CSS**, **@react-pdf/renderer**, and serverless **Redis (KV)** for shared drafts.

---

## Deploy to Vercel

No command line required. The whole flow takes about ten minutes.

### 1 · Put the code on GitHub

Create a new repository and upload these files (or push this repo). Do not add a generated `.gitignore` or README — the project ships its own.

### 2 · Import into Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in with GitHub.
2. **Import** the repository.
3. Keep every default (Framework: *Next.js*, Root: `./`) and click **Deploy**.

In ~90 seconds you get a live URL. Home, Learn, Use, **Save Draft**, **Download PDF**, and Value Cards all work immediately. Only **Share** needs the database below.

### 3 · Enable sharing (the KV database)

Share codes are stored in a serverless Redis instance. This is the part that previously failed when the database was missing or wired up under different variable names — it is now handled automatically, you just need to connect a database once.

1. Open your project in Vercel → **Storage** tab.
2. **Create Database → Upstash → Redis** (the **Free** plan is plenty: 10,000 commands/day).
3. When prompted, **Connect** it to this project. Vercel injects the credentials as environment variables for you.
4. Go to **Deployments**, open the latest one's **⋯** menu, and click **Redeploy** so the new variables are picked up.

That's it. The app accepts either the classic `KV_REST_API_URL` / `KV_REST_API_TOKEN` names **or** the `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` names, so it works no matter which path provisioned the database. If sharing is ever used before a database is connected, the app now shows a clear, actionable message instead of a generic failure.

> **Verifying:** open any worksheet → **Share** → you should get a code. Paste it in **Workspace → Load a shared draft** to confirm round‑trip.

---

## Local development

Requires Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:3000
```

`Save Draft` and `Download PDF` work locally with zero configuration. To test **Share** locally, copy one credential pair from your Vercel project's **Settings → Environment Variables** into a `.env.local` file (see `.env.example`).

---

## The PDF export

`Download PDF` renders the filled worksheet to a vector PDF using `@react-pdf/renderer`. The layout mirrors the original toolkit worksheets — landscape pages, labelled prompt boxes, the red→green Ethics Gauge scale, benefit/harm colour coding, a branded cover, and a per‑page attribution footer. Text is selectable and the file is small. Generation runs entirely in the browser, so it adds no server cost on Vercel.

---

## Project structure

```
app/
├── api/share/
│   ├── route.js            # POST — create a share code
│   └── [code]/route.js     # GET  — load a draft by code
├── lib/kv.js               # Resilient KV client (resolves KV_ or UPSTASH_ vars)
├── pdf/EthicsToolkitPdf.jsx # Professional PDF document + download helper
├── EthicsToolkitApp.jsx    # All UI (tools, learn/use, workspace, value cards)
├── globals.css             # Fonts + Tailwind base
├── layout.jsx              # Root HTML shell
└── page.jsx                # Entry point
```

**Data:** personal drafts live only in the browser's `localStorage`; shared drafts live in Redis keyed by the 6‑character code and expire after 90 days. Nobody can see your saved drafts unless you generate and send a code.

---

## Attribution & License

This project is an **independent adaptation** of:

> **Ethics Toolkit: Put Values Into Action** (v1.1, October 2025) — Manuela Travaglianti & Thomas Both, McCoy Family Center for Ethics in Society, Stanford University.

The original toolkit is released under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)** — <https://creativecommons.org/licenses/by/4.0/>. That license permits use, adaptation, and redistribution (including commercially), provided attribution is given, the license is linked, and changes are indicated.

**Changes made:** the original PDF worksheets were adapted into an interactive web application — content was reorganized into form‑based input, some explanatory text was condensed, an interactive Ethics Gauge and Value Cards were added, and a custom PDF export was implemented. The branding mark used here is this project's own and is **not** Stanford's logo.

> This is an independent adaptation. It is **not** affiliated with, maintained by, or endorsed by Stanford University or the McCoy Family Center for Ethics in Society.

The attribution, license link, and change note above are reproduced on the app's home page and in every exported PDF, satisfying the CC BY 4.0 conditions.

**This project's own code** is released under the **MIT License**. The adapted toolkit *content* remains under **CC BY 4.0**, inherited from the source — keep this attribution intact if you fork.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| *"Sharing is not configured…"* | Connect Upstash Redis (Storage tab) and **redeploy** — see step 3. |
| Share code not found | Codes expire after 90 days; check for typos (input is auto‑uppercased). |
| Saved drafts vanished | They live in `localStorage` — cleared browser data, a different browser, or incognito will not show them. Use Share or Download PDF to move work between devices. |
| Build fails on Vercel | Ensure `package.json` was uploaded so dependencies install. |
