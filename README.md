# 핫딜텐 (hotdeal.kr)

매일, 배송비까지 더한 진짜 저렴이 TOP 10.
핫딜 게시판에서 하루 10개만 골라 배송비 포함 가격 순으로 정리하고, 품절·가격 변동을 확인해 보여주는 정적 사이트입니다.

- Next.js 16 (App Router, static export) · React 19 · Tailwind CSS v4 · Vitest
- GitHub Pages 배포 (`.github/workflows/deploy.yml`)

## 매일 할 일: 데이터 파일 하나 추가

`data/YYYY-MM-DD.json` 을 추가하고 `main` 에 push 하면 테스트 → 빌드 → 배포가 자동으로 진행됩니다.
매일 00:05 (KST) 에도 자동으로 다시 빌드되어, 오늘 데이터가 없으면 홈이 "어제(MM/DD) 기준"으로 바뀝니다.

```json
{
  "date": "2026-10-11",
  "items": [
    {
      "name": "나가타니엔 김맛 오차즈케",
      "spec": "8p 48g × 1개",
      "price": 5000,
      "store": "쿠팡",
      "url": "https://www.coupang.com/vp/products/...",
      "sourceUrl": "https://arca.live/b/hotdeal/...",
      "postedAt": "2026-10-09",
      "checkedAt": "2026-10-11T12:15:00+09:00",
      "status": "ok"
    }
  ]
}
```

| 필드 | 설명 |
| --- | --- |
| `price` | 핫딜 글 게시가(배송비 포함). 이 값으로 순위를 매김 |
| `status` | `ok` · `soldout`(일시품절) · `changed`(가격 변동) |
| `currentPrice`, `currentPriceNote` | `changed` 일 때 확인한 현재가와 조건(예: "와우 쿠폰가") |
| `isAd` | `true` 면 목록에서 제외 |
| `isAffiliate` | 제휴 링크면 `true` → `rel="sponsored"` 적용 |

`url` 이 빠진 상품이 있으면 빌드가 실패해 배포되지 않습니다.

## 개발

```bash
npm install
npm test          # Vitest
npm run dev       # 개발 서버
npm run build     # out/ 에 정적 사이트 생성
HOTDEAL_TODAY=2026-10-12 npm run build   # 특정 날짜 기준으로 빌드해 보기
```
