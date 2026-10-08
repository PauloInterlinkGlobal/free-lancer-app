'use client';

import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import React, { forwardRef } from 'react';
import { MONTHS_PT, WEEKDAYS_PT } from '../constants';
import { CalendarDay, PopoverPlacement } from '../types';
import { isDateDisabled, isDateSelected, isToday } from '../utils/date.utils';

interface DatePickerCalendarProps {
  placement: PopoverPlacement;
  currentYear: number;
  currentMonth: number;
  calendarDays: CalendarDay[];
  selectedDate: Date | null;
  minParsed: Date | null;
  maxParsed: Date | null;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date) => void;
}

export const DatePickerCalendar = forwardRef<
  HTMLDivElement,
  DatePickerCalendarProps
>(
  (
    {
      placement,
      currentYear,
      currentMonth,
      calendarDays,
      selectedDate,
      minParsed,
      maxParsed,
      onPrevMonth,
      onNextMonth,
      onSelectDate,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`absolute left-0 z-[100] w-full min-w-[290px] sm:min-w-[320px] rounded-2xl border border-neutral-200/90 bg-white/98 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.14)] backdrop-blur-md ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150 dark:border-neutral-800 dark:bg-[#161b26]/98 dark:shadow-[0_16px_36px_rgba(0,0,0,0.55)] dark:ring-white/10 ${
          placement === 'top'
            ? 'bottom-[calc(100%+6px)] origin-bottom'
            : 'top-[calc(100%+6px)] origin-top'
        }`}
      >
        {/* Header Month/Year & Nav */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
            {MONTHS_PT[currentMonth]} {currentYear}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onPrevMonth}
              className="p-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 transition-colors"
              title="Mês anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNextMonth}
              className="p-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 transition-colors"
              title="Próximo mês"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {WEEKDAYS_PT.map((day) => (
            <span
              key={day}
              className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 py-1"
            >
              {day}
            </span>
          ))}
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(({ date, isCurrentMonth }, idx) => {
            const selected = isDateSelected(date, selectedDate);
            const disabled = isDateDisabled(date, minParsed, maxParsed);
            const today = isToday(date);

            return (
              <button
                key={idx}
                type="button"
                disabled={disabled}
                onClick={() => onSelectDate(date)}
                className={`relative h-8 w-full rounded-lg text-xs font-medium transition-all flex items-center justify-center ${
                  disabled
                    ? 'opacity-25 cursor-not-allowed text-neutral-400 dark:text-neutral-600'
                    : selected
                      ? 'bg-primary-500 text-white font-bold shadow-sm shadow-primary-500/40'
                      : today
                        ? 'border border-primary-500 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-50 dark:hover:bg-primary-950/40'
                        : isCurrentMonth
                          ? 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
                          : 'text-neutral-400 dark:text-neutral-600 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40'
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {/* Footer Quick Actions */}
        <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => onSelectDate(new Date())}
            className="inline-flex items-center gap-1 font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Hoje
          </button>
          <button
            type="button"
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              onSelectDate(tomorrow);
            }}
            className="font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
          >
            Amanhã
          </button>
        </div>
      </div>
    );
  }
);

DatePickerCalendar.displayName = 'DatePickerCalendar';
