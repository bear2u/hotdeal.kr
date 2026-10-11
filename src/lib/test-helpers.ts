import type { DealItem } from "./deals";

export function makeDeal(overrides: Partial<DealItem> = {}): DealItem {
  return {
    name: "상품",
    spec: "1개",
    price: 1000,
    store: "쿠팡",
    url: "https://www.coupang.com/vp/products/1",
    sourceUrl: "https://arca.live/b/hotdeal/1",
    postedAt: "2026-10-09",
    status: "ok",
    ...overrides,
  };
}
