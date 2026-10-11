import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { DealList } from "@/components/DealList";
import { adjacentDates } from "@/lib/archive";
import { formatKoreanMonthDay, formatShortMonthDay } from "@/lib/dates";
import { buildToday, dailyPath, pageUrl, SITE } from "@/lib/site";
import { getAllDates, getDaily } from "@/lib/site-data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const dates = await getAllDates();
  return dates.map((date) => ({ date }));
}

function dailyTitle(date: string): string {
  return `${formatKoreanMonthDay(date)} 핫딜 저렴이 TOP 10`;
}

export async function generateMetadata(
  props: PageProps<"/d/[date]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { date } = await props.params;
  // openGraph 는 통째로 덮어써지므로 상위(루트 opengraph-image)의 이미지를 이어받는다.
  const parentImages = (await parent).openGraph?.images ?? [];
  return {
    title: dailyTitle(date),
    alternates: { canonical: pageUrl(dailyPath(date)) },
    openGraph: {
      siteName: SITE.name,
      locale: "ko_KR",
      type: "article",
      title: dailyTitle(date),
      url: pageUrl(dailyPath(date)),
      images: parentImages,
    },
  };
}

export default async function DailyPage(props: PageProps<"/d/[date]">) {
  const { date } = await props.params;
  const [daily, dates] = await Promise.all([getDaily(date), getAllDates()]);
  const { prev, next } = adjacentDates(dates, date);
  const isPast = date < buildToday();

  return (
    <article>
      {isPast && (
        <p className="mb-4 rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-hot-deep">
          지난 핫딜이에요 — 가격·재고가 바뀌었을 수 있어요. 상태는 확인 시각 기준이에요.
        </p>
      )}
      <p className="text-sm font-bold text-hot-deep">배송비 포함 · 광고 제외</p>
      <h1 className="mt-1 text-4xl font-black leading-tight tracking-tighter">{dailyTitle(date)}</h1>
      <div className="mt-6">
        <DealList items={daily.items} />
      </div>
      <nav className="mt-10 flex justify-between text-sm font-bold">
        {prev ? (
          <Link href={dailyPath(prev)} className="text-hot-deep">
            ← {formatShortMonthDay(prev)}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={dailyPath(next)} className="text-hot-deep">
            {formatShortMonthDay(next)} →
          </Link>
        )}
      </nav>
    </article>
  );
}
