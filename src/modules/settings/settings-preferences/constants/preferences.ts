import { Laptop, Moon, Sun } from 'lucide-react';
import type { LanguageOption, ThemeOption } from '../interfaces';

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'light',
    label: 'Claro',
    description: 'Fundo branco com alto contraste visual',
    icon: Sun,
  },
  {
    id: 'dark',
    label: 'Escuro',
    description: 'Interface escura com tons neutros profundos',
    icon: Moon,
  },
  {
    id: 'system',
    label: 'Automático',
    description: 'Adapta-se às preferências do seu sistema',
    icon: Laptop,
  },
];

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'pt',
    label: 'Português (AO)',
    description: 'Idioma padrão da plataforma',
  },
  {
    code: 'en',
    label: 'English (US)',
    description: 'International language option',
  },
];
