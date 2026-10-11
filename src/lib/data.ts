import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { DealItem } from "./deals";

export type DailyData = { date: string; items: DealItem[] };

const DATE_FILE = /^(\d{4}-\d{2}-\d{2})\.json$/;

export async function listDataDates(dir: string): Promise<string[]> {
  const files = await readdir(dir);
  return files
    .map((file) => DATE_FILE.exec(file)?.[1])
    .filter((date): date is string => date !== undefined)
    .toSorted();
}

export async function loadDaily(dir: string, date: string): Promise<DailyData> {
  const text = await readFile(path.join(dir, `${date}.json`), "utf-8");
  return JSON.parse(text) as DailyData;
}
