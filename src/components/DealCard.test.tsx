import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup } from "@testing-library/react";
import { makeDeal } from "@/lib/test-helpers";
import { DealCard } from "./DealCard";

afterEach(cleanup);

describe("DealCard", () => {
  it("shouldRenderDealCardWithRankNamePriceAndStore", () => {
    render(<DealCard deal={{ ...makeDeal({ name: "나가타니엔 김맛 오차즈케", price: 5000, store: "쿠팡" }), rank: 2 }} />);
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByText("나가타니엔 김맛 오차즈케")).toBeTruthy();
    expect(screen.getByText("5,000원")).toBeTruthy();
    expect(screen.getByText("쿠팡")).toBeTruthy();
  });

  it("shouldRenderOutboundLinkWithNofollowAndSponsoredOnlyWhenAffiliate", () => {
    const url = "https://www.coupang.com/vp/products/399867";
    const { unmount } = render(<DealCard deal={{ ...makeDeal({ url }), rank: 1 }} />);
    const plain = screen.getByRole("link", { name: "쿠팡에서 보기" });
    expect(plain.getAttribute("href")).toBe(url);
    expect(plain.getAttribute("target")).toBe("_blank");
    expect(plain.getAttribute("rel")).toBe("nofollow noopener noreferrer");
    unmount();

    render(<DealCard deal={{ ...makeDeal({ url, isAffiliate: true }), rank: 1 }} />);
    expect(screen.getByRole("link", { name: "쿠팡에서 보기" }).getAttribute("rel")).toBe(
      "sponsored nofollow noopener noreferrer",
    );
  });

  it("shouldRenderSourceAttributionLink", () => {
    const sourceUrl = "https://arca.live/b/hotdeal/185410271";
    render(<DealCard deal={{ ...makeDeal({ sourceUrl }), rank: 1 }} />);
    expect(screen.getByRole("link", { name: "출처" }).getAttribute("href")).toBe(sourceUrl);
  });

  it("shouldRenderStatusBadgeWhenSoldOut", () => {
    render(<DealCard deal={{ ...makeDeal({ status: "soldout" }), rank: 1 }} />);
    expect(screen.getByText("일시품절")).toBeTruthy();
  });

  it("shouldShowCheckedAtTimeOnCard", () => {
    render(<DealCard deal={{ ...makeDeal({ checkedAt: "2026-10-11T12:15:00+09:00" }), rank: 1 }} />);
    expect(screen.getByText("10/11 12:15 확인")).toBeTruthy();
  });
});
