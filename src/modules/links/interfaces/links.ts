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

export interface LinkCreateInput {
  url: string;
  description: string;
}

export type LinkCreateResult =
  | { ok: true }
  | { ok: false; errors: { url?: string; description?: string } };

export type LinkDeleteResult = { ok: true } | { ok: false; error: string };

export interface ILinksFilters {
  search?: string;
  status?: string;
  page: number;
}

export interface LinkFormValues {
  url: string;
  description: string;
}

// Estado devolvido por createLinkAction ao useActionState do formulário.
export interface LinkFormState {
  ok: boolean;
  errors: { url?: string; description?: string };
  values: LinkFormValues;
}
