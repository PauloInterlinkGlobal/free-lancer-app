'use client';

import { Calendar } from 'lucide-react';
import { CATEGORY_BADGE_STYLES } from '../../constants/templates';
import { useTemplatePreviewStore } from '../../store/useTemplatePreviewStore';
import { TemplateCardHighlight } from './components/TemplateCardHighlight';
import { TemplateCardMenu } from './components/TemplateCardMenu';
import { TemplateCardProps } from './types';

export function TemplateCard({
  template,
  onEdit,
  onDelete,
  onUseAsBase,
}: TemplateCardProps) {
  const selectedTemplate = useTemplatePreviewStore(
    (state) => state.selectedTemplate
  );
  const setSelectedTemplate = useTemplatePreviewStore(
    (state) => state.setSelectedTemplate
  );

  const isSelected = selectedTemplate?.id === template.id;

  const badge = CATEGORY_BADGE_STYLES[template.category] ?? {
    label: template.category.toUpperCase(),
    className: 'bg-surface-raised text-secondary-content border-border-ui',
  };

  const formattedDate = new Date(template.createdAt).toLocaleDateString(
    'pt-PT'
  );

  return (
    <div
      onClick={() => setSelectedTemplate(template)}
      className={`group relative flex flex-col justify-between rounded-xl border bg-surface p-4 transition-colors duration-200 cursor-pointer ${
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-border-ui hover:bg-surface-raised'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badge.className}`}
            >
              {badge.label}
            </span>
          </div>

          <TemplateCardMenu
            template={template}
            onEdit={onEdit}
            onDelete={onDelete}
            onUseAsBase={onUseAsBase}
          />
        </div>

        <h3 className="mb-3 text-sm font-medium text-primary-content">
          {template.title}
        </h3>

        <TemplateCardHighlight content={template.content} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-dashed border-border-ui pt-3 text-xs text-muted-content">
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar size={14} />
          <span>{formattedDate}</span>
        </div>

        <span className="rounded-lg bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary">
          Variáveis: {template.variablesCount}
        </span>
      </div>
    </div>
  );
}

export default TemplateCard;
