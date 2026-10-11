import Link from "next/link";
import { formatShortMonthDay } from "@/lib/dates";
import { dailyPath } from "@/lib/site";

export function DayRow({ date, summary }: { date: string; summary: string }) {
  return (
    <Link
      href={dailyPath(date)}
      className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 transition hover:bg-white"
    >
      <span className="w-12 shrink-0 text-sm font-black tabular-nums text-hot-deep">{formatShortMonthDay(date)}</span>
      <span className="min-w-0 flex-1 truncate text-sm font-semibold">{summary}</span>
      <span aria-hidden className="text-muted">
        →
      </span>
    </Link>
  );
}
