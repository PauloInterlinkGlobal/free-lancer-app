/**
 * Camada de serviço do módulo settings-project.
 *
 * ⚠️ Ainda NÃO faz chamadas HTTP. Devolve mocks com latência simulada.
 * Quando a API estiver disponível, substituir o corpo de cada função por
 * `serverRequest` (src/core/helpers/request.helper.ts) mantendo as assinaturas:
 *
 *   POST /api/v4/projects            body: CreateProjectPayload  -> ApiResponse<ProjectEntity>
 *   POST /api/v4/projects (listar)                               -> ApiResponse<ProjectEntity[]>
 */
import type {
  ApiResponse,
  CreateProjectPayload,
  ProjectEntity,
} from "../interfaces";
import {
  PROJECT_MOCK_RESPONSE,
  PROJECTS_MOCK_RESPONSE,
} from "../mocks/project.mock";

const simulateLatency = (ms = 800) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function getMyProjects(): Promise<ApiResponse<ProjectEntity[]>> {
  // TODO(api): serverRequest<ApiResponse<ProjectEntity[]>>({ url: '/projects', method: 'POST' })
  return PROJECTS_MOCK_RESPONSE;
}

export async function createProject(
  payload: CreateProjectPayload,
): Promise<ApiResponse<ProjectEntity>> {
  // TODO(api): serverRequest<ApiResponse<ProjectEntity>>({ url: '/projects', method: 'POST', body: payload })
  console.log("CREATE PROJECT PAYLOAD", payload);
  await simulateLatency();

  return {
    data: { ...PROJECT_MOCK_RESPONSE.data, company: payload.company },
  };
}
