import {
  IDeliveryStatusItem,
  IOperatorStatItem,
  ITrafficVolumePoint,
} from '../../interfaces/reports';
import { ReportsOperatorsCard } from './ReportsOperatorsCard';
import { ReportsTrafficChart } from './ReportsTrafficChart';
import { operatorStatsMock } from '../../mocks/reports.mock';

interface ReportsChartsSectionProps {
  trafficData: ITrafficVolumePoint[];
  deliveryData: IDeliveryStatusItem[];
  operatorData?: IOperatorStatItem[];
}

export function ReportsChartsSection({
  trafficData,
  operatorData = operatorStatsMock,
}: ReportsChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <ReportsTrafficChart data={trafficData} />
      </div>
      <div className="lg:col-span-5">
        <ReportsOperatorsCard operators={operatorData} />
      </div>
    </div>
  );
}
