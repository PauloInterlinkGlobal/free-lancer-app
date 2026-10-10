import { Metadata } from 'next';

import { DashboardCharts } from '@/modules/dashboard/components/Chart/DashboardCharts';
import { DashboardStats } from '@/modules/dashboard/components/Stats/DashboardStats';
import { DashboardRecentTable } from '@/modules/dashboard/components/Table/DashboardRecentTable';
import { getDashboardStats } from '@/modules/dashboard/queries/get-dashboard-stats';

export const metadata: Metadata = {
  title: 'Dashboard | SMSillico',
};

export default async function DashboardPage() {
  const { stats, chartData, recentCampaigns } = await getDashboardStats();

  return (
    <div className="flex flex-col gap-6">
      <DashboardStats stats={stats} />
      <DashboardCharts chartData={chartData} />
      <DashboardRecentTable campaigns={recentCampaigns} />
    </div>
  );
}
