import { create } from 'zustand';
import {
  CreateAccountStep,
  ICompanyAddress,
  ICompanyFormData,
  ICompanyFormErrors,
} from '../interfaces/create-account';

const initialFormData: ICompanyFormData = {
  companyName: '',
  taxId: '',
  sector: '',
  address: {
    streetAddress: '',
    neighborhood: '',
    city: '',
    country: 'Angola',
  },
  corporateEmail: '',
  phone: '',
  website: '',
  emailCode: '',
  phoneCode: '',
};

interface CreateAccountStore {
  currentStep: CreateAccountStep;
  direction: number;
  formData: ICompanyFormData;
  errors: ICompanyFormErrors;
  isLoading: boolean;

  setField: (field: keyof ICompanyFormData, value: string) => void;
  setAddressField: (field: keyof ICompanyAddress, value: string) => void;
  nextStep: (onComplete?: () => void) => void;
  prevStep: () => void;
  reset: () => void;
}

export const useCreateAccountStore = create<CreateAccountStore>((set, get) => ({
  currentStep: 1,
  direction: 1,
  formData: initialFormData,
  errors: {},
  isLoading: false,

  setField: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value },
      errors: state.errors[field]
        ? { ...state.errors, [field]: undefined }
        : state.errors,
    }));
  },

  setAddressField: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        address: {
          ...(state.formData.address || {
            streetAddress: '',
            neighborhood: '',
            city: '',
            country: '',
          }),
          [field]: value,
        },
      },
      errors: state.errors[field]
        ? { ...state.errors, [field]: undefined }
        : state.errors,
    }));
  },

  nextStep: (onComplete) => {
    const { currentStep, formData } = get();

    // Step 1: Identificação da Empresa
    if (currentStep === 1) {
      const newErrors: ICompanyFormErrors = {};
      if (!formData.companyName.trim())
        newErrors.companyName = 'Nome da empresa é obrigatório.';
      if (!formData.taxId.trim())
        newErrors.taxId = 'NIF / Identificação fiscal é obrigatório.';
      if (!formData.sector)
        newErrors.sector = 'Selecione o sector de actividade.';

      if (Object.keys(newErrors).length > 0) {
        set({ errors: newErrors });
        return;
      }

      set({ errors: {}, direction: 1, currentStep: 2 });
      return;
    }

    // Step 2: Endereço e Localização
    if (currentStep === 2) {
      const newErrors: ICompanyFormErrors = {};
      const addr = formData.address;

      if (!addr?.streetAddress?.trim()) {
        newErrors.streetAddress = 'Rua / Endereço é obrigatório.';
      }
      if (!addr?.neighborhood?.trim()) {
        newErrors.neighborhood = 'Bairro / Distrito é obrigatório.';
      }
      if (!addr?.city?.trim()) {
        newErrors.city = 'Cidade / Província é obrigatória.';
      }
      if (!addr?.country?.trim()) {
        newErrors.country = 'País é obrigatório.';
      }

      if (Object.keys(newErrors).length > 0) {
        set({ errors: newErrors });
        return;
      }

      set({ errors: {}, direction: 1, currentStep: 3 });
      return;
    }

    // Step 3: Contactos
    if (currentStep === 3) {
      const newErrors: ICompanyFormErrors = {};
      if (!formData.corporateEmail.trim()) {
        newErrors.corporateEmail = 'Email empresarial é obrigatório.';
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.corporateEmail.trim())
      ) {
        newErrors.corporateEmail = 'Introduza um email válido.';
      }
      if (!formData.phone.trim())
        newErrors.phone = 'Contacto telefónico é obrigatório.';

      if (Object.keys(newErrors).length > 0) {
        set({ errors: newErrors });
        return;
      }

      set({ isLoading: true });
      setTimeout(() => {
        set({ isLoading: false, errors: {}, direction: 1, currentStep: 4 });
      }, 500);
      return;
    }

    // Step 4: Confirmação de E-mail
    if (currentStep === 4) {
      const newErrors: ICompanyFormErrors = {};
      if (!formData.emailCode.trim()) {
        newErrors.emailCode =
          'Introduza o código de verificação recebido por e-mail.';
      } else if (formData.emailCode.trim().length < 6) {
        newErrors.emailCode = 'O código deve conter 6 dígitos.';
      }

      if (Object.keys(newErrors).length > 0) {
        set({ errors: newErrors });
        return;
      }

      set({ isLoading: true });
      setTimeout(() => {
        set({ isLoading: false, errors: {}, direction: 1, currentStep: 5 });
      }, 500);
      return;
    }

    // Step 5: Confirmação de Telefone
    if (currentStep === 5) {
      const newErrors: ICompanyFormErrors = {};
      if (!formData.phoneCode.trim()) {
        newErrors.phoneCode = 'Introduza o código SMS de confirmação.';
      } else if (formData.phoneCode.trim().length < 6) {
        newErrors.phoneCode = 'O código SMS deve conter 6 dígitos.';
      }

      if (Object.keys(newErrors).length > 0) {
        set({ errors: newErrors });
        return;
      }

      set({ isLoading: true });
      setTimeout(() => {
        set({ isLoading: false, errors: {} });
        if (onComplete) {
          onComplete();
        }
      }, 600);
      return;
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({
        direction: -1,
        currentStep: (currentStep - 1) as CreateAccountStep,
      });
    }
  },

  reset: () => {
    set({
      currentStep: 1,
      direction: 1,
      formData: initialFormData,
      errors: {},
      isLoading: false,
    });
  },
}));
