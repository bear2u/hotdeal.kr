import type { Metadata } from "next";

export const metadata: Metadata = { title: "선정 기준" };

const RULES = [
  ["하루 10개만", "핫딜 게시판에 올라온 글 중 하루 10개만 골라요."],
  ["배송비 포함 가격", "배송비까지 더한 실제 결제 금액이 싼 순서로 순위를 매겨요."],
  ["광고·공지 제외", "광고 글과 공지는 순위에서 빼요."],
  ["지금 상태 확인", "올리기 전에 쇼핑몰 페이지를 직접 열어 품절·가격 변동을 확인하고, 확인 시각을 함께 적어요."],
] as const;

export default function AboutPage() {
  return (
    <>
      <h1 className="text-3xl font-black tracking-tighter">선정 기준</h1>
      <dl className="mt-6 flex flex-col gap-3">
        {RULES.map(([title, body]) => (
          <div key={title} className="rounded-2xl bg-white p-4">
            <dt className="font-black">{title}</dt>
            <dd className="mt-1 text-sm text-muted">{body}</dd>
          </div>
        ))}
      </dl>
      <h2 className="mt-10 text-lg font-black">알아두세요</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
        <li>가격은 핫딜 글 게시 시점 기준이고, 쿠폰·카드 할인 조건에 따라 달라질 수 있어요.</li>
        <li>상품 정보는 아카라이브 핫딜 채널 글을 출처로 하며, 각 상품의 출처 링크를 달아 둬요.</li>
        <li>지금은 제휴(수수료) 링크가 아닌 쇼핑몰 원래 상품 링크를 써요.</li>
      </ul>
    </>
  );
}
