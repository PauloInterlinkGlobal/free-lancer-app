export type TemplateCategory =
  'promocional' | 'transacional' | 'notificacao' | 'cobranca';

export interface ITemplate {
  id: string;
  title: string;
  category: TemplateCategory;
  content: string;
  createdAt: string;
  variablesCount: number;
}

export interface TemplatesFiltersValue {
  search?: string;
  category?: string;
  sortBy?: 'recent' | 'name' | 'variables';
  page?: number;
}
