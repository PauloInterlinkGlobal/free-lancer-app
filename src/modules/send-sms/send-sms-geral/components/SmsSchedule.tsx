'use client';

import { DatePicker } from '@/core/components/DatePicker';
import { TimePicker } from '@/core/components/TimePicker';
import { Calendar, CalendarClock, Clock, Send } from 'lucide-react';
import { useEffect, useMemo } from 'react';

interface SmsScheduleProps {
  scheduled: boolean;
  onScheduledChange: (value: boolean) => void;
  date: string;
  onDateChange: (value: string) => void;
  time: string;
  onTimeChange: (value: string) => void;
}

function formatDateStr(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function SmsSchedule({
  scheduled,
  onScheduledChange,
  date,
  onDateChange,
  time,
  onTimeChange,
}: SmsScheduleProps) {
  const todayStr = useMemo(() => formatDateStr(new Date()), []);

  useEffect(() => {
    if (scheduled) {
      if (!date) {
        onDateChange(todayStr);
      }
      if (!time) {
        const now = new Date();
        const nextHour = (now.getHours() + 1) % 24;
        const defaultTime = `${String(nextHour).padStart(2, '0')}:00`;
        onTimeChange(defaultTime);
      }
    }
  }, [scheduled, date, time, todayStr, onDateChange, onTimeChange]);

  const setQuickPreset = (daysFromNow: number, presetTime: string) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysFromNow);
    onDateChange(formatDateStr(targetDate));
    onTimeChange(presetTime);
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-text-primary">
        Quando enviar
      </span>

      <div className="grid grid-cols-2 gap-2 rounded-xl border border-border-ui bg-surface p-1">
        <button
          type="button"
          onClick={() => onScheduledChange(false)}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-all ${
            !scheduled
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-muted hover:bg-neutral-100 hover:text-text-primary dark:hover:bg-neutral-800'
          }`}
        >
          <Send size={15} />
          Enviar agora
        </button>

        <button
          type="button"
          onClick={() => onScheduledChange(true)}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-all ${
            scheduled
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-muted hover:bg-neutral-100 hover:text-text-primary dark:hover:bg-neutral-800'
          }`}
        >
          <CalendarClock size={15} />
          Agendar envio
        </button>
      </div>

      {scheduled && (
        <div className="flex flex-col gap-4 rounded-xl border border-border-ui bg-surface-raised p-4 sm:p-5 transition-all">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted">
              Atalhos rápidos:
            </span>
            <button
              type="button"
              onClick={() => setQuickPreset(0, '14:00')}
              className="rounded-lg border border-border-ui bg-surface px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Hoje às 14:00
            </button>
            <button
              type="button"
              onClick={() => setQuickPreset(0, '18:00')}
              className="rounded-lg border border-border-ui bg-surface px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Hoje às 18:00
            </button>
            <button
              type="button"
              onClick={() => setQuickPreset(1, '09:00')}
              className="rounded-lg border border-border-ui bg-surface px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Amanhã às 09:00
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DatePicker
              label="Data de Envio"
              placeholder="Selecione a data no calendário"
              leftIcon={Calendar}
              minDate={todayStr}
              value={date}
              onChange={onDateChange}
            />

            <TimePicker
              label="Hora de Envio"
              placeholder="Selecione a hora"
              leftIcon={Clock}
              value={time}
              onChange={onTimeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SmsSchedule;
