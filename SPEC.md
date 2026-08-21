# DOMENICA OS — functional spec

A personal life dashboard, **cross-linked** so modules feed each other (enter once, used
everywhere). Local-first now; cloud + phone/iPad later. Aesthetic: Mediterranean lemon —
soft, airy, botanical, blue sky + ocean + lemon yellow (not blocky/techy).

## Principles
- **Enter once.** Habits → Goals → 7 Areas share data. No double entry.
- **Automatic where possible.** Weather, liturgical season, Mass readings, streaks, "on this
  day" photos, birthday reminders.
- **Installable app.** In the cloud phase it becomes a PWA — an icon on your phone + iPad
  home screen, opens full-screen like a real app.

## Navigation (grouped so it stays calm)

- **Home** — the daily glance
- **Faith** — Readings · Examen · Prayer · Sacraments · Feast & name days
- **Daily** — Habits · Journal · Gratitude · Mood · Brain dump
- **Body** — Weight · Exercise · Sleep · Water · (optional Cycle)
- **Life** — Calendar · Relationships · Goals · 7 Areas
- **Money**
- **Memories** — Photos & On-this-day · Travel · Collections · Bucket list · Reading queue · Places
- **Year** — Word of the year · Annual review

On phone: bottom bar = **Home · Faith · Daily · Life · More**.

## Modules

| Module | You enter | Automatic | Feeds / links to | Phase |
|---|---|---|---|---|
| **Home** | nothing | date, season, weather, quote, on-this-day photo, upcoming, today's progress | pulls from all | 1 (photo: 2) |
| **Readings** | — | daily Mass readings feed | Faith area | 2 (P1: link out) |
| **Examen** | nightly 5 steps | — | Faith area | 1 |
| **Prayer** | intentions | "praying N days" | Faith area | 1 |
| **Sacraments** | last confession | Mass count from Habits | Faith area, reminders | 1 |
| **Feast & name days** | saints you love | today's saint | Calendar | 1 |
| **Habits** | tap checkboxes | streaks, heatmap | Faith+Fitness goals, Faith+Health areas, Sacraments | 1 |
| **Journal** | entry + mood | — | Mood chart | 1 |
| **Gratitude** | 3 a day | streak, log | — | 1 |
| **Mood** | — | chart from journal moods | reflection | 1 |
| **Brain dump** | quick notes | — | — | 1 |
| **Weight** | number | trend | Fitness/Health goal + area | 1 (Apple Health: 3) |
| **Exercise** | workout | weekly count | Fitness goal | 1 |
| **Sleep / Water / Cycle** | optional logs | — | Health area | 1 (optional) |
| **Calendar** | important dates | Google Calendar sync, birthdays, feast days | reminders on Home | dates P1, sync P2 |
| **Relationships** | log contact (call/text/hangout) | "haven't talked to X in N weeks" | Calendar birthdays, Friends area | 1 |
| **Goals** | manual ones + targets | auto ones pull from data | from Habits/Health/Money; feeds Annual review | 1 |
| **7 Areas** | rate 1–5 | app suggests from data | pulls signals from Habits/Health/Money/Relationships | 1 |
| **Money** | 3 numbers monthly | net worth, % vs last month | Money goal + area | 1 |
| **Photos & On-this-day** | (tag in Google Photos) | slideshow + "this time last year" | Home memories card | 2 |
| **Travel** | been + wishlist | — | — | 1 |
| **Collections** | books/movies/TV/live/career | counts | — | 1 |
| **Bucket list** | dreams | — | — | 1 |
| **Reading queue** | want→reading→read | — | Collections/Books | 1 |
| **Places / cafés** | tried + want | — | — | 1 |
| **Word of the year** | theme + note | — | Annual review | 1 |
| **Annual review** | — | assembles goals + gratitude + memories + area trends | — | 1 (richer P2) |

## The "brain" — how modules feed each other

- **Habits** → Faith goal, Fitness goal, Faith & Health area scores, Sacraments (Mass count)
- **Weight + Exercise** → Fitness goal, Health area
- **Money** → Money goal, Money area
- **Relationships** (last contact) → Friends area, Calendar birthdays, gentle "reach out" nudges
- **Journal moods** → Mood chart
- **Calendar** ← birthdays (Relationships) + feast days + Google Calendar (cloud)
- **7 Areas** ← reads Habits/Health/Money/Relationships to *suggest* each score
- **Annual review** ← Goals + Gratitude + Memories + Area trends

## Phasing

**Phase 1 — now, local, this computer (Mediterranean lemon build)**
Everything that's text/number/logging + all the smart cross-links, streaks, weather, quote,
liturgical season, readings link-out, examen, prayer, sacraments, feast days, habits, journal,
gratitude, mood chart, brain dump, weight, exercise, (optional sleep/water/cycle), calendar
dates, relationships, goals (auto+manual), 7 areas, money, travel, collections, bucket list,
reading queue, places, word of the year, annual review. Backup/Restore = migration path.

**Phase 2 — new personal computer → cloud, phone + iPad**
New personal Netlify + Google project (personal Gmail only). Login gated to just you.
Adds: phone + iPad access as an installable app (PWA), Google Calendar sync, auto Mass-readings
feed, **Google Photos** for the slideshow + "on this day last year", data synced via Google
Sheets so all devices stay in step.

**Phase 3 — later nice-to-haves**
Apple Health sync (auto weight/steps/sleep), push reminders/notifications, deeper cycle tracking.

## Finalized with Domenica (Aug 8, 2026)

**Two layers:** named **Goals** (her actionable list) roll up into the canonical **7 Areas**
balance wheel (Physical · Mental · Emotional · Career · Financial · Relationships · Spiritual),
which the app auto-suggests from the goals/habits feeding it.

### Habits (each area has ≥1; supports weekly targets)
- **Spiritual:** Daily Mass (target 5×/wk, Sunday always) · Adoration (5×/wk) · Rosary (1×/wk) · Divine Mercy chaplet (1×/wk)
- **Physical:** Strength 10 min — arms/abs/legs/butt rotation (5×/wk) · 7,500 steps (daily)
- **Mental:** Italian 10 min (daily) · Read (daily)
- **Emotional:** Journal (daily) · Gratitude ×3 (daily)
- **Relationships:** Reach out to someone (3×/wk)
- **Financial:** No food delivery · no impulse buys (daily)
- **Career:** (optional) note one small work win → feeds Career milestones
- **Not tracked:** Sleep (hers is great). **Confession** → Sacraments log, not a checkbox.

### Goals (SMART + auto-link → rolls into Area)
- **Faith** → Mass 5×/wk · Adoration 5×/wk · Rosary 1×/wk · Divine Mercy 1×/wk · Confession every 2 wks  *(Habits + Sacraments → Spiritual)*
- **Fitness** → strength 10 min hitting arms/abs/legs/butt each week (5×/wk) + 7,500 steps/day  *(Exercise + steps → Physical)*
- **Health** → maintain weight ~145 lb  *(Weight → Physical)*
- **Italian** → reach B1: master presente, passato prossimo, imperfetto, futuro + direct/indirect pronouns; finish *Harry Potter 1* in Italian by Dec 31 2026  *(Italian habit + grammar checklist + HP progress → Mental)*
- **Reading** → 12 books in 2026  *(Books count → Mental)*
- **Money** → retirement/investments $200k · savings $25k · student loans $7k → $0  *(Money → Financial; no deadline yet, progress bars)*
- **Love** → ≥1 date OR young-adult Catholic event each month  *(Love/events log → Relationships)*
- **Relationships** → keep each core person contacted within their cadence  *(Relationships → Relationships)*
- **Career** → **Sr Director = 10/10**; currently **Director ≈ 8/10 (80%)**. Track via Career milestones + optional weekly "log a small win" habit  *(→ Career)*
- **Home** → dropped

### Notes
- Habit tracker supports **weekly targets** (Mass 5/7, Rosary 1/7…); the matching goal auto-fills when met.
- **Financial** goals are progress-only for now (no deadlines) — add target dates anytime.
- **Relationships:** she lists her core people + each person's contact cadence in-app.
- Nothing pushed harder than the rest — all held at equal priority for now.

### Wheel of Life (the 7 Areas view)
The 7 Areas page centers on an interactive **wheel** (a life-balance wheel): 7 segments, each
filled from the center out to its score (auto-suggested from the goals feeding it). **Tap a
segment** → opens that area's detail: its score, the goals rolling into it with progress bars,
and notes, plus a jump into the Goals page.
Resolved: strength = 5×/wk · Career habit = optional "log a win" · Home = dropped.
