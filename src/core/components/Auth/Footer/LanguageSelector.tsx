'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { LANGUAGES } from './languages';

export default function LanguageSelector() {
  const [language, setLanguage] = useState('Português');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Selecionar idioma"
        className="group flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-normal text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
      >
        <Globe className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
        <span>{language}</span>
        <ChevronDown
          className={`h-3 w-3 opacity-60 transition-transform duration-200 group-hover:opacity-100 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Opções de idioma"
          className="absolute bottom-full left-0 z-50 mb-1.5 min-w-[140px] rounded-xl border border-neutral-200 bg-white dark:border-slate-700 dark:bg-[#111c30] p-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang === language;
            return (
              <button
                key={lang}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                  isSelected
                    ? 'bg-primary-500/10 dark:bg-primary-500/20 font-medium text-primary-600 dark:text-primary-400'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <span>{lang}</span>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 text-primary-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
