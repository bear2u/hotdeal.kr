import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { asset, SITE } from "@/lib/site";

export const metadata: Metadata = {
  // 파일 규칙 이미지(opengraph-image 등)에는 Next 가 basePath 를 붙이므로 기준 주소는 origin 만 쓴다.
  metadataBase: new URL(new URL(SITE.url).origin),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: "핫딜 게시판에서 매일 10개만 골라 배송비 포함 가격 순으로 정리하고, 품절·가격 변동까지 확인해 보여줘요.",
  openGraph: { siteName: SITE.name, locale: "ko_KR", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 pt-6">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter">
            <Image src={asset("/logo.png")} alt="" width={36} height={36} priority />
            <span>
              핫딜<span className="text-hot">텐</span>
            </span>
          </Link>
          <nav className="flex gap-4 text-sm font-bold text-muted">
            <Link href="/archive/" className="hover:text-ink">
              아카이브
            </Link>
            <Link href="/about/" className="hover:text-ink">
              선정 기준
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-5 pb-16 pt-6">{children}</main>
        <footer className="mx-auto w-full max-w-2xl px-5 pb-10 text-xs leading-relaxed text-muted">
          <p>가격은 핫딜 글 게시 시점(배송비 포함) 기준이며, 확인 시각 이후 바뀔 수 있어요.</p>
          <p>상품 정보 출처: 아카라이브 핫딜 채널 · 링크는 쇼핑몰 원래 상품 페이지예요.</p>
        </footer>
      </body>
    </html>
  );
}
