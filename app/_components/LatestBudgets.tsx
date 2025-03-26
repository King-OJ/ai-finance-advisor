import { BudgetType } from "@/utils/types/budget";
import BudgetItem from "./BudgetItem";
import { Category } from "@/utils/types/others";

export default function LatestBudgets({ list }: { list?: BudgetType[] }) {
  const data = list || [
    {
      id: "01",
      name: "Gucci Cloth",
      target: 4000,
      current: 1000,
      deadline: new Date("2025-02-25"),
      category: Category.Shopping,
      monthlyContribution: 200,
    },
    {
      id: "02",
      name: "House rent",
      target: 4000,
      current: 1000,
      deadline: new Date("2025-02-25"),
      category: Category.Home,
      monthlyContribution: 200,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">Latest Budgets</h2>
      {data.map((budget) => {
        return <BudgetItem key={budget.id} budget={budget} />;
      })}
    </div>
  );
}
