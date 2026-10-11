export function formatKoreanMonthDay(date: string): string {
  const [, month, day] = date.split("-").map(Number);
  return `${month}월 ${day}일`;
}

const KST_OFFSET_MS = 9 * 60 * 60 * 1000; // 한국은 서머타임이 없어 고정 오프셋

export function formatCheckedAt(isoDateTime: string): string {
  const kst = new Date(new Date(isoDateTime).getTime() + KST_OFFSET_MS);
  const pad = (n: number) => String(n).padStart(2, "0");
  const monthDay = `${pad(kst.getUTCMonth() + 1)}/${pad(kst.getUTCDate())}`;
  const time = `${pad(kst.getUTCHours())}:${pad(kst.getUTCMinutes())}`;
  return `${monthDay} ${time} 확인`;
}

export function todayInKst(now: Date): string {
  return new Date(now.getTime() + KST_OFFSET_MS).toISOString().slice(0, 10);
}

export function formatShortMonthDay(date: string): string {
  const [, month, day] = date.split("-");
  return `${month}/${day}`;
}
