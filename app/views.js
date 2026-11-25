// views.js — one render function per section of the portal.
// Each returns the HTML for the main content area; main.js wires the controls.

import {
  HEADLINE, GDP_GROWTH, GDP_LEVEL, SECTORS, PYRAMID, POPULATION_FACTS,
  INFLATION_MONTHLY, CPI_GROUPS, PROVINCES, RELEASES, TRADE,
} from './data.js';
import { lineChart, barChart, hbarChart, pyramidChart, donutChart } from './charts.js';

export const NATIONAL_POPULATION_THOUSANDS = 283488;

export function fmtInt(n) {
  return Math.round(n).toLocaleString('en-US');
}

export function fmtMillions(thousands) {
  return (thousands / 1000).toFixed(2) + ' million';
}

function density(p) {
  return p[3] * 1000 / p[4];
}

function share(p) {
  return (p[3] / NATIONAL_POPULATION_THOUSANDS) * 100;
}

export function sortedProvinces() {
  return [...PROVINCES].sort((a, b) => b[3] - a[3]);
}

export function overviewView() {
  const cards = HEADLINE.map((h) => `
    <article class="card">
      <p class="card-label">${h.label}</p>
      <p class="card-value"><span class="count" data-target="${h.value}" data-decimals="${h.decimals}" data-prefix="${h.prefix || ''}" data-suffix="${h.suffix || ''}">0</span></p>
      <p class="card-year">${h.year}</p>
      <p class="card-note">${h.note}</p>
    </article>`).join('');
  const growth = barChart({
    labels: GDP_GROWTH.map((r) => r[0]), values: GDP_GROWTH.map((r) => r[1]),
    unit: '%', ariaLabel: 'GDP growth 2015 to 2024',
  });
  const top5 = sortedProvinces().slice(0, 5).map((p, i) => `
    <tr><td>${i + 1}</td><td>${p[0]}</td><td>${p[1]}</td><td class="num">${fmtMillions(p[3])}</td><td class="num">${share(p).toFixed(1)}%</td></tr>`).join('');
  const releases = RELEASES.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('');
  return `
  <section class="hero">
    <h1>Indonesia in Numbers</h1>
    <p class="hero-sub">The national statistics portal: population, economy, prices and regions for the
    Republic of Indonesia — 283.5 million people, 38 provinces, one set of official figures.</p>
    <p class="hero-note">Figures: national statistics, latest available. Most series are for 2024 or 2025,
    with the reference year named on every indicator.</p>
  </section>
  <section>
    <h2>Headline indicators</h2>
    <div class="cards">${cards}</div>
  </section>
  <section class="panel">
    <h2>Growth held near five per cent</h2>
    <p>Real GDP growth, per cent per year. The 2020 contraction of 2.07% was the first since 1998;
    growth has since returned to the five per cent path of the decade before it.</p>
    ${growth}
    <p class="src">Source: national accounts, annual series 2015–2024.</p>
  </section>
  <div class="cols">
    <section class="panel">
      <h2>Five largest provinces</h2>
      <table>
        <thead><tr><th>#</th><th>Province</th><th>Capital</th><th class="num">Population</th><th class="num">Share</th></tr></thead>
        <tbody>${top5}</tbody>
      </table>
      <p><a href="#/regions">Explore all 38 provinces →</a></p>
    </section>
    <section class="panel">
      <h2>Release calendar</h2>
      <table>
        <thead><tr><th>Date</th><th>Release</th><th>Covers</th></tr></thead>
        <tbody>${releases}</tbody>
      </table>
      <p class="src">Releases are published at 11:00 Western Indonesia Time on the day shown.</p>
    </section>
  </div>`;
}

export function populationView() {
  const facts = POPULATION_FACTS.map((f) => `<tr><th>${f[0]}</th><td>${f[1]}</td></tr>`).join('');
  return `
  <section class="pagehead">
    <h1>Population</h1>
    <p>283,487,931 residents at the 2024 mid-year estimate. Indonesia is the world's fourth most
    populous country; more than half its people live on Java, which holds 7.1% of its land.</p>
  </section>
  <section class="panel">
    <h2>Age and sex structure, 2024</h2>
    <div class="seg" role="group" aria-label="Pyramid units">
      <button type="button" class="seg-btn is-on" data-pyr="pct">Share of population (%)</button>
      <button type="button" class="seg-btn" data-pyr="abs">People (millions)</button>
    </div>
    <div id="pyramid-slot">${pyramidChart({ rows: PYRAMID })}</div>
    <p class="src">Five-year age groups as a share of the total population. The widest cohorts are
    aged 15–29 — the generation now entering the labour market.</p>
  </section>
  <div class="cols">
    <section class="panel">
      <h2>Key population facts</h2>
      <table class="facts"><tbody>${facts}</tbody></table>
    </section>
    <section class="panel">
      <h2>What the pyramid says</h2>
      <p>Fertility has fallen to replacement level, so each new cohort is close in size to the one
      before it, while the bars above age 60 widen every census. The working-age share peaks in this
      decade: demographers call the window — a high share of workers supporting fewer dependants —
      the demographic dividend.</p>
      <p>The 2020 census counted 270.20 million people; the register-based estimate for 2030 is
      296 million. The next full census is in 2030.</p>
    </section>
  </div>
  <section class="panel">
    <h2>Population by province, 2024</h2>
    <label class="searchlab">Search provinces <input type="search" id="prov-search" placeholder="Type a province or capital…" autocomplete="off"></label>
    <div class="tablewrap">
      <table id="prov-table">
        <thead><tr>
          <th><button type="button" class="th-sort" data-sort="name">Province</button></th>
          <th>Capital</th>
          <th class="num"><button type="button" class="th-sort" data-sort="pop">Population</button></th>
          <th class="num"><button type="button" class="th-sort" data-sort="density">Density / km²</button></th>
          <th class="num">Share</th>
        </tr></thead>
        <tbody></tbody>
      </table>
    </div>
    <p class="src" id="prov-count"></p>
  </section>`;
}

export function provinceRows(list) {
  return list.map((p) => `
    <tr>
      <td><a href="#/regions">${p[0]}</a></td>
      <td>${p[1]}</td>
      <td class="num">${fmtInt(p[3] * 1000)}</td>
      <td class="num">${fmtInt(density(p))}</td>
      <td class="num">${share(p).toFixed(2)}%</td>
    </tr>`).join('');
}

export function economyView() {
  const topSectors = SECTORS.slice(0, 6);
  const rest = SECTORS.slice(6).reduce((a, s) => a + s[1], 0);
  const donut = donutChart({ rows: [...topSectors.map((s) => [s[0], s[1]]), ['All other sectors', Math.round(rest * 10) / 10]] });
  const legend = [...topSectors, ['All other sectors', Math.round(rest * 10) / 10]]
    .map((s) => `<tr><td>${s[0]}</td><td class="num">${s[1]}%</td></tr>`).join('');
  const trade = TRADE.map((t) => `<article class="card"><p class="card-label">${t[0]}</p><p class="card-value small">${t[1]}</p><p class="card-note">${t[2]}</p></article>`).join('');
  return `
  <section class="pagehead">
    <h1>Economy</h1>
    <p>GDP reached Rp 22,139 trillion (US$1.40 trillion) in 2024, growing 5.03% in real terms.
    Manufacturing is the largest single industry; services together produce just over half of output.</p>
  </section>
  <section class="panel">
    <h2>Output by industry, 2024</h2>
    <div class="seg" role="group" aria-label="Sector chart mode">
      <button type="button" class="seg-btn is-on" data-sector="share">Share of GDP</button>
      <button type="button" class="seg-btn" data-sector="growth">Growth in 2024</button>
    </div>
    <div id="sector-slot">
      <div class="donutwrap">${donut}<table class="donutlegend"><tbody>${legend}</tbody></table></div>
    </div>
    <p class="src">Source: national accounts by industry, current prices, 2024.</p>
  </section>
  <div class="cols">
    <section class="panel">
      <h2>The size of the economy</h2>
      ${lineChart({ labels: GDP_LEVEL.map((r) => r[0]), series: [{ name: 'GDP', values: GDP_LEVEL.map((r) => r[1]) }], height: 240, ariaLabel: 'GDP in trillion rupiah 2020 to 2024' })}
      <p class="src">GDP at current prices, trillion rupiah. The economy has doubled in nominal size since 2016.</p>
    </section>
    <section class="panel">
      <h2>Reading the structure</h2>
      <p>Three industries — manufacturing, trade and agriculture — produce 45% of GDP, but they are
      no longer the fastest growing. Accommodation and food services grew 10.4% in 2024 and transport
      8.7%, as mobility and tourism completed their recovery, while agriculture grew just 0.7% in a
      dry year for the rice harvest.</p>
      <p>Household consumption remains the engine of demand at 54% of GDP, ahead of investment at
      30% and government consumption at 7%; net exports contributed the rest.</p>
    </section>
  </div>
  <section>
    <h2>Foreign trade</h2>
    <div class="cards">${trade}</div>
  </section>`;
}

export function sectorShareHTML() {
  const topSectors = SECTORS.slice(0, 6);
  const rest = SECTORS.slice(6).reduce((a, s) => a + s[1], 0);
  const donut = donutChart({ rows: [...topSectors.map((s) => [s[0], s[1]]), ['All other sectors', Math.round(rest * 10) / 10]] });
  const legend = [...topSectors, ['All other sectors', Math.round(rest * 10) / 10]]
    .map((s) => `<tr><td>${s[0]}</td><td class="num">${s[1]}%</td></tr>`).join('');
  return `<div class="donutwrap">${donut}<table class="donutlegend"><tbody>${legend}</tbody></table></div>`;
}

export function sectorGrowthHTML() {
  const rows = [...SECTORS].sort((a, b) => b[2] - a[2]).map((s) => [s[0], s[2]]);
  return hbarChart({ rows, unit: '%', height: 430, color: '#047857', ariaLabel: 'Sector growth 2024' });
}

export function regionsView() {
  const groups = [...new Set(PROVINCES.map((p) => p[2]))];
  const chips = ['All groups', ...groups].map((g, i) => `
    <button type="button" class="chip${i === 0 ? ' is-on' : ''}" data-group="${g}">${g}</button>`).join('');
  return `
  <section class="pagehead">
    <h1>Regions</h1>
    <p>Indonesia is governed as 38 provinces across six island groups, from Aceh in the west to
    Highland Papua in the east. Pick a province to see its profile; densities run from 15,900 people
    per km² in Jakarta to 4 per km² in South Papua.</p>
  </section>
  <div class="chiprow" role="group" aria-label="Island group filter">${chips}</div>
  <div class="regions-layout">
    <section class="panel listpanel">
      <h2>Provinces</h2>
      <div id="prov-list" class="provlist"></div>
    </section>
    <section class="panel detailpanel" id="prov-detail" aria-live="polite"></section>
  </div>`;
}

export function provinceListHTML(filterGroup) {
  const list = sortedProvinces().filter((p) => filterGroup === 'All groups' || p[2] === filterGroup);
  return list.map((p) => `
    <button type="button" class="provbtn" data-prov="${p[0]}">
      <span class="provname">${p[0]}</span>
      <span class="provpop">${fmtMillions(p[3])}</span>
    </button>`).join('');
}

export function provinceDetailHTML(name) {
  const p = PROVINCES.find((x) => x[0] === name) || sortedProvinces()[0];
  const rank = sortedProvinces().findIndex((x) => x[0] === p[0]) + 1;
  const sharePct = share(p);
  return `
  <h2>${p[0]}</h2>
  <p class="detail-sub">Capital ${p[1]} · ${p[2]} · Province no. ${rank} of 38 by population</p>
  <table class="facts"><tbody>
    <tr><th>Population, 2024</th><td>${fmtInt(p[3] * 1000)} (${fmtMillions(p[3])})</td></tr>
    <tr><th>Share of national population</th><td>${sharePct.toFixed(2)}%</td></tr>
    <tr><th>Land area</th><td>${fmtInt(p[4])} km²</td></tr>
    <tr><th>Population density</th><td>${fmtInt(density(p))} people per km²</td></tr>
    <tr><th>Human development index, 2024</th><td>${p[5].toFixed(1)}</td></tr>
    <tr><th>Poverty rate, March 2025</th><td>${p[6].toFixed(1)}%</td></tr>
  </tbody></table>
  <p class="meterlab">Share of national population</p>
  <div class="meter"><div class="meter-fill" style="width:${Math.max(2, sharePct * 5.6).toFixed(1)}%"></div></div>
  <p class="meterlab">Human development, national = 74.2</p>
  <div class="meter"><div class="meter-fill alt" style="width:${p[5].toFixed(1)}%"></div></div>
  <p class="src">Provincial profile compiled from the population, social and economic series on this portal.</p>`;
}

export function pricesView() {
  return `
  <section class="pagehead">
    <h1>Inflation and prices</h1>
    <p>Consumer prices rose 2.86% in the year to October 2025, inside Bank Indonesia's 2.5 ± 1%
    target band. Inflation has fallen a long way from the 5.5% peak of September 2022, when fuel
    price adjustments pushed the index up.</p>
  </section>
  <section class="panel">
    <h2>Inflation, year on year</h2>
    <div class="seg" role="group" aria-label="Inflation series">
      <button type="button" class="seg-btn is-on" data-infl="both">Headline and core</button>
      <button type="button" class="seg-btn" data-infl="headline">Headline only</button>
    </div>
    <div id="infl-slot"></div>
    <p class="src">Monthly consumer price inflation, January 2023 – October 2025. Core inflation
    excludes administered prices and volatile food.</p>
  </section>
  <section class="panel">
    <h2>Inside the basket, October 2025</h2>
    <div class="tablewrap">
      <table>
        <thead><tr><th>Expenditure group</th><th class="num">Weight in basket</th><th class="num">Inflation, y/y</th></tr></thead>
        <tbody>${CPI_GROUPS.map((g) => `<tr><td>${g[0]}</td><td class="num">${g[1].toFixed(1)}%</td><td class="num">${g[2].toFixed(2)}%</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p>Food and personal care are doing the work in the current figure: food, beverages and tobacco
    rose 4.14%, and personal care 6.83% as gold jewellery prices followed the world gold price.
    Housing and transport, by contrast, are close to flat.</p>
    <p class="src">Weights from the 2022 cost-of-living survey, applied to prices collected in 90 cities.</p>
  </section>`;
}

export function inflationChartHTML(mode) {
  const labels = INFLATION_MONTHLY.map((r) => r[0]);
  const headline = { name: 'Headline', values: INFLATION_MONTHLY.map((r) => r[1]), color: '#0b3d91' };
  const core = { name: 'Core', values: INFLATION_MONTHLY.map((r) => r[2]), color: '#d97706' };
  const chart = lineChart({
    labels, series: mode === 'headline' ? [headline] : [headline, core],
    unit: '%', ariaLabel: 'Inflation January 2023 to October 2025',
  });
  const legend = mode === 'headline'
    ? '<p class="legend"><span class="sw" style="background:#0b3d91"></span>Headline inflation</p>'
    : '<p class="legend"><span class="sw" style="background:#0b3d91"></span>Headline <span class="sw" style="background:#d97706"></span>Core</p>';
  return chart + legend;
}

export function aboutView() {
  return `
  <section class="pagehead">
    <h1>Methodology and about</h1>
    <p>How the figures on this portal are produced, what they mean, and where their limits are.</p>
  </section>
  <div class="cols">
    <section class="panel">
      <h2>How the statistics are made</h2>
      <p><strong>Population.</strong> A full census is taken every ten years — the most recent in
      2020 counted 270.20 million people. Between censuses, annual estimates roll the census
      forward with births, deaths and migration from the civil register.</p>
      <p><strong>National accounts.</strong> GDP is built from production, expenditure and income
      approaches across 17 industries and reconciled quarterly; annual figures are revised twice
      before they are final.</p>
      <p><strong>Prices.</strong> Enumerators collect around 400,000 prices a month in 90 cities,
      weighted by the 2022 cost-of-living survey of household spending.</p>
      <p><strong>Household surveys.</strong> The socio-economic survey (Susenas, March and
      September) measures poverty and consumption; the labour force survey (Sakernas, February
      and August) measures employment.</p>
    </section>
    <section class="panel">
      <h2>Definitions that matter</h2>
      <p><strong>Poverty rate</strong> — the share of people whose monthly spending per person falls
      below the poverty line: the cost of 2,100 kcal of food a day plus essential non-food needs
      (Rp 595,242 per person per month in March 2025).</p>
      <p><strong>Open unemployment</strong> — the share of the labour force without work, available
      for work and actively looking, in the survey reference week.</p>
      <p><strong>Core inflation</strong> — the consumer price index excluding administered prices
      (fuel, electricity tariffs) and volatile food, used to read the underlying trend.</p>
      <p><strong>Human development index</strong> — a composite of life expectancy, schooling and
      income per person, scaled from 0 to 100 in national publications.</p>
    </section>
  </div>
  <section class="panel">
    <h2>Using these figures</h2>
    <p>Every figure on this portal carries its reference period, because a statistic without a date
    is only half a fact. Series are revised as better source data arrive; the figure shown is the
    latest published value at the time of the portal's last update, December 2025. Figures may not
    sum exactly because of rounding.</p>
    <p>This portal presents the national statistics of Indonesia for reference and education. For
    decisions that depend on a single number — a contract, a filing, a payment — cite the original
    statistical release for the period you need, since releases carry the full tables, the revision
    history and the notes on method that a summary page cannot.</p>
    <p class="src">Compiled December 2025. Next scheduled update: with the February 2026 national accounts release.</p>
  </section>`;
}
