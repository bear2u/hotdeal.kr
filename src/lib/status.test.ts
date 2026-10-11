import { describe, expect, it } from "vitest";
import { statusLabel } from "./status";

describe("statusLabel", () => {
  it("shouldReturnNoLabelForOkItem", () => {
    expect(statusLabel({ status: "ok", price: 5000 })).toBeNull();
  });

  it("shouldLabelSoldOutItem", () => {
    expect(statusLabel({ status: "soldout", price: 4190 })).toBe("일시품절");
  });

  it("shouldLabelPriceChangedWhenCurrentPriceDiffers", () => {
    expect(statusLabel({ status: "changed", price: 12320, currentPrice: 16000 })).toBe(
      "가격 변동 · 현재 16,000원",
    );
  });

  it("shouldAppendPriceNoteToChangedLabel", () => {
    expect(
      statusLabel({ status: "changed", price: 9150, currentPrice: 10760, currentPriceNote: "와우 쿠폰가" }),
    ).toBe("가격 변동 · 현재 10,760원 (와우 쿠폰가)");
  });
});
