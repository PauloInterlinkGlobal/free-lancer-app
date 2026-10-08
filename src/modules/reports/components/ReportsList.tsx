import {
  ICampaignReport,
  IDeliveryStatusItem,
  IReportStatItem,
  ITrafficVolumePoint,
  ReportsFiltersValue,
} from '../interfaces/reports';
import {
  campaignReportsMock,
  deliveryStatusMock,
  reportStatsMock,
  trafficVolumeMock,
} from '../mocks/reports.mock';
import { filterCampaignReports, paginate } from '../utils/reports-filters';
import { GenerateReportModal } from './GenerateReportModal';
import { ReportsCampaignTable } from './ReportsCampaignTable/ReportsCampaignTable';
import { ReportsChartsSection } from './ReportsCharts/ReportsChartsSection';
import { ReportsStats } from './ReportsStats/ReportsStats';

interface ReportsListProps {
  stats?: IReportStatItem[];
  trafficData?: ITrafficVolumePoint[];
  deliveryData?: IDeliveryStatusItem[];
  campaigns?: ICampaignReport[];
  filters: ReportsFiltersValue;
}

export function ReportsList({
  stats = reportStatsMock,
  trafficData = trafficVolumeMock,
  deliveryData = deliveryStatusMock,
  campaigns = campaignReportsMock,
  filters,
}: ReportsListProps) {
  const filtered = filterCampaignReports(campaigns, filters);
  const { items, currentPage, totalPages, totalItems } = paginate(
    filtered,
    filters.page
  );

  return (
    <div className="flex flex-col gap-6">
      <ReportsStats stats={stats} />
      <ReportsChartsSection
        trafficData={trafficData}
        deliveryData={deliveryData}
      />
      <ReportsCampaignTable
        data={items}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
      />
      <GenerateReportModal campaigns={campaigns} />
    </div>
  );
}
