import dayjs, { Dayjs } from 'dayjs';

dayjs.locale('es');

export function formattedDateForInput(date: Dayjs): string {
  return date.format('YYYY-MM-DD');
}

export function subtractYears(years: number, date: Date = new Date()): Dayjs {
  return dayjs(date).subtract(years, 'years');
}

export function calculateYears(date: Date | Dayjs | string): number {
  return dayjs().diff(date, 'years');
}

export function calculateMonths(date: Date | Dayjs | string): number {
  return dayjs().diff(date, 'months');
}
