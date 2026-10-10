'use client';

import { LayoutGrid, List } from 'lucide-react';

export type ViewMode = 'list' | 'grid';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const options = [
  { mode: 'list', label: 'Ver em lista', icon: List },
  { mode: 'grid', label: 'Ver em grelha', icon: LayoutGrid },
] as const;

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div
      role="group"
      aria-label="Modo de visualização"
      className="inline-flex items-center gap-0.5 rounded-lg border border-ui bg-surface p-0.5"
    >
      {options.map(({ mode, label, icon: Icon }) => (
        <button
          key={mode}
          type="button"
          title={label}
          aria-label={label}
          aria-pressed={value === mode}
          onClick={() => onChange(mode)}
          className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
            value === mode
              ? 'bg-primary text-white'
              : 'text-muted-content hover:bg-item-hover hover:text-primary-content'
          }`}
        >
          <Icon size={15} aria-hidden />
        </button>
      ))}
    </div>
  );
}
