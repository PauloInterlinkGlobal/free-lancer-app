'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { useApiKeysStore } from '@/modules/api-integration/store/useApiKeysStore';
import { Copy, KeyRound, ShieldAlert, X } from 'lucide-react';
import { useState } from 'react';

const randomHex = (length: number) =>
  Array.from(crypto.getRandomValues(new Uint8Array(length)), (b) =>
    b.toString(16).padStart(2, '0')
  ).join('');

export function CreateApiKeyModal() {
  const { closeModal } = useModalStore();
  const { success, error: toastError } = useToastStore();
  const addKey = useApiKeysStore((s) => s.addKey);

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [secret, setSecret] = useState<string | null>(null);

  const handleClose = () => {
    setName('');
    setError('');
    setSecret(null);
    closeModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (trimmed.length < 3) {
      setError('O nome deve ter no mínimo 3 caracteres.');
      return;
    }

    // TODO: substituir pela chamada à API (o segredo vem do servidor)
    const key = `sk_live_${randomHex(16)}`;
    addKey({
      id: crypto.randomUUID(),
      name: trimmed,
      prefix: key.slice(0, 12),
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
      status: 'active',
    });
    setSecret(key);
    success('Chave de API criada com sucesso!');
  };

  const handleCopy = async () => {
    if (!secret) return;
    try {
      await navigator.clipboard.writeText(secret);
      success('Chave copiada');
    } catch {
      toastError('Não foi possível copiar a chave');
    }
  };

  return (
    <Modal id="CREATE_API_KEY" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border-ui bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-primary">
              <KeyRound className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-primary-content">
                Nova chave de API
              </h2>
              <p className="text-xs text-muted-content">
                Dê um nome para identificar onde a chave será usada.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content"
          >
            <X size={18} />
          </button>
        </div>

        {secret ? (
          <div className="flex flex-col gap-4 p-5">
            <div className="flex items-start gap-2 rounded-xl border border-amber-500/15 bg-amber-500/5 p-3 text-xs dark:text-amber-300">
              <ShieldAlert className="mt-px h-4 w-4 shrink-0" />
              <span>
                Copie a chave agora. Por segurança, ela não voltará a ser
                mostrada.
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border-ui bg-surface-raised p-3">
              <code className="min-w-0 flex-1 break-all font-mono text-xs text-primary-content">
                {secret}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copiar chave"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
              >
                <Copy size={16} />
              </button>
            </div>

            <div className="mt-2 flex justify-end border-t border-dashed border-border-ui pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
            <Input
              label="Nome da chave"
              placeholder="Ex: Loja online"
              maxLength={40}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              error={error}
              autoFocus
            />

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
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Criar chave
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
