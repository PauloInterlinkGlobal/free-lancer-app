export type CampaignStatus =
  'COMPLETED' | 'IN_PROGRESS' | 'SCHEDULED' | 'FAILED';

export type ReportExportPeriod = 'daily' | 'weekly' | 'monthly';

export interface IReportStatItem {
  id: string;
  label: string;
  value: string | number;
  subValue?: string;
  trend: string;
  trendUp: boolean;
  type: 'sms' | 'rate' | 'cost' | 'sender';
  description?: string;
}

export interface ITrafficVolumePoint {
  date: string;
  sent: number;
  delivered: number;
  failed: number;
}

export interface IDeliveryStatusItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface IOperatorStatItem {
  name: string;
  totalSent: number;
  deliveryRate: number;
  percentage: number;
  color: string;
}

export interface ICampaignReport {
  id: string;
  name: string;
  sender: string;
  cost: number;
  currency: string;
  status: CampaignStatus;
  createdAt: string;
  totalRecipients: number;
  deliveredCount: number;
  failedCount: number;
  messagePreview?: string;
}

export interface ReportsFiltersValue {
  search: string;
  period: string;
  sender: string;
  status: string;
  page: number;
}
