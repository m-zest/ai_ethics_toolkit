# Ethics Toolkit

An interactive web app that turns the Stanford McCoy Family Center Ethics Toolkit into a usable workspace. Five worksheets (Future Story, Impacts Explorer, Ethics Frame, Ethics Gauge, Weighing Options), nine Value Cards, draft saving, and code-based sharing.

Built with Next.js 14, Tailwind CSS, and Vercel KV (Redis) for shared drafts.

---

## What it does

- **Learn each tool** — definitions, benefits, how-to, and worked examples from the original toolkit
- **Use each tool** — interactive form for that worksheet, saves as you type
- **Save Drafts** — stored in your browser (localStorage)
- **Share Drafts** — generates a 6-character code; collaborators paste it to load
- **Export Drafts** — download as Markdown for sharing outside the tool
- **Value Cards** — all 9 ethical values with degrading-vs-promoting spectra

---

## Deploy to Vercel (10 minutes, no command line needed)

The fastest path uses Vercel's GitHub integration. You will not need Node or npm installed locally.

### Step 1: Put this code in a GitHub repo

1. Go to [github.com/new](https://github.com/new) and create a new empty repo, e.g. `ethics-toolkit`.
2. Don't initialize with README or `.gitignore` (this project has its own).
3. On GitHub, click "uploading an existing file".
4. Drag every file from this folder (including `app/`, `package.json`, `.gitignore`, etc.) into the upload area.
5. Commit.

### Step 2: Import the repo into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Click "Import" next to your `ethics-toolkit` repo.
3. Leave all defaults (Framework Preset: Next.js, Root Directory: `./`).
4. Click "Deploy".

You'll get a live URL like `ethics-toolkit-yourname.vercel.app` in about 90 seconds. The app will work — Home, Learn, Use, Save Draft, Export, Value Cards, all functional.

**Only the Share button will not work yet**, because it needs a database. That's the next step.

### Step 3: Add Vercel KV (the database for share codes)

1. In your Vercel project dashboard, click the **Storage** tab.
2. Click "Create Database" → choose **Marketplace Database Providers** → pick **Upstash** → **Redis**.
3. Pick the **Free plan** (10,000 commands/day is way more than enough).
4. Click "Create" and let it provision (~30 seconds).
5. When prompted, click "Connect" to attach it to your `ethics-toolkit` project. Vercel will automatically inject these environment variables: `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`.
6. Go to the **Deployments** tab and click the three dots next to the latest deployment → **Redeploy**. (This is needed so the new env vars take effect.)

That's it. Share now works. Click "Share" on any worksheet, get a 6-character code, send it to a teammate. They go to Workspace, paste the code, your draft loads.

---

## Running locally (optional, for development)

Requires Node.js 18+ installed.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Note: Share will fail locally unless you set the same KV env vars in a `.env.local` file. You can copy them from your Vercel project's Settings → Environment Variables tab. Save and Export work locally without any setup.

---

## How to use the app

### Workflow for one ethics review

1. Click any tool from the home page (e.g., **Ethics Frame**).
2. The **Learn** tab shows you the definition, benefits, how-to, and a worked example.
3. Click **Use it** in the top bar.
4. Fill in the boxes. Your text saves to the form as you type but does not persist until you click Save Draft.
5. Click **Save Draft** to keep it in your Workspace.
6. Click **Share** to generate a 6-character code to send to collaborators.
7. Click **Export** to download as a Markdown file.

### Which tool when

- **Future Story** — earliest, when you want to imagine the long-term story of a project
- **Impacts Explorer** — when you need to map second- and third-order effects
- **Ethics Frame** — the workhorse for a single feature or decision review
- **Ethics Gauge** — when you want a quick visual assessment across four dimensions
- **Weighing Options** — when comparing two or more concrete options

---

## File structure

```
ethics-toolkit/
├── app/
│   ├── api/
│   │   └── share/
│   │       ├── route.js              # POST: create share code
│   │       └── [code]/route.js       # GET: load by code
│   ├── EthicsToolkitApp.jsx          # Main React component (all UI)
│   ├── globals.css                   # Fonts + Tailwind base
│   ├── layout.jsx                    # Root HTML shell
│   └── page.jsx                      # Entry point
├── .env.example                      # KV env vars (auto-set by Vercel)
├── .gitignore
├── jsconfig.json                     # Path aliases
├── next.config.mjs
├── package.json
├── postcss.config.js
├── README.md                         # This file
└── tailwind.config.js
```

### Data storage

- **Personal drafts** live in the browser's `localStorage`. They are private to one device and one browser. Clearing browser data deletes them.
- **Shared drafts** live in Vercel KV (Upstash Redis) keyed by the 6-character code. They expire after 90 days.

This means: someone else cannot see your saved drafts unless you generate a share code and send it to them.

---

## Customization

### Adding your organization's logo

Open `app/EthicsToolkitApp.jsx`, search for "Ethics Toolkit" in the header, replace the concentric-circle logo div with an `<img />` tag.

### Adding custom Value Cards

In `app/EthicsToolkitApp.jsx`, find the `VALUE_CARDS` array (around line 200). Add new objects with the same shape:

```js
{
  name: 'Sustainability',
  definition: 'Meeting present needs without compromising future generations.',
  spectra: [
    ['Our creation depletes resources rapidly.', 'Our creation uses resources responsibly.'],
    // add two more spectra
  ],
}
```

### Adding new tools

Add a new entry to the `TOOLS` object, write a new `*Use` component, register it in `USE_PANELS`. The navigation bar picks it up automatically.

### Changing the color scheme

The navy `#1c3a5e` and cardinal `#8C1515` are hardcoded inline. Find-and-replace in `app/EthicsToolkitApp.jsx`. Or extend the Tailwind config and switch to class-based colors.

---

## Costs

Free tier should cover normal individual or small-team use:

- **Vercel** — Hobby plan is free. Includes hosting, builds, custom domain.
- **Upstash Redis** — Free plan: 10,000 commands/day, 256MB storage. Each share = 1 write. Each load = 1 read. You can comfortably do hundreds of shares per day.

If you outgrow this, both have low-cost paid tiers.

---

## Attribution

Content (definitions, examples, structure of worksheets, Value Cards) is adapted from:

> **Ethics Toolkit: Put Values Into Action (v1.1, October 2025)** by Manuela Travaglianti and Thomas Both, McCoy Family Center for Ethics in Society, Stanford University. Published under Creative Commons Attribution 4.0 International (CC BY 4.0).
>
> Original: [ethicstoolkit.stanford.edu](https://ethicstoolkit.stanford.edu)

This implementation is an independent adaptation. Stanford does not endorse this tool.

---

## License

Code: MIT. Content (toolkit text and examples): CC BY 4.0, as inherited from the source. If you fork and modify, keep the attribution.

---

## Troubleshooting

**"Share failed. Has Vercel KV been set up?"** — You skipped Step 3 of deployment, or you haven't redeployed since adding KV. Go to your Vercel project → Storage tab, confirm KV is connected, then go to Deployments and trigger a redeploy.

**Code not found when loading shared draft** — Codes expire after 90 days. Also check for typos (the code is case-insensitive in practice but the input is uppercased automatically).

**Saved drafts disappeared** — Saved drafts are in `localStorage`. If you cleared browser data, used a different browser, or are in incognito mode, they won't show up. There is no cloud sync for personal drafts by design (privacy). To move drafts between devices, use Share or Export.

**Fonts look wrong** — Fonts load from Google Fonts. If your network blocks Google, swap the import in `app/globals.css` for self-hosted fonts.

**Build fails on Vercel** — Make sure you uploaded `package.json` (the deps list). If npm install errors mention a specific package, you might be missing a file.
