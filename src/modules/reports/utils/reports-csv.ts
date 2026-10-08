import {
  campaignStatusLabel,
  REPORT_EXPORT_PERIODS,
} from "../constants/reports";
import type {
  ICampaignReport,
  ReportExportPeriod,
} from "../interfaces/reports";

const luandaDateParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Luanda",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const campaignDateFormatter = new Intl.DateTimeFormat("pt-PT", {
  timeZone: "Africa/Luanda",
  dateStyle: "short",
  timeStyle: "short",
});

const formatDateKey = (date: Date) => {
  const parts = Object.fromEntries(
    luandaDateParts.formatToParts(date).map(({ type, value }) => [type, value]),
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
};

export function getReportDateRange(
  period: ReportExportPeriod,
  now: Date = new Date(),
) {
  const endDate = formatDateKey(now);
  const startDate = new Date(`${endDate}T00:00:00.000Z`);
  const daysBack = { daily: 0, weekly: 6, monthly: 29 }[period];
  startDate.setUTCDate(startDate.getUTCDate() - daysBack);

  return {
    startDate: startDate.toISOString().slice(0, 10),
    endDate,
  };
}

const escapeCsvCell = (value: string | number) =>
  `"${String(value).replace(/"/g, '""')}"`;

const formatAmount = (value: number) => value.toFixed(2).replace(".", ",");

const formatCampaignDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : campaignDateFormatter.format(date);
};

export function buildCampaignReportCsv(
  campaigns: ICampaignReport[],
  period: ReportExportPeriod,
  now: Date = new Date(),
) {
  const { startDate, endDate } = getReportDateRange(period, now);
  const periodOption = REPORT_EXPORT_PERIODS.find(
    (option) => option.value === period,
  );
  const periodLabel = periodOption?.label ?? period;

  const periodCampaigns = campaigns.filter((campaign) => {
    const createdAt = new Date(campaign.createdAt);
    if (Number.isNaN(createdAt.getTime())) return false;

    const campaignDate = formatDateKey(createdAt);
    return campaignDate >= startDate && campaignDate <= endDate;
  });

  const totalRecipients = periodCampaigns.reduce(
    (total, campaign) => total + campaign.totalRecipients,
    0,
  );
  const totalDelivered = periodCampaigns.reduce(
    (total, campaign) => total + campaign.deliveredCount,
    0,
  );
  const totalFailed = periodCampaigns.reduce(
    (total, campaign) => total + campaign.failedCount,
    0,
  );
  const currencies = [
    ...new Set(periodCampaigns.map(({ currency }) => currency)),
  ];
  const totalCost = periodCampaigns.reduce(
    (total, campaign) => total + campaign.cost,
    0,
  );

  const rows: (string | number)[][] = [
    [
      "Tipo de registo",
      "Tipo de período",
      "Data de início",
      "Data de fim",
      "Campanha",
      "Remetente",
      "Estado",
      "Data de criação",
      "Destinatários",
      "Entregues",
      "Falhados",
      "Custo",
      "Moeda",
    ],
    [
      "Resumo",
      periodLabel,
      startDate,
      endDate,
      `${periodCampaigns.length} campanha(s)`,
      "",
      "",
      "",
      totalRecipients,
      totalDelivered,
      totalFailed,
      currencies.length <= 1 ? formatAmount(totalCost) : "",
      currencies.length === 1 ? currencies[0] : "",
    ],
    ...periodCampaigns.map((campaign) => [
      "Campanha",
      periodLabel,
      startDate,
      endDate,
      campaign.name,
      campaign.sender,
      campaignStatusLabel[campaign.status],
      formatCampaignDate(campaign.createdAt),
      campaign.totalRecipients,
      campaign.deliveredCount,
      campaign.failedCount,
      formatAmount(campaign.cost),
      campaign.currency,
    ]),
  ];

  const csv = rows.map((row) => row.map(escapeCsvCell).join(";")).join("\r\n");

  return {
    csv: `\uFEFF${csv}`,
    campaignCount: periodCampaigns.length,
    fileName: `relatorio-${period}-${startDate}-${endDate}.csv`,
  };
}

export function downloadCampaignReportCsv(
  campaigns: ICampaignReport[],
  period: ReportExportPeriod,
) {
  const report = buildCampaignReportCsv(campaigns, period);
  const blob = new Blob([report.csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = report.fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);

  return report;
}
