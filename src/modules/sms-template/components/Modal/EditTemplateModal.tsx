'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { Select } from '@/core/components/Select';
import { VariablesDropdown } from '@/core/components/VariablesDropdown';
import { useToastStore } from '@/core/store/toast.store';
import { Check, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TEMPLATE_CATEGORIES } from '../../constants/templates';
import { ITemplate, TemplateCategory } from '../../interfaces/templates';
import { extractVariables } from '../../utils/templates-filters';

interface EditTemplateModalProps {
  isOpen: boolean;
  template: ITemplate | null;
  onClose: () => void;
  onSave?: (updatedTemplate: ITemplate) => void;
}

export function EditTemplateModal({
  isOpen,
  template,
  onClose,
  onSave,
}: EditTemplateModalProps) {
  const { success } = useToastStore();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TemplateCategory>('promocional');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (template) {
      setTitle(template.title);
      setCategory(template.category);
      setContent(template.content);
      setError('');
    }
  }, [template]);

  const variables = extractVariables(content);

  const handleClose = () => {
    setError('');
    onClose();
  };

  const insertVariableToken = (token: string) => {
    const el = textareaRef.current;
    if (!el) {
      setContent((prev) => prev + token);
      return;
    }

    const start = el.selectionStart ?? content.length;
    const end = el.selectionEnd ?? content.length;
    setContent(content.slice(0, start) + token + content.slice(end));

    requestAnimationFrame(() => {
      el.focus();
      const pos = start + token.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('O título do modelo é obrigatório.');
      return;
    }

    if (!content.trim()) {
      setError('O conteúdo da mensagem é obrigatório.');
      return;
    }

    if (template) {
      const updated: ITemplate = {
        ...template,
        title: title.trim(),
        category,
        content: content.trim(),
        variablesCount: variables.length,
      };

      onSave?.(updated);
    }

    success('Modelo atualizado com sucesso!');
    handleClose();
  };

  const selectableCategories = TEMPLATE_CATEGORIES.filter(
    (c) => c.value !== ''
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border-ui bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
          <div>
            <h2 className="text-sm font-medium text-primary-content">
              Editar Modelo de Mensagem
            </h2>
            <p className="text-xs text-muted-content">
              Modifique os parâmetros e o texto do modelo selecionado.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-raised hover:text-primary-content"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <Input
            autoFocus
            label="Título do Modelo"
            placeholder="Ex: Promoção Luanda"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            error={error}
          />

          <Select
            label="Categoria"
            options={selectableCategories}
            value={category}
            onChange={(v) => setCategory(String(v) as TemplateCategory)}
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                Conteúdo do Modelo
              </label>
              <span className="font-mono text-xs text-text-muted">
                {variables.length}{' '}
                {variables.length === 1 ? 'variável' : 'variáveis'}
              </span>
            </div>

            <textarea
              ref={textareaRef}
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ex: Sr(a) {{firstName}}, a sua encomenda {{codigo}} está a caminho..."
              className="w-full resize-none rounded-xl border border-border-ui bg-surface px-3 py-2 text-sm text-primary-content placeholder:text-muted-content outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:focus:ring-primary-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <VariablesDropdown onSelect={insertVariableToken} />
          </div>

          {/* Actions */}
          <div className="mt-2 flex items-center justify-end gap-2 border-t border-dashed border-border-ui pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-border-ui bg-surface-raised px-4 py-2 text-sm text-secondary-content transition-colors hover:bg-item-hover hover:text-primary-content"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Check size={16} />
              Guardar Alterações
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
