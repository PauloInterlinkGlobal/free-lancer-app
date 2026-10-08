import { PROJECTS_MOCK_RESPONSE } from "../mocks/project.mock";
import { ProjectForm } from "./ProjectForm";

/**
 * Container da aba "Projeto".
 * Hoje lê o mock; futuramente passará a usar `getMyProjects()` do serviço.
 */
export function ProjectList() {
  const [project] = PROJECTS_MOCK_RESPONSE.data;

  return (
    <div className="flex flex-col gap-6">
      <ProjectForm initialData={project} />
    </div>
  );
}

export default ProjectList;
