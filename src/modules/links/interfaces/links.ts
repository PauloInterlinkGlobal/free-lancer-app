export type LinkStatus = 'pending' | 'approved' | 'rejected';

export interface ILink {
  id: string;
  description: string;
  url: string;
  submittedAt: string;
  reviewedAt: string | null;
  status: LinkStatus;
  rejectionReason?: string;
}

export interface ILinksFilters {
  search?: string;
  status?: LinkStatus | 'all';
  page: number;
}
