export type DealStatus = "ok" | "soldout" | "changed";

export type DealItem = {
  name: string;
  spec: string;
  /** 핫딜 글 게시가(배송비 포함) */
  price: number;
  store: string;
  url: string;
  sourceUrl: string;
  postedAt: string;
  checkedAt?: string;
  status: DealStatus;
  currentPrice?: number;
  currentPriceNote?: string;
  isAd?: boolean;
  isAffiliate?: boolean;
};

export type RankedDeal = DealItem & { rank: number };

export const DAILY_LIMIT = 10;

export function prepareDailyList(items: DealItem[]): RankedDeal[] {
  const missingUrl = items.find((item) => !item.url);
  if (missingUrl) {
    throw new Error(`상품 링크(url)가 없습니다: ${missingUrl.name}`);
  }
  return items
    .filter((item) => !item.isAd)
    .toSorted((a, b) => a.price - b.price)
    .slice(0, DAILY_LIMIT)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}
