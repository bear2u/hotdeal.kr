import { describe, expect, it } from "vitest";
import { prepareDailyList } from "./deals";
import { makeDeal as item } from "./test-helpers";

describe("prepareDailyList", () => {
  it("shouldExcludeAdItemsFromDailyList", () => {
    const list = prepareDailyList([item({ name: "광고", isAd: true }), item({ name: "일반" })]);
    expect(list.map((d) => d.name)).toEqual(["일반"]);
  });

  it("shouldSortItemsByPriceAscendingAndAssignRank", () => {
    const list = prepareDailyList([
      item({ name: "비쌈", price: 18984 }),
      item({ name: "제일 쌈", price: 4190 }),
      item({ name: "중간", price: 9150 }),
    ]);
    expect(list.map((d) => [d.rank, d.name])).toEqual([
      [1, "제일 쌈"],
      [2, "중간"],
      [3, "비쌈"],
    ]);
  });

  it("shouldLimitDailyListToTenItems", () => {
    const twelve = Array.from({ length: 12 }, (_, i) => item({ name: `상품${i}`, price: 1000 + i }));
    const list = prepareDailyList(twelve);
    expect(list).toHaveLength(10);
    expect(list.at(-1)?.name).toBe("상품9");
  });

  it("shouldRejectItemWithoutUrl", () => {
    expect(() => prepareDailyList([item({ name: "링크없음", url: "" })])).toThrow("링크없음");
  });
});
