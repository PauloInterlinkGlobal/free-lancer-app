'use client';

import { DeleteModal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useEffect, useMemo, useState } from 'react';
import { ITemplate } from '../../interfaces/templates';
import { useTemplatePreviewStore } from '../../store/useTemplatePreviewStore';
import { EditTemplateModal } from '../Modal/EditTemplateModal';
import { TemplateCard } from '../TemplateCard/TemplateCard';

const PAGE_SIZE = 5;

interface TemplatesGridProps {
  initialTemplates: ITemplate[];
  onUseAsBase?: (template: ITemplate) => void;
}

export function TemplatesGrid({
  initialTemplates,
  onUseAsBase,
}: TemplatesGridProps) {
  const { success } = useToastStore();
  const selectedTemplate = useTemplatePreviewStore(
    (state) => state.selectedTemplate
  );
  const setSelectedTemplate = useTemplatePreviewStore(
    (state) => state.setSelectedTemplate
  );

  const [templates, setTemplates] = useState<ITemplate[]>(initialTemplates);
  const [editingTemplate, setEditingTemplate] = useState<ITemplate | null>(
    null
  );
  const [deletingTemplate, setDeletingTemplate] = useState<ITemplate | null>(
    null
  );

  const [page, setPage] = useState(1);

  const sortedByRecent = useMemo(
    () =>
      [...templates].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [templates]
  );
  const totalPages = Math.max(1, Math.ceil(sortedByRecent.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sortedByRecent.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Set default preview template if none selected or if list changes
  useEffect(() => {
    setTemplates(initialTemplates);
    if (!selectedTemplate && initialTemplates.length > 0) {
      setSelectedTemplate(initialTemplates[0]);
    }
  }, [initialTemplates]);

  const handleEdit = (template: ITemplate) => {
    setEditingTemplate(template);
  };

  const handleDelete = (template: ITemplate) => {
    setDeletingTemplate(template);
  };

  const handleSaveEdit = (updatedTemplate: ITemplate) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === updatedTemplate.id ? updatedTemplate : t))
    );
  };

  const handleConfirmDelete = () => {
    if (!deletingTemplate) return;

    setTemplates((prev) => prev.filter((t) => t.id !== deletingTemplate.id));
    success(`Modelo "${deletingTemplate.title}" eliminado com sucesso!`);
    setDeletingTemplate(null);
  };

  const renderCard = (template: ITemplate) => (
    <TemplateCard
      key={template.id}
      template={template}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onUseAsBase={onUseAsBase}
    />
  );

  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-ui bg-surface p-12 text-center">
        <p className="text-sm font-medium text-text-muted">
          Nenhum modelo de mensagem encontrado para os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pageItems.map(renderCard)}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="rounded-lg border border-border-ui bg-surface px-3 py-1.5 text-sm font-medium text-text-muted disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Anterior
          </button>
          <span className="text-sm text-text-muted">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="rounded-lg border border-border-ui bg-surface px-3 py-1.5 text-sm font-medium text-text-muted disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Seguinte
          </button>
        </div>
      )}

      <EditTemplateModal
        isOpen={Boolean(editingTemplate)}
        template={editingTemplate}
        onClose={() => setEditingTemplate(null)}
        onSave={handleSaveEdit}
      />

      <DeleteModal
        isOpen={Boolean(deletingTemplate)}
        title="Eliminar Modelo de Mensagem"
        itemType="modelo de mensagem"
        itemName={deletingTemplate?.title}
        warningMessage="Esta ação removerá o modelo de forma permanente da sua biblioteca de templates."
        confirmText="Eliminar Modelo"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingTemplate(null)}
      />
    </>
  );
}
