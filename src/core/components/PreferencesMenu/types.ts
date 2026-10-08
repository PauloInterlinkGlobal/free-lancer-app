import { LucideIcon } from 'lucide-react';

export type PreferencesView = 'menu' | 'language' | 'theme';
export type LocaleCode = 'pt' | 'en';
export type ThemeId = 'system' | 'light' | 'dark';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  icon: LucideIcon;
}

export interface LanguageOption {
  code: LocaleCode;
  label: string;
}
