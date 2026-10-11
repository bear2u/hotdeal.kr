import { formatShortMonthDay } from "./dates";
import { prepareDailyList, type DealItem } from "./deals";
import { formatWon } from "./price";

export type HomeDate = {
  date: string;
  /** 오늘 글이 없어 최근 날짜를 보여줄 때의 안내 문구 */
  fallbackLabel: string | null;
};

export function pickHomeDate(dates: string[], today: string): HomeDate {
  if (dates.includes(today)) return { date: today, fallbackLabel: null };
  const latest = newestFirst(dates)[0];
  const shortDate = formatShortMonthDay(latest);
  const label = latest === previousDay(today) ? `어제(${shortDate}) 기준` : `${shortDate} 기준`;
  return { date: latest, fallbackLabel: label };
}

function previousDay(date: string): string {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  return new Date(Date.parse(`${date}T00:00:00Z`) - ONE_DAY_MS).toISOString().slice(0, 10);
}

export const RECENT_DAYS_LIMIT = 14;

export function recentDays(dates: string[], homeDate: string): string[] {
  return newestFirst(dates)
    .filter((date) => date !== homeDate)
    .slice(0, RECENT_DAYS_LIMIT);
}

export function summarizeDay(items: DealItem[]): string {
  const [top] = prepareDailyList(items);
  return `${top.name} · ${formatWon(top.price)}~`;
}

export type MonthGroup = { label: string; dates: string[] };

export function groupByMonth(dates: string[]): MonthGroup[] {
  const groups = new Map<string, string[]>();
  for (const date of newestFirst(dates)) {
    const [year, month] = date.split("-").map(Number);
    const label = `${year}년 ${month}월`;
    groups.set(label, [...(groups.get(label) ?? []), date]);
  }
  return [...groups].map(([label, monthDates]) => ({ label, dates: monthDates }));
}

export function adjacentDates(dates: string[], date: string): { prev: string | null; next: string | null } {
  const oldestFirst = dates.toSorted();
  const index = oldestFirst.indexOf(date);
  return {
    prev: oldestFirst[index - 1] ?? null,
    next: oldestFirst[index + 1] ?? null,
  };
}

function newestFirst(dates: string[]): string[] {
  return dates.toSorted().toReversed();
}
