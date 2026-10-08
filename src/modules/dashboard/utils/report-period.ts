import type { ReportPeriod, ReportPeriodType } from "../interfaces/report";

export const toDateStr = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/** Calcula start/end para períodos pré-definidos (terminando hoje). */
export function resolvePeriod(
  type: ReportPeriodType,
  custom?: { startDate: string; endDate: string },
  now: Date = new Date(),
): ReportPeriod {
  const end = new Date(now);
  const start = new Date(now);

  switch (type) {
    case "daily":
      break;
    case "weekly":
      start.setDate(end.getDate() - 6);
      break;
    case "monthly":
      start.setDate(end.getDate() - 29);
      break;
    case "quarterly":
      start.setMonth(end.getMonth() - 3);
      break;
    case "yearly":
      start.setFullYear(end.getFullYear() - 1);
      break;
    case "custom":
      return {
        type,
        startDate: custom?.startDate ?? toDateStr(start),
        endDate: custom?.endDate ?? toDateStr(end),
      };
  }

  return { type, startDate: toDateStr(start), endDate: toDateStr(end) };
}

const displayFormatter = new Intl.DateTimeFormat("pt-PT", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const formatDisplayDate = (iso: string) =>
  displayFormatter.format(new Date(`${iso}T00:00:00`));
