/* -------------------------------------------------------------------------- */
/*  Modelo da API (base /api/v4) — ver contrato em services/project.service.ts */
/* -------------------------------------------------------------------------- */

export type ProjectStatus =
  "active" | "suspended" | "pending_deletion" | "deleted";

export interface CompanyContacts {
  phone: number;
  email: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
}

export interface CompanyAddress {
  streetAddress: string;
  neighborhood: string;
  city: string;
  country: string;
}

export interface ProjectCompany {
  tradeName: string;
  nif: string;
  sector: string;
  contacts: CompanyContacts;
  address: CompanyAddress;
  website: string;
}

export interface ProjectEntity {
  projectId: string;
  name: string;
  type: string;
  description: string;
  status: ProjectStatus;
  company: ProjectCompany;
  owner?: string;
  webhookUrl?: string;
  customFields: string[];
  createdAt: string;
  deletionScheduledAt?: string;
  deletionRequestedAt?: string;
  deletionRequestedBy?: string;
  deletionReason?: string;
}

/** @deprecated usar `ProjectEntity` */
export type ProjectInfo = ProjectEntity;

/** Body de `POST /api/v4/projects` */
export interface CreateProjectPayload {
  company: ProjectCompany;
}

/** Envelope padrão das respostas da API */
export interface ApiResponse<T> {
  data: T;
}

/* -------------------------------------------------------------------------- */
/*  Modelo do formulário (plano) — independente da estrutura da API            */
/* -------------------------------------------------------------------------- */

export interface ProjectFormData {
  tradeName: string;
  nif: string;
  sector: string;
  email: string;
  /** mantido como string no formulário; convertido para number no payload */
  phone: string;
  website: string;
  streetAddress: string;
  // preparados no modelo, ainda não expostos na UI
  neighborhood: string;
  city: string;
  country: string;
}

export type ProjectFormErrors = Partial<Record<keyof ProjectFormData, string>>;
