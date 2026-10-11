import { describe, expect, it } from "vitest";
import { formatCheckedAt, formatKoreanMonthDay, formatShortMonthDay, todayInKst } from "./dates";

describe("dates", () => {
  it("shouldFormatKoreanMonthDay", () => {
    expect(formatKoreanMonthDay("2026-10-11")).toBe("10월 11일");
  });

  it("shouldFormatShortMonthDay", () => {
    expect(formatShortMonthDay("2026-10-09")).toBe("10/09");
  });

  it("shouldFormatCheckedAtInKst", () => {
    expect(formatCheckedAt("2026-10-11T03:20:00Z")).toBe("10/11 12:20 확인");
  });

  it("shouldComputeTodayInKst", () => {
    // UTC 10/10 16:30 은 한국 시각 10/11 01:30
    expect(todayInKst(new Date("2026-10-10T16:30:00Z"))).toBe("2026-10-11");
  });
});
