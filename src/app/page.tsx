import Link from "next/link";
import { DayRow } from "@/components/DayRow";
import { DealList } from "@/components/DealList";
import { pickHomeDate, recentDays } from "@/lib/archive";
import { formatKoreanMonthDay } from "@/lib/dates";
import { buildToday } from "@/lib/site";
import { getAllDates, getDaily, getDaySummaries } from "@/lib/site-data";

export default async function Home() {
  const dates = await getAllDates();
  const home = pickHomeDate(dates, buildToday());
  const daily = await getDaily(home.date);
  const recent = await getDaySummaries(recentDays(dates, home.date));

  return (
    <>
      <section>
        <p className="text-sm font-bold text-hot-deep">
          {home.fallbackLabel ?? "오늘의 핫딜"} · 배송비 포함 · 광고 제외
        </p>
        <h1 className="mt-1 text-4xl font-black leading-tight tracking-tighter sm:text-5xl">
          {formatKoreanMonthDay(home.date)} 핫딜
          <br />
          <span className="text-hot">저렴이 TOP 10</span>
        </h1>
        <div className="mt-6">
          <DealList items={daily.items} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-black tracking-tight">지난 핫딜</h2>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-muted">아직 지난 핫딜이 없어요. 내일부터 하루씩 쌓여요.</p>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            {recent.map((row) => (
              <DayRow key={row.date} {...row} />
            ))}
          </div>
        )}
        <Link href="/archive/" className="mt-4 inline-block text-sm font-bold text-hot-deep underline underline-offset-4">
          전체 아카이브 보기 →
        </Link>
      </section>
    </>
  );
}
