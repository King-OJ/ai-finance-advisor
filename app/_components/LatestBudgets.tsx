import { Budget, Category } from "@/utils/types/budget";
import BudgetItem from "./BudgetItem";

export default function LatestBudgets({ list }: { list?: Budget[] }) {
  const data = list || [
    {
      id: 1,
      name: "Gucci Cloth",
      description: "Just an outing cloth",
      targetAmount: 4000,
      currentAmount: 1000,
      startDate: "2025-02-25",
      endDate: "2025-04-25",
      category: Category.Shopping,
    },
    {
      id: 2,
      name: "House rent",
      description: "A necessary house payment",
      targetAmount: 4000,
      currentAmount: 1000,
      startDate: "2025-02-25",
      category: Category.Home,
      endDate: "2025-05-26",
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
