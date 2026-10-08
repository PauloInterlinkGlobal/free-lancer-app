'use client';

import { setPreferences } from '@/core/helpers/preferences';
import { Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { THEME_OPTIONS } from '../constants/preferences';
import type { ThemeMode } from '../interfaces';

export function AppearanceCard() {
  const { theme, setTheme } = useTheme();
  const currentLocale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setPreferences(newTheme, currentLocale);
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
      <div className="flex items-start gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
            Aparência e Tema
          </h2>
          <p className="mt-1 text-sm text-muted-content">
            Personalize o tema da interface para melhorar a sua visualização.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {THEME_OPTIONS.map((opt) => {
          const isSelected = mounted && theme === opt.id;
          const Icon = opt.icon;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectTheme(opt.id)}
              className={`flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                isSelected ? 'shadow-xs' : 'hover:bg-surface-raised'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    isSelected
                      ? 'text-muted-content'
                      : 'text-muted-content shadow-xs '
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {isSelected && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-primary-content">
                  {opt.label}
                </h3>
                <p className="mt-0.5 text-xs text-muted-content">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
