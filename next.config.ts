import type { NextConfig } from "next";

// 정적 내보내기(out/) — Cloudflare Pages / GitHub Pages 배포용.
// cacheComponents·partialPrefetching 은 export 모드와 함께 쓸 수 없어 끈다.
const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages 프로젝트 주소(/hotdeal.kr) 하위에서 서비스할 때만 설정. 커스텀 도메인 연결 후에는 비워 둔다.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
