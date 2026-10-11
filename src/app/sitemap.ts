import type { MetadataRoute } from "next";
import { dailyPath, pageUrl } from "@/lib/site";
import { getAllDates } from "@/lib/site-data";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dates = await getAllDates();
  return [
    { url: pageUrl("/") },
    { url: pageUrl("/archive/") },
    { url: pageUrl("/about/") },
    ...dates.map((date) => ({ url: pageUrl(dailyPath(date)), lastModified: date })),
  ];
}
