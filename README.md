<div align="center">

# Ethics Toolkit

### Move ethics from theory into team practice.

An interactive workspace for AI governance reviews, product ethics, and design decisions. Five structured worksheets, nine value cards, save and share your work, export to a print-ready PDF. Adapted from the Stanford McCoy Family Center *Ethics Toolkit* under CC BY 4.0.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/Code-MIT-green.svg?style=flat-square)](#license)
[![Content: CC BY 4.0](https://img.shields.io/badge/Content-CC%20BY%204.0-blue.svg?style=flat-square)](https://creativecommons.org/licenses/by/4.0/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black.svg?style=flat-square&logo=vercel)](https://vercel.com/new)

[**Live demo**](#) · [**Quick start**](#quick-start) · [**Use cases**](#use-cases) · [**Architecture**](#architecture)

</div>

---

## Why this exists

Ethics frameworks tend to fail at the same point. They give you principles ("respect autonomy, ensure fairness") and leave you to figure out what to do, or they hand you a 200-question compliance checklist that nobody fills in honestly.

The Stanford McCoy Family Center solved the middle layer. Five worksheets, sized for one team meeting each, that force structured thinking about benefits, harms, distribution, and trade-offs. The original ships as a PDF. This project turns that PDF into a workspace your team actually opens during product reviews.

> Use it when you need a one-page artifact at the end of a sixty-minute discussion. Not when you need to read about ethics.

---

## What's inside

Five tools, organized by where you are in your process. Each has a Learn tab with the toolkit's definition and worked example, and a Use tab with a guided worksheet.

| Stage | Tool | Use when |
|---|---|---|
| **Explore** | Future Story | You're early. You want to imagine the long-term consequences before committing. |
| **Explore** | Impacts Explorer | You need to map second- and third-order effects of a decision. |
| **Evaluate** | **Ethics Frame** | You have a plan and need a one-page artifact capturing values, benefits, harms, distribution, and your verdict. |
| **Evaluate** | Ethics Gauge | You want a quick visual assessment across benefit, harm, fairness, and empowerment. |
| **Decide** | Weighing Options | You're choosing between two or more concrete paths. |

Plus nine **Value Explainer Cards** (Well-being, Justice, Trust, Privacy, Dignity, Virtues, Autonomy, Responsibility, Relationships), each with degrading↔promoting spectra you can reference while filling in any tool.

---

## Features

#### **Save your work locally**
Drafts persist in `localStorage`, scoped to your browser. No account required, nothing leaves your device.

#### **Share by code**
Generate a six-character code, send it to a collaborator. They paste it into Workspace and your draft opens. Backed by serverless Redis, codes expire after ninety days.

#### **Export to PDF**
Render any filled worksheet to a vector PDF that mirrors the original toolkit's layout. Selectable text, branded cover page, per-page attribution footer. Generation runs entirely in the browser.

#### **Built for facilitators**
A guided worksheet for every tool. Helper prompts on every field. The Ethics Gauge ships with real sliders (red→green) instead of static circles. Add custom Value Cards or extend tools without touching the data layer.

---

## Quick start

### Deploy to Vercel in ten minutes

No command line. You will need a GitHub account and a Vercel account (both free).

1. **Create a new GitHub repo** at [github.com/new](https://github.com/new). Skip the README and `.gitignore` checkboxes (the project ships its own).
2. **Drag every file** from this folder into GitHub's web uploader. Commit.
3. **Import into Vercel** at [vercel.com/new](https://vercel.com/new). Accept defaults. Click Deploy.
4. **Wait ninety seconds.** You will get a URL like `ethics-toolkit-yourname.vercel.app`.

The app is fully functional at this point. Learn, Use, Save Draft, Download PDF, and Value Cards work immediately.

### Enable sharing (optional, one extra step)

Only the **Share by code** feature needs a database.

5. In your Vercel project → **Storage** → **Create Database** → **Upstash Redis** (Free plan).
6. **Connect** to your project. Vercel auto-injects credentials.
7. **Redeploy** from the Deployments tab.

The app accepts either `KV_REST_API_*` or `UPSTASH_REDIS_REST_*` variable names, so it works regardless of which path provisioned the database. If sharing is attempted before a database is connected, the app shows a clear actionable message rather than failing silently.

### Verify

Open any worksheet → **Share** → confirm you get a code. Paste it into **Workspace → Load a shared draft** for a round-trip test.

---

## Local development

```bash
git clone <your-repo>
cd ethics-toolkit
npm install
npm run dev          # http://localhost:3000
```

Requires Node.js 18+.

`Save Draft` and `Download PDF` work locally with zero configuration. To test `Share` against your production database, copy `KV_REST_API_URL` and `KV_REST_API_TOKEN` from Vercel's **Settings → Environment Variables** into a `.env.local` file.

---

## Use cases

### AI governance reviews in industry

You are the AI Governance SME at a tech company. A product team wants to ship an AI feature. You schedule a ninety-minute workshop, walk them through **Ethics Frame**, and produce a filled worksheet that becomes the governance artifact attached to the launch decision. PDF export goes into the audit trail.

### Workshop facilitation

You run an ethics workshop for a class, a research lab, or a product team. Open one tool on screen. The interactive form keeps the discussion structured. At the end, export the PDF and email it to participants as a record of what the group decided.

### Classroom assignments

Stanford's ETPP and similar practitioner courses assign the Impact Explorer or Ethics Frame for real situations. Fill it in here, export the PDF, upload to the course portal.

### Solo product reviews

You're a founder, a PM, or a researcher. You want to think through an ethical decision rigorously without committing to a team workshop. Open Ethics Frame, fill it in, save the draft. Revisit in two weeks.

---


**Privacy model.** Personal drafts never leave your browser. Only drafts you explicitly Share are uploaded to Redis, keyed by a six-character code. Without the code, the draft cannot be retrieved. Codes expire after ninety days. No accounts, no analytics, no tracking.

---

## Project structure

```
app/
├── api/share/
│   ├── route.js              POST  · create a share code
│   └── [code]/route.js       GET   · load a draft by code
├── lib/kv.js                 Resilient KV client (resolves KV_ or UPSTASH_ vars)
├── pdf/
│   └── EthicsToolkitPdf.jsx  Vector PDF document + download helper
├── EthicsToolkitApp.jsx      All UI: tools, learn/use, workspace, value cards
├── globals.css               Fonts (Fraunces, Manrope, Source Serif 4) + Tailwind
├── layout.jsx                Root HTML shell
└── page.jsx                  Entry point
```

---

## Customization

### Brand colors

Edit the navy `#1c3a5e` and cardinal `#8C1515` defaults in `tailwind.config.js` and `app/EthicsToolkitApp.jsx`. The accent system is two colors plus neutrals, so switching takes minutes.

### Add custom Value Cards

Append to the `VALUE_CARDS` array in `app/EthicsToolkitApp.jsx`:

```js
{
  name: 'Sustainability',
  definition: 'Meeting present needs without compromising future generations.',
  spectra: [
    ['Our creation depletes resources rapidly.',
     'Our creation uses resources responsibly.'],
    // two more spectra
  ],
}
```

### Add a new tool

Register it in the `TOOLS` object, write a `*Use` component for the worksheet, and add it to `USE_PANELS`. The navigation picks it up automatically.

### Logo

Replace the concentric-circle mark in the header with your organization's logo. Keep attribution to Stanford visible elsewhere on the page.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Single project deploys frontend + serverless API |
| Styling | Tailwind CSS 3.4 | Utility-first, fast to iterate |
| Icons | Lucide | Consistent, lightweight, customizable |
| PDF | @react-pdf/renderer | Vector output, no headless browser required |
| Database | Upstash Redis | One-click Vercel integration, generous free tier, sub-millisecond reads |
| Hosting | Vercel | Edge functions, zero-config Next.js deployment |

The whole stack is **free for normal use**. Vercel Hobby plan and Upstash Free tier together handle hundreds of share operations per day at zero cost.

---

## Roadmap

The current version is feature-complete for individual and small-team use. Future directions worth considering:

- **Team workspaces** with shared draft libraries (would require accounts and a relational database)
- **Custom worksheet builder** for organizations to define their own ethics review templates
- **Comparison view** that diffs multiple Ethics Frames across teams or quarters
- **Slack / Linear integrations** for triggering reviews from existing workflows
- **i18n** for non-English deployments

These are not committed. Suggestions are welcome via Issues.

---

## Attribution

This project is an **independent adaptation** of:

> **Ethics Toolkit: Put Values Into Action** (v1.1, October 2025)
> Manuela Travaglianti and Thomas Both
> McCoy Family Center for Ethics in Society, Stanford University
> [ethicstoolkit.stanford.edu](https://ethicstoolkit.stanford.edu)

The original is released under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/). That license permits use, adaptation, and redistribution including commercially, provided attribution is given, the license is linked, and changes are indicated.

**Changes made in this adaptation.** The original PDF worksheets were transformed into an interactive web application. Content was reorganized into form-based input, some explanatory text was condensed, an interactive Ethics Gauge with draggable sliders was added, the Value Cards were given a click-to-expand interaction model, and a custom branded PDF export was implemented. The branding mark used in the header is this project's own and is not Stanford's logo.

> This project is **not affiliated with, maintained by, or endorsed by** Stanford University or the McCoy Family Center for Ethics in Society.

The attribution, license link, and change note above appear on the app's home page and in every exported PDF, satisfying CC BY 4.0 conditions.

---

## License

**Code** (this implementation): [MIT](LICENSE)
**Content** (toolkit text, worksheet structure, value cards): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), inherited from the source

If you fork, keep both notices intact.

---

## Troubleshooting

<table>
<tr><th>Symptom</th><th>Fix</th></tr>
<tr>
  <td><em>"Sharing is not configured…"</em></td>
  <td>Connect Upstash Redis (Storage tab in Vercel) and redeploy. See step 5 of Quick start.</td>
</tr>
<tr>
  <td>Share code not found</td>
  <td>Codes expire after 90 days. Input is auto-uppercased so case is not an issue, but check for typos.</td>
</tr>
<tr>
  <td>Saved drafts vanished</td>
  <td>Drafts live in <code>localStorage</code>. Clearing browser data, using a different browser, or incognito mode will not show them. Use Share or PDF export to move work between devices.</td>
</tr>
<tr>
  <td>Build fails on Vercel</td>
  <td>Ensure <code>package.json</code> was uploaded so dependencies install. Check the deployment logs.</td>
</tr>
<tr>
  <td>PDF export looks wrong</td>
  <td>Some browsers cache fonts aggressively. Hard-refresh (Cmd/Ctrl+Shift+R) and retry.</td>
</tr>
</table>

---

## Acknowledgments

To Manuela Travaglianti and Thomas Both at Stanford McCoy for building the original toolkit and releasing it under a license that allows this kind of work. To the Project Liberty Institute for funding it. To everyone who has used ethics frameworks in industry settings and confirmed that the PDF format was the bottleneck, not the content.

---

<div align="center">

**Built for AI governance practitioners, research teams, and anyone who has to make hard calls about technology.**

<sub>An independent adaptation. Not affiliated with Stanford University.</sub>

</div>
