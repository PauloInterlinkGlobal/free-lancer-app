import { create } from 'zustand';
import type { ILink } from '../interfaces/links';

type State = {
  link: ILink | null;
};

type Action = {
  setLink: (link: ILink) => void;
  clear: () => void;
};

export const useLinkDeleteStore = create<State & Action>((set) => ({
  link: null,
  setLink: (link) => set({ link }),
  clear: () => set({ link: null }),
}));
