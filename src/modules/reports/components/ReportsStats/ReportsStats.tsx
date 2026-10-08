import { IReportStatItem } from '../../interfaces/reports';
import { ReportsStatsCard } from './ReportsStatsCard';

interface ReportsStatsProps {
  stats: IReportStatItem[];
}

export function ReportsStats({ stats }: ReportsStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <ReportsStatsCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
