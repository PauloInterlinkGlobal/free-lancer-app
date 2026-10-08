import { ITemplate, TemplatesFiltersValue } from '../interfaces/templates';
import { filterTemplates } from '../utils/templates-filters';
import { TemplatesWorkspace } from './TemplatesWorkspace';

interface TemplatesListProps {
  data: ITemplate[];
  filters: TemplatesFiltersValue;
}

export function TemplatesList({ data, filters }: TemplatesListProps) {
  return <TemplatesWorkspace templates={filterTemplates(data, filters)} />;
}

export default TemplatesList;
