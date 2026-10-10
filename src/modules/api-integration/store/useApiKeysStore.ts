import { IApiKey } from '@/modules/api-integration/interfaces/api-integration';
import { apiKeysMock } from '@/modules/api-integration/mocks/api-integration.mock';
import { create } from 'zustand';

type State = {
  keys: IApiKey[];
};

type Action = {
  addKey: (key: IApiKey) => void;
  revokeKey: (id: string) => void;
  deleteKey: (id: string) => void;
};

// TODO: substituir o estado inicial pela resposta da API
export const useApiKeysStore = create<State & Action>((set) => ({
  keys: apiKeysMock,

  addKey: (key) => set((s) => ({ keys: [key, ...s.keys] })),
  revokeKey: (id) =>
    set((s) => ({
      keys: s.keys.map((k) => (k.id === id ? { ...k, status: 'revoked' } : k)),
    })),
  deleteKey: (id) => set((s) => ({ keys: s.keys.filter((k) => k.id !== id) })),
}));
