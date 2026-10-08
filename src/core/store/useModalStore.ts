import { create } from 'zustand';

export type ModalType =
  | 'ADD_CONTACT'
  | 'EDIT_CONTACT'
  | 'ADD_SENDER'
  | 'ADD_MEMBER'
  | 'ADD_BLACKLIST'
  | 'DETAIL_SENDER'
  | 'DELETEALL_CONTACT'
  | 'SELECT_CONTACT_SMS'
  | 'DELETE_SENDER'
  | 'ADD_TEMPLATE'
  | 'CREATE_GROUP'
  | 'UPDATE_GROUP'
  | 'DETAIL_DRAFT_SMS'
  | 'DELETE_DRAFT_SMS'
  | 'DETAIL_SCHEDULED_SMS'
  | 'DELETE_SCHEDULED_SMS'
  | 'GENERATE_DASHBOARD_REPORT'
  | 'GENERATE_REPORT'
  | null;

type State = {
  activeModal: ModalType;
};

type Action = {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};

export const useModalStore = create<State & Action>((set) => ({
  activeModal: null,

  openModal: (type) => set({ activeModal: type }),
  closeModal: () => set({ activeModal: null }),
}));
