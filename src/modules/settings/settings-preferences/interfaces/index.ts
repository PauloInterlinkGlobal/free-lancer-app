import type { LucideIcon } from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type LocaleCode = 'pt' | 'en';

export interface ThemeOption {
  id: ThemeMode;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface LanguageOption {
  code: LocaleCode;
  label: string;
  description: string;
}
