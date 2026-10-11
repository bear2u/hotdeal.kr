import path from "node:path";
import { todayInKst } from "./dates";
import { absoluteUrl, withBasePath } from "./paths";

export const SITE = {
  name: "핫딜텐",
  tagline: "매일, 배송비까지 더한 진짜 저렴이 TOP 10",
  // 도메인 확정 전 기본값. 배포 시 NEXT_PUBLIC_SITE_URL 로 덮어쓴다.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hotdeal10.com",
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** public/ 정적 파일 경로 (next/image 는 basePath 를 자동으로 붙이지 않음) */
export function asset(path: string): string {
  return withBasePath(path, BASE_PATH);
}

/** 공유·canonical·사이트맵용 절대 주소 */
export function pageUrl(path: string): string {
  return absoluteUrl(path, SITE.url);
}

export const DATA_DIR = path.join(process.cwd(), "data");

/** 빌드 기준 날짜(KST). HOTDEAL_TODAY=2026-10-12 로 특정 날짜 기준 빌드·미리보기 가능 */
export function buildToday(): string {
  return process.env.HOTDEAL_TODAY ?? todayInKst(new Date());
}

export function dailyPath(date: string): string {
  return `/d/${date}/`;
}
