import { ReportsList } from '@/modules/reports/components/ReportsList';
import {
  campaignReportsMock,
  reportStatsMock,
  trafficVolumeMock,
} from '@/modules/reports/mocks/reports.mock';
import { parseReportsFilters } from '@/modules/reports/utils/reports-filters';

interface ReportsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const filters = parseReportsFilters(await searchParams);

  return (
    <ReportsList
      stats={reportStatsMock}
      trafficData={trafficVolumeMock}
      campaigns={campaignReportsMock}
      filters={filters}
    />
  );
}
