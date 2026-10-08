'use client';

import React from 'react';

interface TimeColumnProps {
  label: string;
  items: string[];
  selectedItem: string;
  suffix?: string;
  onSelect: (item: string) => void;
}

export function TimeColumn({
  label,
  items,
  selectedItem,
  suffix = '',
  onSelect,
}: TimeColumnProps) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 mb-1 px-1 text-center">
        {label}
      </span>
      <div className="h-44 overflow-y-auto space-y-1 rounded-xl bg-neutral-50 p-1 border border-neutral-100 dark:bg-neutral-900/60 dark:border-neutral-800 overscroll-contain">
        {items.map((item) => {
          const isSelected = selectedItem === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`w-full py-1.5 rounded-lg text-xs font-medium text-center transition-all ${
                isSelected
                  ? 'bg-primary-500 text-white font-bold shadow-sm shadow-primary-500/40'
                  : 'text-neutral-700 hover:bg-neutral-200/60 dark:text-neutral-300 dark:hover:bg-neutral-800'
              }`}
            >
              {suffix ? `${item}${suffix}` : item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
