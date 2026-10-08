'use client';

import { setPreferences } from '@/core/helpers/preferences';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { useTransition } from 'react';
import { LANGUAGE_OPTIONS } from '../constants/preferences';
import type { LocaleCode } from '../interfaces';

export function LanguageCard() {
  const currentLocale = useLocale();
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSelectLanguage = (newLocale: LocaleCode) => {
    if (newLocale === currentLocale) return;
    setPreferences(theme || 'system', newLocale);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
      <div className="flex items-start gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
            Idioma da Plataforma
          </h2>
          <p className="mt-1 text-sm text-muted-content">
            Escolha o idioma de exibição para a navegação e menus do sistema.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {LANGUAGE_OPTIONS.map((lang) => {
          const isSelected = currentLocale === lang.code;

          return (
            <button
              key={lang.code}
              type="button"
              disabled={isPending}
              onClick={() => handleSelectLanguage(lang.code)}
              className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-xs dark:bg-primary/10'
                  : 'border-border-ui bg-surface hover:border-primary/40 hover:bg-surface-raised'
              } ${isPending ? 'cursor-wait opacity-70' : ''}`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className="text-2xl"
                  role="img"
                  aria-label={lang.label}
                ></span>
                <div>
                  <h3 className="text-sm font-semibold text-primary-content">
                    {lang.label}
                  </h3>
                  <p className="text-xs text-muted-content">
                    {lang.description}
                  </p>
                </div>
              </div>

              {isSelected && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
