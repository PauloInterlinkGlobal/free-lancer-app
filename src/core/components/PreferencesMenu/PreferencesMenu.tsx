'use client';

import { usePathname, useRouter } from '@/core/i18n/navigation';
import { Globe, Monitor, Moon, Sun } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { LanguageMenu } from './components/LanguageMenu';
import { MainMenu } from './components/MainMenu';
import { ThemeMenu } from './components/ThemeMenu';
import {
  LanguageOption,
  LocaleCode,
  PreferencesView,
  ThemeId,
  ThemeOption,
} from './types';

export function PreferencesMenu() {
  const t = useTranslations('nav.preferences');
  const tLang = useTranslations('nav.languages');
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<PreferencesView>('menu');
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setView('menu');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setView('menu');
  }, []);

  function switchLocale(code: LocaleCode) {
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
    close();
  }

  const handleSelectTheme = (id: ThemeId) => {
    setTheme(id);
    close();
  };

  const isDark = resolvedTheme === 'dark';

  const themeOptions: ThemeOption[] = [
    { id: 'system', label: t('system'), icon: Monitor },
    { id: 'light', label: t('light'), icon: Sun },
    { id: 'dark', label: t('dark'), icon: Moon },
  ];

  const languages: LanguageOption[] = [
    { code: 'pt', label: tLang('pt') },
    { code: 'en', label: tLang('en') },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Preferências"
        className="flex items-center justify-center w-9 h-9 rounded-lg
          text-content-secondary hover:bg-surface-raised hover:text-content-primary
          border border-border-ui transition-colors"
      >
        <Globe size={18} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-52 rounded-xl border border-border-ui
          bg-surface shadow-md z-50 overflow-hidden"
        >
          <div className="p-1.5 space-y-0.5">
            {view === 'menu' && (
              <MainMenu
                title={t('title')}
                languageLabel={t('language')}
                appearanceLabel={t('appearance')}
                mounted={mounted}
                isDark={isDark}
                onNavigate={setView}
              />
            )}

            {view === 'language' && (
              <LanguageMenu
                title={t('language')}
                languages={languages}
                currentLocale={locale}
                isPending={isPending}
                onBack={() => setView('menu')}
                onSelectLanguage={switchLocale}
              />
            )}

            {view === 'theme' && (
              <ThemeMenu
                title={t('appearance')}
                themeOptions={themeOptions}
                currentTheme={theme}
                onBack={() => setView('menu')}
                onSelectTheme={handleSelectTheme}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PreferencesMenu;
