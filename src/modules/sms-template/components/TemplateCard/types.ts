import { ITemplate } from '../../interfaces/templates';

export interface TemplateCardProps {
  template: ITemplate;
  onEdit?: (template: ITemplate) => void;
  onDelete?: (template: ITemplate) => void;
  onUseAsBase?: (template: ITemplate) => void;
}
