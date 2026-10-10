'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { Info, Link2, X } from 'lucide-react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { createLinkAction } from '../../../actions/links.actions';
import type { LinkFormState } from '../../../interfaces/links';

const DESCRIPTION_MAX = 120;

const initialState: LinkFormState = {
  ok: false,
  errors: {},
  values: { url: '', description: '' },
};

// O conteúdo do Modal só existe enquanto o modal está aberto. Por isso o estado
// do formulário (campos e erros) repõe-se sozinho ao fechar por qualquer via.
export function AddLinkModal() {
  return (
    <Modal id="ADD_LINK">
      <AddLinkForm />
    </Modal>
  );
}

function AddLinkForm() {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const [state, formAction, isPending] = useActionState(
    createLinkAction,
    initialState
  );

  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  // Garante um único toast e um único fecho por resposta de sucesso.
  const handledState = useRef<LinkFormState | null>(null);

  useEffect(() => {
    if (!state.ok || handledState.current === state) return;

    handledState.current = state;
    success('Link submetido para revisão');
    closeModal();
  }, [state, success, closeModal]);

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Link2 className="h-4 w-4" aria-hidden />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-primary-content">
              Submeter Novo Link
            </h2>
            <p className="text-xs text-muted-content">
              Cadastre um link para utilizar nas suas campanhas de SMS.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => closeModal()}
          aria-label="Fechar"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content"
        >
          <X size={18} />
        </button>
      </div>

      {/* Form: a validação final é feita no servidor (createLinkAction). */}
      <form action={formAction} className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          <Input
            id="link-url"
            name="url"
            label="URL do Link *"
            placeholder="Ex: https://meusite.ao ou meusite.ao/promo"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={state.errors.url}
            aria-invalid={Boolean(state.errors.url)}
            helperText="Pode omitir https:// — será adicionado automaticamente."
            autoFocus
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="link-description"
              className="text-sm font-medium text-primary-content"
            >
              Descrição *
            </label>
            <span
              className={`text-xs ${
                description.length > DESCRIPTION_MAX
                  ? 'font-medium text-rose-500'
                  : 'text-muted-content'
              }`}
            >
              {description.length}/{DESCRIPTION_MAX}
            </span>
          </div>
          <textarea
            id="link-description"
            name="description"
            rows={3}
            maxLength={DESCRIPTION_MAX}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-invalid={Boolean(state.errors.description)}
            disabled={isPending}
            placeholder="Ex: Página promocional da campanha de Verão com 20% de desconto."
            className={`w-full resize-none rounded-xl border px-3 py-2 text-sm text-primary-content placeholder:text-muted-content outline-none transition-colors disabled:opacity-60 ${
              state.errors.description
                ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                : 'border-border-ui bg-surface focus:border-primary focus:ring-1 focus:ring-primary dark:focus:ring-primary-400'
            }`}
          />
          {state.errors.description && (
            <span className="text-xs text-rose-500">
              {state.errors.description}
            </span>
          )}
          <span className="text-[11px] text-muted-content">
            Breve identificação da finalidade do link (mínimo 3 caracteres).
          </span>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-amber-500/15 bg-amber-500/5 p-3 text-xs text-amber-700 dark:text-amber-300">
          <Info className="mt-px h-4 w-4 shrink-0 text-amber-500" />
          <span>
            O link será submetido com estado <strong>Pendente</strong> e
            passará por análise de segurança das operadoras antes de ser
            aprovado.
          </span>
        </div>

        <div className="mt-2 flex items-center justify-end gap-2 border-t border-dashed border-border-ui pt-4">
          <button
            type="button"
            onClick={() => closeModal()}
            disabled={isPending}
            className="rounded-lg border border-border-ui bg-surface-raised px-4 py-2 text-sm text-secondary-content transition-colors hover:bg-item-hover hover:text-primary-content disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
          >
            {isPending ? 'A submeter...' : 'Submeter Link'}
          </button>
        </div>
      </form>
    </div>
  );
}
