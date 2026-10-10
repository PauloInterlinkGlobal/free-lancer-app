'use client';

import { Input } from '@/core/components/Input';
import { Select } from '@/core/components/Select';
import { VariablesDropdown } from '@/core/components/VariablesDropdown';
import { useToastStore } from '@/core/store/toast.store';
import { contactsMock } from '@/modules/contacts/contacts-geral/mocks/contacts.mock';
import { collectCustomVariableKeys } from '@/modules/contacts/contacts-geral/utils/collectCustomVariableKeys';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TEMPLATE_CATEGORIES } from '../../constants/templates';
import { ITemplate, TemplateCategory } from '../../interfaces/templates';
import { useTemplatePreviewStore } from '../../store/useTemplatePreviewStore';
import { extractVariables } from '../../utils/templates-filters';
import { getSmsMetrics } from '../TemplatePreview/utils/smsMetrics';

const selectableCategories = TEMPLATE_CATEGORIES.filter((c) => c.value !== '');

// TODO(api): as chaves personalizadas devem vir da lista de contactos da conta.
const TEMPLATE_CUSTOM_KEYS = collectCustomVariableKeys(contactsMock);

export const TEMPLATE_COMPOSER_ID = 'template-composer';
export const TEMPLATE_COMPOSER_TITLE_ID = 'template-composer-title';

interface TemplateComposerProps {
  base?: ITemplate | null;
  baseNonce?: number;
}

export function TemplateComposer({ base, baseNonce }: TemplateComposerProps) {
  const { success } = useToastStore();
  const setSelectedTemplate = useTemplatePreviewStore(
    (state) => state.setSelectedTemplate
  );

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TemplateCategory>('promocional');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const variables = extractVariables(content);
  const metrics = getSmsMetrics(content);

  useEffect(() => {
    if (!base) return;
    setTitle(`${base.title} (cópia)`);
    setCategory(base.category);
    setContent(base.content);
    setError('');
  }, [base, baseNonce]);

  // Envia o rascunho para a pré-visualização mobile.
  useEffect(() => {
    if (!content.trim()) return;

    setSelectedTemplate({
      id: 'draft',
      title: title || 'Rascunho',
      category,
      content,
      createdAt: new Date().toISOString(),
      variablesCount: variables.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, category, content, setSelectedTemplate]);

  const reset = () => {
    setTitle('');
    setContent('');
    setCategory('promocional');
    setError('');
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

    success('Modelo criado com sucesso!');
    reset();
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

  return (
    <form
      id={TEMPLATE_COMPOSER_ID}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border-ui bg-surface p-5"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Plus className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-sm font-medium text-primary-content">
            Criar modelo
          </h3>
          <p className="text-xs text-muted-content">
            Veja o resultado no telemóvel enquanto escreve.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_200px]">
        <Input
          id={TEMPLATE_COMPOSER_TITLE_ID}
          label="Título do Modelo"
          placeholder="Ex: Promoção Luanda"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          autoFocus
          error={error}
        />

        <Select
          label="Categoria"
          options={selectableCategories}
          value={category}
          onChange={(v) => setCategory(String(v) as TemplateCategory)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="template-composer-content"
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
          ref={textareaRef}
          id="template-composer-content"
          rows={4}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
          placeholder="Ex: Sr(a) {{firstName}}, a sua encomenda {{codigo}} está a caminho..."
          className="w-full resize-none rounded-xl border border-border-ui bg-surface px-3 py-2 text-sm text-primary-content outline-none transition-colors placeholder:text-muted-content focus:border-primary focus:ring-1 focus:ring-primary dark:focus:ring-primary-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <VariablesDropdown
          onSelect={insertVariableToken}
          customKeys={TEMPLATE_CUSTOM_KEYS}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-border-ui pt-4">
        <span className="text-xs text-muted-content">
          {metrics.length} caracteres · {metrics.segments} SMS
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-border-ui bg-surface-raised px-4 py-2 text-sm text-secondary-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Plus size={16} />
            Guardar Modelo
          </button>
        </div>
      </div>
    </form>
  );
}
