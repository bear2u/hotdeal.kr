import { describe, expect, it } from "vitest";
import { adjacentDates, groupByMonth, pickHomeDate, recentDays, summarizeDay } from "./archive";
import { makeDeal } from "./test-helpers";

describe("pickHomeDate", () => {
  it("shouldPickTodayAsHomeDateWhenTodayExists", () => {
    const home = pickHomeDate(["2026-10-09", "2026-10-11", "2026-10-10"], "2026-10-11");
    expect(home).toEqual({ date: "2026-10-11", fallbackLabel: null });
  });

  it("shouldFallBackToYesterdayWithLabelWhenTodayMissing", () => {
    const home = pickHomeDate(["2026-10-09", "2026-10-10"], "2026-10-11");
    expect(home).toEqual({ date: "2026-10-10", fallbackLabel: "어제(10/10) 기준" });
  });

  it("shouldTreatLastDayOfPreviousMonthAsYesterday", () => {
    const home = pickHomeDate(["2026-10-31"], "2026-11-01");
    expect(home.fallbackLabel).toBe("어제(10/31) 기준");
  });

  it("shouldShowDateLabelWhenLatestIsOlderThanYesterday", () => {
    const home = pickHomeDate(["2026-10-07", "2026-10-08"], "2026-10-11");
    expect(home).toEqual({ date: "2026-10-08", fallbackLabel: "10/08 기준" });
  });
});

describe("recentDays", () => {
  it("shouldListRecentDaysExcludingHomeDateNewestFirst", () => {
    const dates = Array.from({ length: 20 }, (_, i) => `2026-09-${String(i + 1).padStart(2, "0")}`);
    const recent = recentDays(dates, "2026-09-20");
    expect(recent).toHaveLength(14);
    expect(recent[0]).toBe("2026-09-19");
    expect(recent.at(-1)).toBe("2026-09-06");
  });
});

describe("summarizeDay", () => {
  it("shouldSummarizeArchiveRowWithTopItemAndLowestPrice", () => {
    const summary = summarizeDay([
      makeDeal({ name: "무뚝뚝감자칩 + 통크", price: 18984 }),
      makeDeal({ name: "배대감 알룰로스 바닐라시럽", price: 4190 }),
    ]);
    expect(summary).toBe("배대감 알룰로스 바닐라시럽 · 4,190원~");
  });
});

describe("groupByMonth", () => {
  it("shouldGroupDatesByMonthNewestFirst", () => {
    const groups = groupByMonth(["2026-09-30", "2026-10-11", "2026-09-29", "2026-10-10"]);
    expect(groups).toEqual([
      { label: "2026년 10월", dates: ["2026-10-11", "2026-10-10"] },
      { label: "2026년 9월", dates: ["2026-09-30", "2026-09-29"] },
    ]);
  });
});

describe("adjacentDates", () => {
  it("shouldFindPrevAndNextDates", () => {
    const dates = ["2026-10-11", "2026-10-09", "2026-10-10"];
    expect(adjacentDates(dates, "2026-10-10")).toEqual({ prev: "2026-10-09", next: "2026-10-11" });
    expect(adjacentDates(dates, "2026-10-09")).toEqual({ prev: null, next: "2026-10-10" });
    expect(adjacentDates(dates, "2026-10-11")).toEqual({ prev: "2026-10-10", next: null });
  });
});
