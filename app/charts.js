// charts.js — small dependency-free SVG chart builders.
// Each function returns an SVG string drawn from plain arrays.

const NS_COLORS = ['#0b3d91', '#d97706', '#047857', '#b91c1c', '#6d28d9'];

function scalePoints(values, width, height, min, max, pad) {
  const span = max - min || 1;
  const stepX = (width - pad * 2) / (values.length - 1 || 1);
  return values.map((v, i) => [
    pad + i * stepX,
    height - pad - ((v - min) / span) * (height - pad * 2),
  ]);
}

function fmtTick(v) {
  return Math.abs(v) >= 100 ? Math.round(v).toString() : (Math.round(v * 10) / 10).toString();
}

// A line chart of one or more series sharing the same x labels.
// series: [{ name, values, color }]. Zero line is drawn when the range spans 0.
export function lineChart({ labels, series, width = 720, height = 300, unit = '', ariaLabel = 'Line chart' }) {
  const pad = 34;
  const all = series.flatMap((s) => s.values);
  let min = Math.min(...all);
  let max = Math.max(...all);
  if (min > 0) min = Math.min(0, min - (max - min) * 0.15);
  max = max + (max - min) * 0.12;
  if (min < 0 && max > 0) { /* keep zero visible */ } else if (min >= 0) min = 0;
  const y = (v) => height - pad - ((v - min) / (max - min)) * (height - pad * 2);
  const parts = [];
  parts.push(`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${ariaLabel}" class="chart">`);
  for (let t = 0; t <= 4; t++) {
    const v = min + ((max - min) * t) / 4;
    const yy = y(v);
    parts.push(`<line x1="${pad}" y1="${yy}" x2="${width - pad}" y2="${yy}" class="grid"/>`);
    parts.push(`<text x="${pad - 6}" y="${yy + 4}" class="tick" text-anchor="end">${fmtTick(v)}${unit}</text>`);
  }
  if (min < 0 && max > 0) {
    parts.push(`<line x1="${pad}" y1="${y(0)}" x2="${width - pad}" y2="${y(0)}" class="zero"/>`);
  }
  labels.forEach((lab, i) => {
    if (labels.length > 14 && i % 3 !== 0 && i !== labels.length - 1) return;
    const x = pad + (i * (width - pad * 2)) / (labels.length - 1 || 1);
    parts.push(`<text x="${x}" y="${height - 8}" class="tick" text-anchor="middle">${lab}</text>`);
  });
  series.forEach((s, si) => {
    const pts = scalePoints(s.values, width, height, min, max, pad);
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    parts.push(`<path d="${d}" fill="none" stroke="${s.color || NS_COLORS[si]}" stroke-width="2.4" stroke-linejoin="round"/>`);
    pts.forEach((p, i) => {
      if (labels.length > 14 && i % 2 !== 0 && i !== pts.length - 1) return;
      parts.push(`<circle cx="${p[0]}" cy="${p[1]}" r="2.6" fill="${s.color || NS_COLORS[si]}"><title>${labels[i]}: ${s.values[i]}${unit}</title></circle>`);
    });
  });
  parts.push('</svg>');
  return parts.join('');
}

// Vertical bars for a single series, e.g. annual GDP growth.
export function barChart({ labels, values, width = 720, height = 300, unit = '', color = '#0b3d91', negColor = '#b91c1c', ariaLabel = 'Bar chart' }) {
  const pad = 34;
  let min = Math.min(0, ...values);
  let max = Math.max(...values);
  max = max + (max - min) * 0.15;
  if (min < 0) min = min - (max - min) * 0.08;
  const y = (v) => height - pad - ((v - min) / (max - min)) * (height - pad * 2);
  const slot = (width - pad * 2) / values.length;
  const parts = [`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${ariaLabel}" class="chart">`];
  for (let t = 0; t <= 4; t++) {
    const v = min + ((max - min) * t) / 4;
    parts.push(`<line x1="${pad}" y1="${y(v)}" x2="${width - pad}" y2="${y(v)}" class="grid"/>`);
    parts.push(`<text x="${pad - 6}" y="${y(v) + 4}" class="tick" text-anchor="end">${fmtTick(v)}${unit}</text>`);
  }
  parts.push(`<line x1="${pad}" y1="${y(0)}" x2="${width - pad}" y2="${y(0)}" class="zero"/>`);
  values.forEach((v, i) => {
    const x = pad + i * slot + slot * 0.18;
    const w = slot * 0.64;
    const top = y(Math.max(v, 0));
    const h = Math.abs(y(v) - y(0));
    parts.push(`<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${v < 0 ? negColor : color}" rx="2"><title>${labels[i]}: ${v}${unit}</title></rect>`);
    parts.push(`<text x="${(x + w / 2).toFixed(1)}" y="${height - 8}" class="tick" text-anchor="middle">${labels[i]}</text>`);
    parts.push(`<text x="${(x + w / 2).toFixed(1)}" y="${(v < 0 ? y(v) + 14 : top - 5).toFixed(1)}" class="barval" text-anchor="middle">${v}${unit}</text>`);
  });
  parts.push('</svg>');
  return parts.join('');
}

// Horizontal bars sorted as given: rows of [label, value].
export function hbarChart({ rows, width = 720, height = 340, unit = '', color = '#0b3d91', ariaLabel = 'Horizontal bar chart' }) {
  const labelW = 218;
  const max = Math.max(...rows.map((r) => r[1]));
  const rowH = height / rows.length;
  const barH = Math.min(20, rowH - 8);
  const parts = [`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${ariaLabel}" class="chart">`];
  rows.forEach((r, i) => {
    const yy = i * rowH + rowH / 2;
    const w = ((width - labelW - 64) * r[1]) / max;
    parts.push(`<text x="${labelW - 8}" y="${yy + 4}" class="barlab" text-anchor="end">${r[0]}</text>`);
    parts.push(`<rect x="${labelW}" y="${yy - barH / 2}" width="${w.toFixed(1)}" height="${barH}" fill="${color}" rx="2"><title>${r[0]}: ${r[1]}${unit}</title></rect>`);
    parts.push(`<text x="${labelW + w + 7}" y="${yy + 4}" class="barval">${r[1]}${unit}</text>`);
  });
  parts.push('</svg>');
  return parts.join('');
}

// Population pyramid: rows of [age, male %, female %], youngest first.
export function pyramidChart({ rows, width = 720, height = 460, unit = '%', ariaLabel = 'Population pyramid' }) {
  const midX = width / 2;
  const labelW = 44;
  const max = Math.max(...rows.flatMap((r) => [r[1], r[2]])) * 1.12;
  const rowH = height / rows.length;
  const barH = Math.min(18, rowH - 5);
  const parts = [`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${ariaLabel}" class="chart">`];
  parts.push(`<text x="${midX - 10}" y="14" class="pyrhead" text-anchor="end">Men</text>`);
  parts.push(`<text x="${midX + 10}" y="14" class="pyrhead">Women</text>`);
  rows.forEach((r, i) => {
    const yy = 22 + i * rowH + rowH / 2;
    const mw = ((midX - labelW - 46) * r[1]) / max;
    const fw = ((midX - labelW - 46) * r[2]) / max;
    parts.push(`<rect x="${(midX - labelW / 2 - mw).toFixed(1)}" y="${yy - barH / 2}" width="${mw.toFixed(1)}" height="${barH}" fill="#0b3d91" rx="2"><title>Age ${r[0]}, men: ${r[1]}${unit}</title></rect>`);
    parts.push(`<rect x="${(midX + labelW / 2).toFixed(1)}" y="${yy - barH / 2}" width="${fw.toFixed(1)}" height="${barH}" fill="#d97706" rx="2"><title>Age ${r[0]}, women: ${r[2]}${unit}</title></rect>`);
    parts.push(`<text x="${midX}" y="${yy + 4}" class="barlab" text-anchor="middle">${r[0]}</text>`);
    parts.push(`<text x="${(midX - labelW / 2 - mw - 6).toFixed(1)}" y="${yy + 4}" class="barval" text-anchor="end">${r[1]}</text>`);
    parts.push(`<text x="${(midX + labelW / 2 + fw + 6).toFixed(1)}" y="${yy + 4}" class="barval">${r[2]}</text>`);
  });
  parts.push('</svg>');
  return parts.join('');
}

// A donut of shares: rows of [label, value]. Returns svg + legend html.
export function donutChart({ rows, size = 300, ariaLabel = 'Donut chart' }) {
  const total = rows.reduce((a, r) => a + r[1], 0);
  const cx = size / 2;
  const cy = size / 2;
  const rad = size / 2 - 8;
  const inner = rad * 0.58;
  let acc = -Math.PI / 2;
  const parts = [`<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${ariaLabel}" class="chart donut">`];
  rows.forEach((r, i) => {
    const frac = r[1] / total;
    const a0 = acc;
    const a1 = acc + frac * Math.PI * 2;
    acc = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + rad * Math.cos(a0), y0 = cy + rad * Math.sin(a0);
    const x1 = cx + rad * Math.cos(a1), y1 = cy + rad * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    parts.push(`<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${rad},${rad} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${NS_COLORS[i % NS_COLORS.length]}" opacity="${0.55 + (i % 3) * 0.2}"><title>${r[0]}: ${r[1]}%</title></path>`);
  });
  parts.push(`<text x="${cx}" y="${cy - 2}" class="donutbig" text-anchor="middle">100%</text>`);
  parts.push(`<text x="${cx}" y="${cy + 18}" class="donutsub" text-anchor="middle">of GDP</text>`);
  parts.push('</svg>');
  return parts.join('');
}
