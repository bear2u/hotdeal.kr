import type { Metadata } from "next";
import { DayRow } from "@/components/DayRow";
import { groupByMonth } from "@/lib/archive";
import { getAllDates, getDaySummaries } from "@/lib/site-data";

export const metadata: Metadata = { title: "지난 핫딜 아카이브" };

export default async function ArchivePage() {
  const dates = await getAllDates();
  const summaries = new Map((await getDaySummaries(dates)).map((row) => [row.date, row.summary]));

  return (
    <>
      <h1 className="text-3xl font-black tracking-tighter">지난 핫딜 아카이브</h1>
      <p className="mt-1 text-sm text-muted">날짜를 누르면 그날의 TOP 10을 볼 수 있어요.</p>
      {groupByMonth(dates).map((group) => (
        <section key={group.label} className="mt-8">
          <h2 className="text-lg font-black">{group.label}</h2>
          <div className="mt-3 flex flex-col gap-2">
            {group.dates.map((date) => (
              <DayRow key={date} date={date} summary={summaries.get(date) ?? ""} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
