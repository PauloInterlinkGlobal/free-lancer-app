import { MONTHS_PT } from '../constants';
import { CalendarDay } from '../types';

export function parseDateStr(str?: string): Date | null {
  if (!str) return null;
  const [year, month, day] = str.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export function formatDateStr(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(
  date: Date | null,
  placeholder: string
): string {
  if (!date) return placeholder;
  const day = date.getDate();
  const month = MONTHS_PT[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
}

export function isDateDisabled(
  date: Date,
  minParsed: Date | null,
  maxParsed: Date | null
): boolean {
  const time = date.getTime();
  if (minParsed) {
    const min = new Date(
      minParsed.getFullYear(),
      minParsed.getMonth(),
      minParsed.getDate()
    ).getTime();
    if (time < min) return true;
  }
  if (maxParsed) {
    const max = new Date(
      maxParsed.getFullYear(),
      maxParsed.getMonth(),
      maxParsed.getDate()
    ).getTime();
    if (time > max) return true;
  }
  return false;
}

export function isDateSelected(date: Date, selectedDate: Date | null): boolean {
  if (!selectedDate) return false;
  return (
    date.getFullYear() === selectedDate.getFullYear() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getDate() === selectedDate.getDate()
  );
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function generateCalendarDays(
  year: number,
  month: number
): CalendarDay[] {
  const days: CalendarDay[] = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Get day of week for 1st of month: 0 (Sun) -> 6, 1 (Mon) -> 0
  let startDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startDayOfWeek === -1) startDayOfWeek = 6;

  // Previous month padding days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Next month padding days to complete 35 or 42 grid cells
  const remainingDays = 42 - days.length;
  for (
    let i = 1;
    i <= (remainingDays >= 7 ? remainingDays - 7 : remainingDays);
    i++
  ) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
}
