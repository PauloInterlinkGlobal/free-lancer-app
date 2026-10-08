export type StatIconType = 'campaigns' | 'messages' | 'users' | 'deliveryRate';

export interface IStatCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  iconType?: StatIconType;
}

export interface IChartData {
  month: string;
  enviados: number;
  entregues: number;
}

export interface ICampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  sent: number;
  delivered: number;
  date: string;
}

export interface IDashboardStats {
  stats: IStatCard[];
  chartData: IChartData[];
  recentCampaigns: ICampaign[];
}
