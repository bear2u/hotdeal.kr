export function formatWon(price: number): string {
  return `${price.toLocaleString("ko-KR")}원`;
}

export function parseWon(text: string): number {
  return Number(text.replace(/[^\d]/g, ""));
}
