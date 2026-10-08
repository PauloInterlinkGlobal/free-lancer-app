import { SelectOption } from '@/core/components/Select';

export const SECTORS: SelectOption[] = [
  { value: 'tecnologia', label: 'Tecnologia & Software' },
  { value: 'financeiro', label: 'Banca & Serviços Financeiros' },
  { value: 'saude', label: 'Saúde & Farmacêutica' },
  { value: 'comercio', label: 'Comércio & E-commerce' },
  { value: 'educacao', label: 'Educação & Formação' },
  { value: 'logistica', label: 'Logística & Transportes' },
  { value: 'outro', label: 'Outro' },
];

export const COMPANY_SIZES: SelectOption[] = [
  { value: '1-10', label: '1 - 10 colaboradores' },
  { value: '11-50', label: '11 - 50 colaboradores' },
  { value: '51-200', label: '51 - 200 colaboradores' },
  { value: '201+', label: 'Mais de 200 colaboradores' },
];

export const ANGOLA_PROVINCES: SelectOption[] = [
  { value: 'Bengo', label: 'Bengo' },
  { value: 'Benguela', label: 'Benguela' },
  { value: 'Bié', label: 'Bié' },
  { value: 'Cabinda', label: 'Cabinda' },
  { value: 'Cuando', label: 'Cuando' },
  { value: 'Cuanza Norte', label: 'Cuanza Norte' },
  { value: 'Cuanza Sul', label: 'Cuanza Sul' },
  { value: 'Cubango', label: 'Cubango' },
  { value: 'Cunene', label: 'Cunene' },
  { value: 'Huambo', label: 'Huambo' },
  { value: 'Huíla', label: 'Huíla' },
  { value: 'Icolo e Bengo', label: 'Icolo e Bengo' },
  { value: 'Luanda', label: 'Luanda' },
  { value: 'Lunda Norte', label: 'Lunda Norte' },
  { value: 'Lunda Sul', label: 'Lunda Sul' },
  { value: 'Malanje', label: 'Malanje' },
  { value: 'Moxico', label: 'Moxico' },
  { value: 'Moxico Leste', label: 'Moxico Leste' },
  { value: 'Namibe', label: 'Namibe' },
  { value: 'Uíge', label: 'Uíge' },
  { value: 'Zaire', label: 'Zaire' },
];
