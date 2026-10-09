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
