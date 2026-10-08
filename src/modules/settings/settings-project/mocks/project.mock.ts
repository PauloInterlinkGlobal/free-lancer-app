import type { ApiResponse, ProjectEntity } from "../interfaces";

/** Simula o ProjectEntity que virá do backend */
export const PROJECT_MOCK: ProjectEntity = {
  projectId: "proj_sms_001",
  name: "SMSillico",
  type: "Marketing",
  description: "Plataforma de gestão de campanhas de SMS e automações.",
  status: "active",
  company: {
    tradeName: "SMSillico",
    nif: "5000000000",
    sector: "Tecnologia",
    contacts: {
      phone: 923000000,
      email: "empresa@smsillico.com",
      isPhoneVerified: false,
      isEmailVerified: true,
    },
    address: {
      streetAddress: "Rua Principal",
      neighborhood: "Talatona",
      city: "Luanda",
      country: "Angola",
    },
    website: "https://smsillico.com",
  },
  owner: "64d8f3d77d9a4e2e5b8c1234",
  customFields: [],
  createdAt: "2026-02-01T10:00:00.000Z",
};

/** Resposta mock de `POST /api/v4/projects` (criar) */
export const PROJECT_MOCK_RESPONSE: ApiResponse<ProjectEntity> = {
  data: PROJECT_MOCK,
};

/** Resposta mock de `/api/v4/projects` (projetos do utilizador) */
export const PROJECTS_MOCK_RESPONSE: ApiResponse<ProjectEntity[]> = {
  data: [PROJECT_MOCK],
};
