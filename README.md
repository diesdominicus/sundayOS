# My Life — personal dashboard

A private, personal life dashboard: habits, calendar/dates, health & weight, journal,
gratitude, Ignatian examen, prayer intentions, goals, 7 areas of life, net-worth money
tracking, and collections (books, movies, travel, etc.).

Built to run **locally today** and **migrate to the cloud later** (personal Netlify +
Google account) so it can be used on a phone behind a login.

---

## How to open it (today, locally)

**Easiest:** double-click `site/index.html` — it opens in your browser and just works.
Everything you enter is saved in that browser on this computer.

**If your data ever doesn't stick** (some browsers are strict about local files), run it
through a tiny local server instead — open Terminal and paste:

```bash
cd "/Users/domenicadottavio/Personal Life Dashboard/site" && python3 -m http.server 8770
```

Then open http://localhost:8770 in your browser. Leave that Terminal window open while
you use it. (Use Chrome for the most reliable saving.)

---

## Your data

- Everything lives **only on this computer**, in your browser's local storage. Nothing is
  uploaded anywhere.
- **Backup** (top-right button) downloads a single `life-dashboard-backup-YYYY-MM-DD.json`
  file with everything in it.
- **Restore** loads a backup file back in.

### Moving to your new computer
1. On this computer: click **Backup** and keep the downloaded file.
2. Copy the whole `Personal Life Dashboard` folder to the new computer (or re-clone it).
3. Open the app there and click **Restore**, choosing your backup file.

That's the full migration for the local version.

---

## What works now vs. later

**Working now (local):**
- All 12 sections, saving to this device
- Live weather (New York City)
- Rotating daily saint quote
- Accurate liturgical season (green/violet/gold) via an Easter calculation
- Habit streaks, gratitude streak, net-worth % change month-over-month
- Backup / Restore

**Comes with the cloud migration (needs personal Netlify + Google account):**
- Phone access from anywhere, behind a login that's just you
- Google Calendar event sync
- Automatic daily Mass readings feed
- Google Sheets as the shared backend (edit in the app or in Sheets)

---

## Project layout

```
Personal Life Dashboard/
  site/
    index.html          the real, working app (this is the one you use)
    mockup-desktop.html  the earlier clickable design mockup (reference only)
  README.md
```

The whole app is a single self-contained `index.html` — no build step, no dependencies.
