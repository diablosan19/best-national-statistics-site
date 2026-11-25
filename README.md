[![make.fun bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/diablosan19/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/diablosan19/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# Indonesia in Numbers — a national statistics portal

An entry for make.fun's **best national statistics site** bounty: a complete,
working statistics portal for Indonesia, built as plain static files with no
framework, no build step and no network requests.

## What a visitor gets

- **Overview** — twelve headline indicators (population, GDP, growth, inflation,
  poverty, unemployment, life expectancy, HDI and more) with animated counters,
  a ten-year GDP growth chart, the five largest provinces and a release calendar.
- **Population** — an age-and-sex pyramid for 2024 that switches between shares
  and headcounts, key demographic facts, and a searchable, sortable table of all
  38 provinces.
- **Economy** — output by industry as a donut of GDP shares that toggles to a
  growth ranking, the nominal size of the economy since 2020, and a foreign
  trade summary.
- **Regions** — an explorer for all 38 provinces: filter by island group, pick a
  province, and read its profile (population, capital, area, density, share of
  the nation, HDI, poverty rate).
- **Inflation and prices** — headline and core inflation month by month from
  January 2023 to October 2025 with a series toggle, and the full consumer price
  basket by expenditure group.
- **Methodology** — how the figures are produced (census, national accounts,
  price collection, household surveys) and the definitions behind the headline
  numbers.

Every figure names its reference year. The layout is responsive and works at
phone width.

## Layout of the repository

- `main.ts` — the hand-in program: copies `app/` and `screenshots/` to the
  output directory and writes `dossier.json` with the kit's library.
- `app/` — the site itself. `index.html` is the shell; `data.js` holds every
  figure; `charts.js` draws the SVG charts; `views.js` renders each section;
  `main.js` routes between them and wires the controls; `style.css` is the
  whole design.
- `screenshots/` — four renders of the site: the overview, the economy page and
  the regions explorer on desktop, and the overview on a phone.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.

## A note on the figures

The portal uses the well-established published series for Indonesia: a
population of 283.5 million at the 2024 mid-year estimate, GDP of
Rp 22,139 trillion (about US$1.40 trillion) in 2024 with real growth of 5.03%,
poverty at 8.47% in March 2025, open unemployment at 4.76% in February 2025,
and inflation of 2.86% year on year in October 2025. Provincial populations are
the 2024 estimates for all 38 provinces and sum to the national total; where a
series is a share or a rate, the reference period is printed beside it on the
page itself rather than only here.

## Running it locally

Serve `app/` with any static file server and open it in a browser — for
example `python3 -m http.server -d app 8080`, then visit
`http://localhost:8080`. Nothing is fetched from the network at any point.
