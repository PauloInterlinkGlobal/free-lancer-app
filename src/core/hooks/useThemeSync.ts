// src/core/hooks/useThemeSync.ts
'use client';

import { setPreferences } from '@/core/helpers/preferences';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function useThemeSync() {
  const { theme, setTheme } = useTheme();
  const initialized = useRef(false);

  // 1) Arranque: cookie -> next-themes (só se o cookie existir e for válido)
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const fromCookie = readCookie('preferred_theme');
    if (
      fromCookie === 'light' ||
      fromCookie === 'dark' ||
      fromCookie === 'system'
    ) {
      setTheme(fromCookie);
    }
  }, [setTheme]);

  useEffect(() => {
    if (!initialized.current || !theme) return;

    const locale = readCookie('preferred_locale') ?? 'pt';
    setPreferences(theme, locale);
  }, [theme]);
}
