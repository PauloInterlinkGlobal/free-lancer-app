'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { Select } from '@/core/components/Select';
import { VariablesDropdown } from '@/core/components/VariablesDropdown';
import { useToastStore } from '@/core/store/toast.store';
import { contactsMock } from '@/modules/contacts/contacts-geral/mocks/contacts.mock';
import { collectCustomVariableKeys } from '@/modules/contacts/contacts-geral/utils/collectCustomVariableKeys';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TEMPLATE_CATEGORIES } from '../../constants/templates';
import { ITemplate, TemplateCategory } from '../../interfaces/templates';
import { extractVariables } from '../../utils/templates-filters';

// TODO(api): as chaves personalizadas devem vir da lista de contactos da conta.
const EDIT_TEMPLATE_CUSTOM_KEYS = collectCustomVariableKeys(contactsMock);

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
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Repõe o formulário com o modelo atual sempre que o modal abre,
  // para que edições não guardadas não sobrevivam a um fecho.
  useEffect(() => {
    if (isOpen && template) {
      setTitle(template.title);
      setCategory(template.category);
      setContent(template.content);
      setError('');
    }
  }, [isOpen, template]);

  const variables = extractVariables(content);

  const handleClose = () => {
    setError('');
    onClose();
  };

  // Insere o token na posição do cursor, como no editor de mensagens.
  const insertVariableToken = (token: string) => {
    const el = contentRef.current;
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
      <div className="w-full max-w-lg rounded-xl border border-border-ui bg-surface shadow-2xl">
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
              <label
                htmlFor="edit-template-content"
                className="text-sm font-medium text-primary-content"
              >
                Conteúdo do Modelo
              </label>
              <span className="font-mono text-xs text-muted-content">
                {variables.length}{' '}
                {variables.length === 1 ? 'variável' : 'variáveis'}
              </span>
            </div>

            <textarea
              ref={contentRef}
              id="edit-template-content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ex: Sr(a) {{firstName}}, a sua encomenda {{codigo}} está a caminho..."
              className="w-full resize-none rounded-xl border border-border-ui bg-surface px-3 py-2 text-sm text-primary-content outline-none transition-colors placeholder:text-muted-content focus:border-primary focus:ring-1 focus:ring-primary dark:focus:ring-primary-400"
            />

            <div className="flex items-center">
              <VariablesDropdown
                onSelect={insertVariableToken}
                customKeys={EDIT_TEMPLATE_CUSTOM_KEYS}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex items-center justify-end gap-2 border-t border-dashed border-border-ui pt-4">
            <button
              type="submit"
              className="flex items-center m-auto gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Check size={16} />
              Guardar Alterações
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center m-auto gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
