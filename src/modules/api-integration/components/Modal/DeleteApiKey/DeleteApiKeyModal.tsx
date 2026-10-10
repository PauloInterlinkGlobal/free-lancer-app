'use client';

import { DeleteModal } from '@/core/components/Modal';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { IApiKey } from '@/modules/api-integration/interfaces/api-integration';
import { useApiKeysStore } from '@/modules/api-integration/store/useApiKeysStore';

interface DeleteApiKeyModalProps {
  apiKey?: IApiKey | null;
  onClose?: () => void;
}

export function DeleteApiKeyModal({ apiKey, onClose }: DeleteApiKeyModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();
  const deleteKey = useApiKeysStore((s) => s.deleteKey);

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleConfirmDelete = () => {
    if (!apiKey) return;

    // TODO: substituir pela chamada à API
    deleteKey(apiKey.id);
    success(`Chave API eliminada com sucesso!`);
    handleClose();
  };

  if (!apiKey) return null;

  return (
    <DeleteModal
      id="DELETE_API_KEY"
      title="Eliminar chave de API"
      itemType="chave de API"
      itemName={apiKey.name}
      warningMessage="A chave será removida definitivamente, incluindo o seu histórico."
      confirmText="Eliminar agora"
      onConfirm={handleConfirmDelete}
      onClose={handleClose}
    />
  );
}
