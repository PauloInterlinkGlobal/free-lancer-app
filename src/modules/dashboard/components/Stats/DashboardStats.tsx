import { IStatCard } from '@/modules/dashboard/interfaces/dashboard';
import { StatsCard } from './StatsCard';

interface DashboardStatsProps {
  stats: IStatCard[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatsCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
