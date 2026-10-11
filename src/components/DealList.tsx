import { prepareDailyList, type DealItem } from "@/lib/deals";
import { DealCard } from "./DealCard";

export function DealList({ items }: { items: DealItem[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {prepareDailyList(items).map((deal) => (
        <li key={deal.url}>
          <DealCard deal={deal} />
        </li>
      ))}
    </ol>
  );
}
