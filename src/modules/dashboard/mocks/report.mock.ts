import { reportPeriodLabel } from "../constants/report";
import type {
  ReportData,
  ReportPeriod,
  ReportSeriesPoint,
} from "../interfaces/report";

const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

/** Gerador pseudo-aleatório determinístico (mesmo período → mesmos números). */
function seeded(seed: number) {
  let s = Math.floor(seed) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildSeries(period: ReportPeriod): ReportSeriesPoint[] {
  const start = new Date(`${period.startDate}T00:00:00`);
  const end = new Date(`${period.endDate}T00:00:00`);
  const rnd = seeded(start.getTime() / 86400000 + end.getTime() / 86400000);

  const point = (label: string, base: number): ReportSeriesPoint => {
    const enviados = Math.round(base * (0.7 + rnd() * 0.6));
    const entregues = Math.round(enviados * (0.94 + rnd() * 0.05));
    return { label, enviados, entregues };
  };

  switch (period.type) {
    case "daily":
      return Array.from({ length: 8 }, (_, i) =>
        point(`${String(i * 3).padStart(2, "0")}h`, 180),
      );
    case "weekly":
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return point(WEEKDAYS[d.getDay()], 900);
      });
    case "monthly":
      return Array.from({ length: 5 }, (_, i) => point(`Sem ${i + 1}`, 4200));
    case "quarterly":
      return Array.from({ length: 3 }, (_, i) => {
        const d = new Date(start);
        d.setMonth(start.getMonth() + i + 1);
        return point(MONTHS[d.getMonth()], 15000);
      });
    case "yearly":
      return Array.from({ length: 12 }, (_, i) => {
        const d = new Date(start);
        d.setMonth(start.getMonth() + i + 1);
        return point(MONTHS[d.getMonth()], 16000);
      });
    case "custom": {
      const days = Math.max(
        1,
        Math.round((end.getTime() - start.getTime()) / 86400000) + 1,
      );
      const buckets = Math.min(12, Math.max(2, days));
      return Array.from({ length: buckets }, (_, i) => {
        const d = new Date(start);
        d.setDate(
          start.getDate() + Math.round((i * (days - 1)) / (buckets - 1)),
        );
        return point(
          `${d.getDate()}/${d.getMonth() + 1}`,
          (days / buckets) * 850,
        );
      });
    }
  }
}

const fmt = new Intl.NumberFormat("pt-PT");

/** Mock dos dados do relatório — a substituir pela API futuramente. */
export function getDashboardReportMock(period: ReportPeriod): ReportData {
  const series = buildSeries(period);
  const sent = series.reduce((a, p) => a + p.enviados, 0);
  const delivered = series.reduce((a, p) => a + p.entregues, 0);
  const rate = sent ? (delivered / sent) * 100 : 0;

  return {
    title: `Relatório ${reportPeriodLabel[period.type].toLowerCase()} — Dashboard`,
    period,
    generatedAt: new Date().toISOString(),
    stats: [
      {
        label: "Campanhas ativas",
        value: "24",
        trend: "+3 no período",
        trendUp: true,
      },
      {
        label: "SMS enviados",
        value: fmt.format(sent),
        trend: "+8% vs. anterior",
        trendUp: true,
      },
      {
        label: "SMS entregues",
        value: fmt.format(delivered),
        trend: "+7% vs. anterior",
        trendUp: true,
      },
      {
        label: "Taxa de entrega",
        value: `${rate.toFixed(1)}%`,
        trend: "-0.3% vs. anterior",
        trendUp: false,
      },
    ],
    series,
  };
}
