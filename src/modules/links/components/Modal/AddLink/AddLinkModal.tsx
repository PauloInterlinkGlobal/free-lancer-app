'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { Info, Link2, X } from 'lucide-react';
import { useState } from 'react';
import {
  isValidUrl,
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  normalizeUrl,
} from '../../../utils/link-validation';

const DEFAULT_URL_PREFIX = 'https://';

interface AddLinkModalProps {
  existingUrls: string[];
  onCreate: (values: { url: string; description: string }) => void;
  onClose?: () => void;
}

export function AddLinkModal({
  existingUrls,
  onCreate,
  onClose,
}: AddLinkModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const [url, setUrl] = useState(DEFAULT_URL_PREFIX);
  const [description, setDescription] = useState('');
  const [urlError, setUrlError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const resetForm = () => {
    setUrl(DEFAULT_URL_PREFIX);
    setDescription('');
    setUrlError('');
    setDescriptionError('');
  };

  const handleClose = () => {
    resetForm();
    closeModal();
    onClose?.();
  };

  const handleUrlChange = (val: string) => {
    setUrl(val);
    if (urlError) setUrlError('');
  };

  const handleDescriptionChange = (val: string) => {
    setDescription(val);
    if (descriptionError) setDescriptionError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    const rawUrl = url.trim();
    if (!rawUrl || rawUrl === 'https://' || rawUrl === 'http://') {
      setUrlError('O URL é obrigatório.');
      hasError = true;
    } else {
      const normalized = normalizeUrl(rawUrl);
      if (!isValidUrl(normalized)) {
        setUrlError('Insira um URL válido com protocolo http ou https.');
        hasError = true;
      } else {
        const isDuplicate = existingUrls.some(
          (existing) =>
            normalizeUrl(existing).toLowerCase() === normalized.toLowerCase()
        );
        if (isDuplicate) {
          setUrlError('Este URL já se encontra registado.');
          hasError = true;
        }
      }
    }

    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      setDescriptionError('A descrição é obrigatória.');
      hasError = true;
    } else if (trimmedDescription.length < MIN_DESCRIPTION_LENGTH) {
      setDescriptionError(
        `A descrição deve ter no mínimo ${MIN_DESCRIPTION_LENGTH} caracteres.`
      );
      hasError = true;
    } else if (trimmedDescription.length > MAX_DESCRIPTION_LENGTH) {
      setDescriptionError(
        `A descrição não pode ter mais de ${MAX_DESCRIPTION_LENGTH} caracteres.`
      );
      hasError = true;
    }

    if (hasError) return;

    const normalizedUrl = normalizeUrl(rawUrl);

    // TODO(api): substituir pela chamada ao serviço de criação de links.
    onCreate({ url: normalizedUrl, description: trimmedDescription });
    success('Link submetido para revisão');
    handleClose();
  };

  return (
    <Modal id="ADD_LINK" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border-ui bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-primary">
              <Link2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-primary-content">
                Adicionar Link
              </h2>
              <p className="text-xs text-muted-content">
                Submeta um URL para revisão e utilização nas mensagens.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="rounded-lg p-1.5 text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-5 py-4"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <Input
              id="link-url"
              name="url"
              label="URL"
              placeholder="https://exemplo.ao/campanha"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              error={urlError}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="link-description"
                className="text-sm font-medium text-neutral-900 dark:text-neutral-200"
              >
                Descrição
              </label>
              <span
                className={`text-[11px] tabular-nums ${
                  description.length > MAX_DESCRIPTION_LENGTH
                    ? 'text-rose-500'
                    : 'text-muted-content'
                }`}
              >
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
            <textarea
              id="link-description"
              name="description"
              rows={3}
              maxLength={MAX_DESCRIPTION_LENGTH}
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Ex: Página promocional da campanha de Verão com 20% de desconto."
              className={`w-full resize-none rounded-xl border px-3 py-2 text-sm text-primary-content placeholder:text-muted-content outline-none transition-colors ${
                descriptionError
                  ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-border-ui bg-surface focus:border-primary focus:ring-1 focus:ring-primary dark:focus:ring-primary-400'
              }`}
            />
            {descriptionError && (
              <span className="text-xs text-rose-500">{descriptionError}</span>
            )}
            <span className="text-[11px] text-muted-content">
              Breve identificação da finalidade do link (mínimo{' '}
              {MIN_DESCRIPTION_LENGTH} caracteres).
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
              onClick={handleClose}
              className="rounded-lg border border-border-ui bg-surface-raised px-4 py-2 text-sm text-secondary-content transition-colors hover:bg-item-hover hover:text-primary-content"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              Submeter Link
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
