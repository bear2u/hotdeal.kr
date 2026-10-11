import { summarizeDay } from "./archive";
import { listDataDates, loadDaily } from "./data";
import { DATA_DIR } from "./site";

export function getAllDates(): Promise<string[]> {
  return listDataDates(DATA_DIR);
}

export function getDaily(date: string) {
  return loadDaily(DATA_DIR, date);
}

export async function getDaySummaries(dates: string[]): Promise<{ date: string; summary: string }[]> {
  return Promise.all(dates.map(async (date) => ({ date, summary: summarizeDay((await getDaily(date)).items) })));
}
