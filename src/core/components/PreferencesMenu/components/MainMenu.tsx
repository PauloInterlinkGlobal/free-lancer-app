'use client';

import { ChevronRight, Globe, Moon, Sun } from 'lucide-react';
import React from 'react';
import { PreferencesView } from '../types';

interface MainMenuProps {
  title: string;
  languageLabel: string;
  appearanceLabel: string;
  mounted: boolean;
  isDark: boolean;
  onNavigate: (view: PreferencesView) => void;
}

export function MainMenu({
  title,
  languageLabel,
  appearanceLabel,
  mounted,
  isDark,
  onNavigate,
}: MainMenuProps) {
  return (
    <>
      <div className="px-3 py-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted">
          {title}
        </p>
      </div>

      <button
        onClick={() => onNavigate('language')}
        className="w-full flex items-center justify-between px-3 py-2 text-sm text-content-secondary hover:bg-surface-raised rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <Globe size={16} />
          {languageLabel}
        </div>
        <ChevronRight size={16} />
      </button>

      <button
        onClick={() => onNavigate('theme')}
        className="w-full flex items-center justify-between px-3 py-2 text-sm text-content-secondary hover:bg-surface-raised rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          {mounted && isDark ? <Moon size={16} /> : <Sun size={16} />}
          {appearanceLabel}
        </div>
        <ChevronRight size={16} />
      </button>
    </>
  );
}
