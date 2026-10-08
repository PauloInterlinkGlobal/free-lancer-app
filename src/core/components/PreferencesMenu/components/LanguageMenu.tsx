'use client';

import { Check, ChevronLeft } from 'lucide-react';
import React from 'react';
import { LanguageOption, LocaleCode } from '../types';

interface LanguageMenuProps {
  title: string;
  languages: LanguageOption[];
  currentLocale: string;
  isPending: boolean;
  onBack: () => void;
  onSelectLanguage: (code: LocaleCode) => void;
}

export function LanguageMenu({
  title,
  languages,
  currentLocale,
  isPending,
  onBack,
  onSelectLanguage,
}: LanguageMenuProps) {
  return (
    <>
      <button
        onClick={onBack}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-content-secondary hover:bg-surface-raised rounded-lg transition-colors"
      >
        <ChevronLeft size={16} />
        {title}
      </button>

      <div className="h-px border-t border-border-ui my-1" />

      {languages.map((lang) => {
        const isSelected = currentLocale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            disabled={isPending}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
              isSelected
                ? 'bg-surface-subtle text-content-primary font-semibold'
                : 'text-content-secondary hover:bg-surface-raised'
            }`}
          >
            <span>{lang.label}</span>
            {isSelected && <Check className="w-4 h-4 text-primary" />}
          </button>
        );
      })}
    </>
  );
}
