import type { ReportData, ReportPeriod } from "../interfaces/report";
import { getDashboardReportMock } from "../mocks/report.mock";
import { formatDisplayDate } from "./report-period";

/* ------------------------------ Layout ---------------------------------- */
const W = 1000;
const PAD = 48;
const COLORS = {
  bg: "#f6f8fb",
  card: "#ffffff",
  border: "#c8d2de",
  text: "#0b1c30",
  muted: "#4d556b",
  primary: "#3796d2",
  secondary: "#e8571d",
  up: "#16a34a",
  down: "#dc2626",
  grid: "#e3e9f1",
};
const FONT = "font-family=\"Poppins, 'Segoe UI', Arial, sans-serif\"";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const nf = new Intl.NumberFormat("pt-PT");

/* ------------------------------ Secções --------------------------------- */
function header(data: ReportData): string {
  const { startDate, endDate } = data.period;
  const generated = new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(data.generatedAt));

  return `
  <rect x="${PAD}" y="${PAD}" width="${W - PAD * 2}" height="92" rx="16" fill="${COLORS.card}" stroke="${COLORS.border}"/>
  <rect x="${PAD}" y="${PAD}" width="8" height="92" rx="4" fill="${COLORS.primary}"/>
  <text x="${PAD + 28}" y="${PAD + 38}" ${FONT} font-size="22" font-weight="700" fill="${COLORS.text}">${esc(data.title)}</text>
  <text x="${PAD + 28}" y="${PAD + 64}" ${FONT} font-size="13" fill="${COLORS.muted}">Período: ${esc(formatDisplayDate(startDate))} — ${esc(formatDisplayDate(endDate))}</text>
  <text x="${W - PAD - 20}" y="${PAD + 38}" ${FONT} font-size="20" font-weight="700" text-anchor="end" fill="${COLORS.primary}">SMS<tspan fill="${COLORS.secondary}">illico</tspan></text>
  <text x="${W - PAD - 20}" y="${PAD + 64}" ${FONT} font-size="11" text-anchor="end" fill="${COLORS.muted}">Gerado em ${esc(generated)}</text>`;
}

function statCards(data: ReportData, top: number): string {
  const gap = 16;
  const n = data.stats.length;
  const cw = (W - PAD * 2 - gap * (n - 1)) / n;
  const ch = 96;

  return data.stats
    .map((s, i) => {
      const x = PAD + i * (cw + gap);
      const trendColor = s.trendUp ? COLORS.up : COLORS.down;
      const arrow = s.trendUp ? "▲" : "▼";
      return `
  <rect x="${x}" y="${top}" width="${cw}" height="${ch}" rx="14" fill="${COLORS.card}" stroke="${COLORS.border}"/>
  <text x="${x + 18}" y="${top + 28}" ${FONT} font-size="12" fill="${COLORS.muted}">${esc(s.label)}</text>
  <text x="${x + 18}" y="${top + 60}" ${FONT} font-size="26" font-weight="700" fill="${COLORS.text}">${esc(s.value)}</text>
  <text x="${x + 18}" y="${top + 82}" ${FONT} font-size="11" fill="${trendColor}">${arrow} ${esc(s.trend)}</text>`;
    })
    .join("");
}

function lineChart(data: ReportData, top: number): string {
  const h = 300;
  const innerL = PAD + 70;
  const innerR = W - PAD - 24;
  const innerT = top + 56;
  const innerB = top + h - 44;
  const pts = data.series;
  const max = Math.max(1, ...pts.flatMap((p) => [p.enviados, p.entregues]));
  const niceMax = Math.ceil(max / 5 / 100) * 500 || 5;

  const xAt = (i: number) =>
    pts.length === 1
      ? (innerL + innerR) / 2
      : innerL + (i * (innerR - innerL)) / (pts.length - 1);
  const yAt = (v: number) => innerB - (v / niceMax) * (innerB - innerT);

  const gridLines = Array.from({ length: 6 }, (_, i) => {
    const v = (niceMax / 5) * i;
    const y = yAt(v);
    return `
  <line x1="${innerL}" y1="${y}" x2="${innerR}" y2="${y}" stroke="${COLORS.grid}" stroke-dasharray="4 4"/>
  <text x="${innerL - 10}" y="${y + 4}" ${FONT} font-size="10" text-anchor="end" fill="${COLORS.muted}">${nf.format(v)}</text>`;
  }).join("");

  const xLabels = pts
    .map(
      (p, i) =>
        `<text x="${xAt(i)}" y="${innerB + 20}" ${FONT} font-size="10" text-anchor="middle" fill="${COLORS.muted}">${esc(p.label)}</text>`,
    )
    .join("");

  const path = (key: "enviados" | "entregues") =>
    pts
      .map(
        (p, i) =>
          `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)},${yAt(p[key]).toFixed(1)}`,
      )
      .join(" ");

  const area = `${path("enviados")} L${xAt(pts.length - 1).toFixed(1)},${innerB} L${xAt(0).toFixed(1)},${innerB} Z`;

  const dots = (key: "enviados" | "entregues", color: string) =>
    pts
      .map(
        (p, i) =>
          `<circle cx="${xAt(i)}" cy="${yAt(p[key])}" r="3.5" fill="${COLORS.card}" stroke="${color}" stroke-width="2"/>`,
      )
      .join("");

  return `
  <rect x="${PAD}" y="${top}" width="${W - PAD * 2}" height="${h}" rx="16" fill="${COLORS.card}" stroke="${COLORS.border}"/>
  <text x="${PAD + 24}" y="${top + 30}" ${FONT} font-size="15" font-weight="600" fill="${COLORS.text}">Evolução de SMS</text>
  <text x="${PAD + 24}" y="${top + 46}" ${FONT} font-size="11" fill="${COLORS.muted}">Comparativo entre SMS enviados e entregues</text>
  <g transform="translate(${innerR - 190}, ${top + 22})">
    <rect width="12" height="4" rx="2" fill="${COLORS.primary}"/><text x="18" y="5" ${FONT} font-size="11" fill="${COLORS.muted}">Enviados</text>
    <rect x="95" width="12" height="4" rx="2" fill="${COLORS.secondary}"/><text x="113" y="5" ${FONT} font-size="11" fill="${COLORS.muted}">Entregues</text>
  </g>
  ${gridLines}
  <path d="${area}" fill="${COLORS.primary}" fill-opacity="0.08"/>
  <path d="${path("enviados")}" fill="none" stroke="${COLORS.primary}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="${path("entregues")}" fill="none" stroke="${COLORS.secondary}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  ${dots("enviados", COLORS.primary)}
  ${dots("entregues", COLORS.secondary)}
  ${xLabels}`;
}

function table(data: ReportData, top: number): { svg: string; height: number } {
  const rowH = 28;
  const h = 44 + rowH * (data.series.length + 1) + 16;
  const cols = [PAD + 24, PAD + 420, PAD + 620, PAD + 820];

  const rows = data.series
    .map((p, i) => {
      const y = top + 44 + rowH * (i + 1);
      const rate = p.enviados
        ? ((p.entregues / p.enviados) * 100).toFixed(1)
        : "0.0";
      const zebra =
        i % 2 === 0
          ? ""
          : `<rect x="${PAD + 1}" y="${y - 19}" width="${W - PAD * 2 - 2}" height="${rowH}" fill="${COLORS.bg}"/>`;
      return `${zebra}
  <text x="${cols[0]}" y="${y}" ${FONT} font-size="12" fill="${COLORS.text}">${esc(p.label)}</text>
  <text x="${cols[1]}" y="${y}" ${FONT} font-size="12" text-anchor="end" fill="${COLORS.text}">${nf.format(p.enviados)}</text>
  <text x="${cols[2]}" y="${y}" ${FONT} font-size="12" text-anchor="end" fill="${COLORS.text}">${nf.format(p.entregues)}</text>
  <text x="${cols[3]}" y="${y}" ${FONT} font-size="12" text-anchor="end" fill="${COLORS.text}">${rate}%</text>`;
    })
    .join("");

  const hy = top + 44;
  return {
    svg: `
  <rect x="${PAD}" y="${top}" width="${W - PAD * 2}" height="${h}" rx="16" fill="${COLORS.card}" stroke="${COLORS.border}"/>
  <text x="${PAD + 24}" y="${top + 28}" ${FONT} font-size="15" font-weight="600" fill="${COLORS.text}">Detalhe por período</text>
  <text x="${cols[0]}" y="${hy}" ${FONT} font-size="11" font-weight="600" fill="${COLORS.muted}">PERÍODO</text>
  <text x="${cols[1]}" y="${hy}" ${FONT} font-size="11" font-weight="600" text-anchor="end" fill="${COLORS.muted}">ENVIADOS</text>
  <text x="${cols[2]}" y="${hy}" ${FONT} font-size="11" font-weight="600" text-anchor="end" fill="${COLORS.muted}">ENTREGUES</text>
  <text x="${cols[3]}" y="${hy}" ${FONT} font-size="11" font-weight="600" text-anchor="end" fill="${COLORS.muted}">TAXA</text>
  <line x1="${PAD + 16}" y1="${hy + 10}" x2="${W - PAD - 16}" y2="${hy + 10}" stroke="${COLORS.border}"/>
  ${rows}`,
    height: h,
  };
}

/* ------------------------------ Público --------------------------------- */

export function buildReportSvg(data: ReportData): string {
  const statsTop = PAD + 92 + 24;
  const chartTop = statsTop + 96 + 24;
  const tableTop = chartTop + 300 + 24;
  const tbl = table(data, tableTop);
  const H = tableTop + tbl.height + PAD;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${COLORS.bg}"/>
  ${header(data)}
  ${statCards(data, statsTop)}
  ${lineChart(data, chartTop)}
  ${tbl.svg}
  <text x="${W / 2}" y="${H - 18}" ${FONT} font-size="10" text-anchor="middle" fill="${COLORS.muted}">SMSillico · Relatório gerado automaticamente · dados de demonstração</text>
</svg>`;
}

export function reportFileName(period: ReportPeriod) {
  const suffix =
    period.type === "custom"
      ? `${period.startDate}_${period.endDate}`
      : period.endDate.slice(0, period.type === "daily" ? 10 : 7);
  return `relatorio-dashboard-${period.type}-${suffix}.svg`;
}

/** Dispara o download do SVG no browser. */
export function downloadSvg(svg: string, fileName: string) {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Ponto de entrada: obtém os dados (mock), constrói o SVG e faz download.
 * TODO(api): substituir `getDashboardReportMock` por chamada à API.
 */
export async function generateDashboardReport(period: ReportPeriod) {
  const data = getDashboardReportMock(period);
  const svg = buildReportSvg(data);
  const fileName = reportFileName(period);
  downloadSvg(svg, fileName);
  return { fileName, data };
}
