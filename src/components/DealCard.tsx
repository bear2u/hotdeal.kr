import { formatCheckedAt } from "@/lib/dates";
import type { RankedDeal } from "@/lib/deals";
import { formatWon } from "@/lib/price";
import { statusLabel } from "@/lib/status";

function outboundRel(isAffiliate?: boolean): string {
  const base = "nofollow noopener noreferrer";
  return isAffiliate ? `sponsored ${base}` : base;
}

export function DealCard({ deal }: { deal: RankedDeal }) {
  const isCoupang = deal.store === "쿠팡";
  const label = statusLabel(deal);
  return (
    <article className="flex gap-4 rounded-3xl bg-white p-4 shadow-[0_10px_30px_rgba(80,30,5,0.08)] sm:p-5">
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-full text-2xl font-black tracking-tighter text-white ${
          deal.rank === 1 ? "bg-hot" : "bg-ink"
        }`}
      >
        {deal.rank}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
              isCoupang ? "bg-sun text-ink" : "bg-ink/90 text-white"
            }`}
          >
            {deal.store}
          </span>
          {label && (
            <span className="inline-block rounded-full border border-hot-deep/40 bg-hot-deep/10 px-2.5 py-0.5 text-xs font-bold text-hot-deep">
              {label}
            </span>
          )}
        </div>
        <h3 className="mt-1.5 text-lg font-extrabold leading-snug tracking-tight text-ink">{deal.name}</h3>
        <p className="text-sm text-muted">{deal.spec}</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tighter text-hot">{formatWon(deal.price)}</span>
          {deal.checkedAt && <span className="text-xs text-muted">{formatCheckedAt(deal.checkedAt)}</span>}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <a
            href={deal.url}
            target="_blank"
            rel={outboundRel(deal.isAffiliate)}
            className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-hot-deep"
          >
            {deal.store}에서 보기
          </a>
          <a
            href={deal.sourceUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-xs font-semibold text-muted underline underline-offset-2"
          >
            출처
          </a>
        </div>
      </div>
    </article>
  );
}
