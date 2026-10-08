'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { Info, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';

interface AddSenderModalProps {
  onClose?: () => void;
}

export function AddSenderModal({ onClose }: AddSenderModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const [senderName, setSenderName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setSenderName('');
    setDescription('');
    setError('');
    closeModal();
    onClose?.();
  };

  const handleNameChange = (val: string) => {
    const clean = val.toUpperCase().replace(/[^A-Z0-9_\-]/g, '');
    setSenderName(clean);
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = senderName.trim();
    if (!trimmed) {
      setError('O nome do sender é obrigatório.');
      return;
    }

    if (trimmed.length < 3) {
      setError('O sender deve ter no mínimo 3 caracteres.');
      return;
    }

    if (trimmed.length > 11) {
      setError('O sender não pode ter mais de 11 caracteres (padrão GSM).');
      return;
    }

    success('Pedido de registo de sender submetido para validação!');
    handleClose();
  };

  return (
    <Modal id="ADD_SENDER" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border-ui bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-primary">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-primary-content">
                Solicitar Novo sender
              </h2>
              <p className="text-xs text-muted-content">
                Cadastre um Sender ID para envio de SMS com a sua marca.
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <Input
              label="Nome do Sender"
              placeholder="Ex: Unitel"
              maxLength={11}
              value={senderName}
              onChange={(e) => handleNameChange(e.target.value)}
              error={error}
              helperText={`${senderName.length}/11 caracteres (mínimo 3, sem caracteres especiais)`}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary-content">
              Descrição do Uso
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Utilizado para envio de códigos de verificação 2FA e notificações de compras da loja online."
              className="w-full resize-none rounded-xl border border-primary px-3 py-2 text-sm text-primary-content placeholder:text-muted-content outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary dark:focus:ring-primary-400"
            />
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-amber-500/15 bg-amber-500/5 p-3 text-xs dark:text-amber-300">
            <Info className="mt-px h-4 w-4 shrink-0" />
            <span>
              O remetente passará por validação com as operadoras locais antes
              de ser ativado.
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
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Submeter para Validação
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
