import { describe, expect, it } from "vitest";
import { formatWon, parseWon } from "./price";

describe("price", () => {
  it("shouldFormatPriceWithCommasAndWon", () => {
    expect(formatWon(4190)).toBe("4,190원");
  });

  it("shouldParsePriceStringToNumber", () => {
    expect(parseWon("4,190원")).toBe(4190);
  });
});
