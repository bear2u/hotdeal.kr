import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listDataDates, loadDaily } from "./data";

async function makeDataDir(files: Record<string, string>): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "hotdeal-data-"));
  for (const [name, content] of Object.entries(files)) {
    await writeFile(path.join(dir, name), content);
  }
  return dir;
}

describe("data", () => {
  it("shouldListDataDatesFromJsonFileNames", async () => {
    const dir = await makeDataDir({
      "2026-10-11.json": "{}",
      "2026-10-10.json": "{}",
      "notes.json": "{}",
      "2026-10-09.md": "",
    });
    expect(await listDataDates(dir)).toEqual(["2026-10-10", "2026-10-11"]);
  });

  it("shouldLoadDailyDataByDate", async () => {
    const daily = { date: "2026-10-11", items: [{ name: "새우깡 8봉 + 매운새우깡 8봉", price: 15660 }] };
    const dir = await makeDataDir({ "2026-10-11.json": JSON.stringify(daily) });
    expect(await loadDaily(dir, "2026-10-11")).toEqual(daily);
  });
});
