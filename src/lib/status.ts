import type { DealItem } from "./deals";
import { formatWon } from "./price";

type StatusInput = Pick<DealItem, "status" | "price" | "currentPrice" | "currentPriceNote">;

export function statusLabel(item: StatusInput): string | null {
  if (item.status === "soldout") return "일시품절";
  if (item.status === "changed" && item.currentPrice !== undefined) {
    const note = item.currentPriceNote ? ` (${item.currentPriceNote})` : "";
    return `가격 변동 · 현재 ${formatWon(item.currentPrice)}${note}`;
  }
  return null;
}
