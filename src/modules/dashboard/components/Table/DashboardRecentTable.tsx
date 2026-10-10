import { RecentCampaignsTable } from '@/modules/dashboard/components/Table/RecentCampaignsTable';
import { ICampaign } from '@/modules/dashboard/interfaces/dashboard';
import { History } from 'lucide-react';

interface DashboardRecentTableProps {
  campaigns: ICampaign[];
}

export function DashboardRecentTable({ campaigns }: DashboardRecentTableProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-primary-content">Recentes</h2>
      <RecentCampaignsTable campaigns={campaigns} />
    </section>
  );
}

export default DashboardRecentTable;
