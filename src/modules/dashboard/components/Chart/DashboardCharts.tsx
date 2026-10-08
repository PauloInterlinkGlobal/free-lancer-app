import { IChartData } from '@/modules/dashboard/interfaces/dashboard';
import { ChartLine } from './ChartLine';

interface DashboardChartsProps {
  chartData: IChartData[];
}

export function DashboardCharts({ chartData }: DashboardChartsProps) {
  return (
    <div className="bg-surface rounded-2xl border border-border-ui p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div>
          <h2 className="text-base font-semibold text-text-primary">
            SMS por mês
          </h2>
          <p className="text-xs text-text-muted">
            Evolução comparativa entre SMS enviados e entregues
          </p>
        </div>
      </div>
      <ChartLine data={chartData} />
    </div>
  );
}

export default DashboardCharts;
