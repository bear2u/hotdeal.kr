import { describe, expect, it } from "vitest";
import { absoluteUrl, withBasePath } from "./paths";

describe("withBasePath", () => {
  it("shouldPrefixPathsWithBasePathWhenConfigured", () => {
    expect(withBasePath("/logo.png", "/hotdeal.kr")).toBe("/hotdeal.kr/logo.png");
  });
});

describe("absoluteUrl", () => {
  it("shouldBuildAbsoluteUrlUnderSiteSubpath", () => {
    expect(absoluteUrl("/d/2026-10-11/", "https://bear2u.github.io/hotdeal.kr/")).toBe(
      "https://bear2u.github.io/hotdeal.kr/d/2026-10-11/",
    );
  });
});
