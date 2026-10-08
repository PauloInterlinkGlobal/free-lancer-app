'use client';

import { Check, ChevronLeft } from 'lucide-react';
import React from 'react';
import { ThemeId, ThemeOption } from '../types';

interface ThemeMenuProps {
  title: string;
  themeOptions: ThemeOption[];
  currentTheme?: string;
  onBack: () => void;
  onSelectTheme: (id: ThemeId) => void;
}

export function ThemeMenu({
  title,
  themeOptions,
  currentTheme,
  onBack,
  onSelectTheme,
}: ThemeMenuProps) {
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

      {themeOptions.map(({ id, label, icon: Icon }) => {
        const isSelected = currentTheme === id;
        return (
          <button
            key={id}
            onClick={() => onSelectTheme(id)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
              isSelected
                ? 'bg-surface-subtle text-content-primary font-semibold'
                : 'text-content-secondary hover:bg-surface-raised'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon size={16} />
              {label}
            </div>
            {isSelected && <Check className="w-4 h-4 text-primary" />}
          </button>
        );
      })}
    </>
  );
}
