import { create } from 'zustand';
import { ITemplate } from '../interfaces/templates';

interface TemplatePreviewState {
  selectedTemplateId: string | null;
  selectedTemplate: ITemplate | null;
  previewSender: string;
  previewType: 'normal' | 'flash';
  previewTheme: 'light' | 'dark';
  fillVariables: boolean;
  sampleVariables: Record<string, string>;

  // Actions
  setSelectedTemplate: (template: ITemplate | null) => void;
  setPreviewSender: (sender: string) => void;
  setPreviewType: (type: 'normal' | 'flash') => void;
  setPreviewTheme: (theme: 'light' | 'dark') => void;
  toggleFillVariables: () => void;
  setSampleVariable: (key: string, value: string) => void;
}

const DEFAULT_SAMPLE_VARIABLES: Record<string, string> = {
  firstName: 'Carlos',
  lastName: 'Silva',
  nome: 'Ana Santos',
  cliente: 'Manuel Costa',
  cidade: 'Luanda',
  ano: '2026',
  codigo: 'EXP-8492',
  data: 'Amanhã às 14:00',
  fatura: 'FT-2026/89',
  valor: '45.000',
  vencimento: '10/10/2026',
  codigoOTP: '849-201',
};

export const useTemplatePreviewStore = create<TemplatePreviewState>((set) => ({
  selectedTemplateId: null,
  selectedTemplate: null,
  previewSender: 'SMSillico',
  previewType: 'normal',
  previewTheme: 'light',
  fillVariables: true,
  sampleVariables: DEFAULT_SAMPLE_VARIABLES,

  setSelectedTemplate: (template) =>
    set({
      selectedTemplate: template,
      selectedTemplateId: template ? template.id : null,
    }),

  setPreviewSender: (previewSender) => set({ previewSender }),

  setPreviewType: (previewType) => set({ previewType }),

  setPreviewTheme: (previewTheme) => set({ previewTheme }),

  toggleFillVariables: () =>
    set((state) => ({ fillVariables: !state.fillVariables })),

  setSampleVariable: (key, value) =>
    set((state) => ({
      sampleVariables: { ...state.sampleVariables, [key]: value },
    })),
}));
