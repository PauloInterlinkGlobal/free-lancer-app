'use client';

import { RotateCcw } from 'lucide-react';
import React, { forwardRef } from 'react';
import { HOURS, TIME_PRESETS } from '../constants';
import { PopoverPlacement } from '../types';
import { TimeColumn } from './TimeColumn';

interface TimePickerPopoverProps {
  placement: PopoverPlacement;
  value?: string;
  selectedHour: string;
  selectedMinute: string;
  minutesList: string[];
  onHourSelect: (hour: string) => void;
  onMinuteSelect: (minute: string) => void;
  onSetCurrentTime: () => void;
  onPresetSelect: (timeStr: string) => void;
  onConfirm: () => void;
}

export const TimePickerPopover = forwardRef<
  HTMLDivElement,
  TimePickerPopoverProps
>(
  (
    {
      placement,
      value,
      selectedHour,
      selectedMinute,
      minutesList,
      onHourSelect,
      onMinuteSelect,
      onSetCurrentTime,
      onPresetSelect,
      onConfirm,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`absolute left-0 z-[100] w-full min-w-[270px] sm:min-w-[290px] rounded-2xl border border-neutral-200/90 bg-white/98 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.14)] backdrop-blur-md ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150 dark:border-neutral-800 dark:bg-[#161b26]/98 dark:shadow-[0_16px_36px_rgba(0,0,0,0.55)] dark:ring-white/10 ${
          placement === 'top'
            ? 'bottom-[calc(100%+6px)] origin-bottom'
            : 'top-[calc(100%+6px)] origin-top'
        }`}
      >
        {/* Header Display */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
              Hora Selecionada
            </span>
            <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {selectedHour}
              <span className="text-primary-500 animate-pulse mx-0.5">:</span>
              {selectedMinute}
            </span>
          </div>

          <button
            type="button"
            onClick={onSetCurrentTime}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-950/40 dark:hover:text-primary-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Hora Atual
          </button>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {TIME_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onPresetSelect(preset)}
              className={`py-1 px-2 rounded-lg text-xs font-medium text-center transition-all ${
                value === preset
                  ? 'bg-primary-500 text-white font-semibold shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Hours & Minutes Columns */}
        <div className="grid grid-cols-2 gap-2">
          <TimeColumn
            label="Horas (00 - 23)"
            items={HOURS}
            selectedItem={selectedHour}
            suffix="h"
            onSelect={onHourSelect}
          />
          <TimeColumn
            label="Minutos"
            items={minutesList}
            selectedItem={selectedMinute}
            suffix=""
            onSelect={onMinuteSelect}
          />
        </div>

        {/* Footer Confirm */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Confirmar ({selectedHour}:{selectedMinute})
          </button>
        </div>
      </div>
    );
  }
);

TimePickerPopover.displayName = 'TimePickerPopover';
