// main.js — hash router and control wiring for the portal.
// Routes: #/overview #/population #/economy #/regions #/prices #/about

import {
  overviewView, populationView, economyView, regionsView, pricesView, aboutView,
  provinceRows, sectorShareHTML, sectorGrowthHTML, provinceListHTML,
  provinceDetailHTML, inflationChartHTML, sortedProvinces,
} from './views.js';
import { PYRAMID } from './data.js';
import { pyramidChart } from './charts.js';

const app = document.getElementById('app');
const NAV = [
  ['overview', 'Overview'],
  ['population', 'Population'],
  ['economy', 'Economy'],
  ['regions', 'Regions'],
  ['prices', 'Inflation and prices'],
  ['about', 'Methodology'],
];

const state = {
  provinceSort: 'pop',
  provinceQuery: '',
  provinceGroup: 'All groups',
  provinceSelected: 'West Java',
};

function animateCounters() {
  const els = app.querySelectorAll('.count');
  els.forEach((el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const started = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      el.textContent = prefix + v.toLocaleString('en-US', {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals,
      }) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function wireOverview() {
  animateCounters();
}

function currentProvinceList() {
  let list = [...sortedProvinces()];
  if (state.provinceSort === 'name') list.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  if (state.provinceSort === 'density') list.sort((a, b) => (b[3] / b[4]) - (a[3] / a[4]));
  const q = state.provinceQuery.trim().toLowerCase();
  if (q) list = list.filter((p) => p[0].toLowerCase().includes(q) || p[1].toLowerCase().includes(q));
  return list;
}

function refreshProvinceTable() {
  const tbody = app.querySelector('#prov-table tbody');
  if (!tbody) return;
  const list = currentProvinceList();
  tbody.innerHTML = provinceRows(list);
  const counter = app.querySelector('#prov-count');
  if (counter) counter.textContent = `Showing ${list.length} of 38 provinces. Click a column heading to sort; click a province name for its full profile.`;
}

function wirePopulation() {
  app.querySelectorAll('[data-pyr]').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.querySelectorAll('[data-pyr]').forEach((b) => b.classList.toggle('is-on', b === btn));
      const slot = app.querySelector('#pyramid-slot');
      if (btn.dataset.pyr === 'abs') {
        const rows = PYRAMID.map((r) => [r[0], Math.round(r[1] * 2.83488 * 10) / 10, Math.round(r[2] * 2.83488 * 10) / 10]);
        slot.innerHTML = pyramidChart({ rows, unit: 'm' });
      } else {
        slot.innerHTML = pyramidChart({ rows: PYRAMID });
      }
    });
  });
  const search = app.querySelector('#prov-search');
  if (search) {
    search.addEventListener('input', () => {
      state.provinceQuery = search.value;
      refreshProvinceTable();
    });
  }
  app.querySelectorAll('.th-sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.provinceSort = btn.dataset.sort;
      refreshProvinceTable();
    });
  });
  refreshProvinceTable();
}

function wireEconomy() {
  app.querySelectorAll('[data-sector]').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.querySelectorAll('[data-sector]').forEach((b) => b.classList.toggle('is-on', b === btn));
      const slot = app.querySelector('#sector-slot');
      slot.innerHTML = btn.dataset.sector === 'growth' ? sectorGrowthHTML() : sectorShareHTML();
    });
  });
}

function refreshRegionList() {
  const list = app.querySelector('#prov-list');
  if (list) list.innerHTML = provinceListHTML(state.provinceGroup);
  app.querySelectorAll('.provbtn').forEach((btn) => {
    btn.classList.toggle('is-on', btn.dataset.prov === state.provinceSelected);
    btn.addEventListener('click', () => {
      state.provinceSelected = btn.dataset.prov;
      const detail = app.querySelector('#prov-detail');
      if (detail) detail.innerHTML = provinceDetailHTML(state.provinceSelected);
      app.querySelectorAll('.provbtn').forEach((b) => b.classList.toggle('is-on', b === btn));
    });
  });
}

function wireRegions() {
  app.querySelectorAll('[data-group]').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.provinceGroup = chip.dataset.group;
      app.querySelectorAll('[data-group]').forEach((c) => c.classList.toggle('is-on', c === chip));
      refreshRegionList();
    });
  });
  refreshRegionList();
  const detail = app.querySelector('#prov-detail');
  if (detail) detail.innerHTML = provinceDetailHTML(state.provinceSelected);
}

function wirePrices() {
  const slot = app.querySelector('#infl-slot');
  if (slot) slot.innerHTML = inflationChartHTML('both');
  app.querySelectorAll('[data-infl]').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.querySelectorAll('[data-infl]').forEach((b) => b.classList.toggle('is-on', b === btn));
      if (slot) slot.innerHTML = inflationChartHTML(btn.dataset.infl);
    });
  });
}

const VIEWS = {
  overview: [overviewView, wireOverview],
  population: [populationView, wirePopulation],
  economy: [economyView, wireEconomy],
  regions: [regionsView, wireRegions],
  prices: [pricesView, wirePrices],
  about: [aboutView, () => {}],
};

function render() {
  const route = (location.hash.replace('#/', '') || 'overview').split('?')[0];
  const [view, wire] = VIEWS[route] || VIEWS.overview;
  app.innerHTML = view();
  wire();
  document.querySelectorAll('.navlink').forEach((a) => {
    a.classList.toggle('is-on', a.dataset.route === (VIEWS[route] ? route : 'overview'));
  });
  window.scrollTo(0, 0);
  if (document.body.dataset.shot === '1') {
    setTimeout(() => { window.__shotReady = true; }, 1350);
  } else {
    window.__shotReady = true;
  }
}

document.getElementById('nav').innerHTML = NAV.map(([route, label]) =>
  `<a class="navlink" data-route="${route}" href="#/${route}">${label}</a>`).join('');

window.addEventListener('hashchange', render);
render();
