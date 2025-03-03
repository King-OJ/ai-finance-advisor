// components/dashboard/GoalsProgress.jsx
import { Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GoalsProgress({}) {
  // Fallback data for development/preview
  const goalsData = [
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      deadline: "2025-05-01",
      category: "Saving",
    },
    {
      id: 2,
      name: "Vacation",
      target: 3000,
      current: 1500,
      deadline: "2025-06-15",
      category: "Travel",
    },
    {
      id: 3,
      name: "New Laptop",
      target: 2000,
      current: 800,
      deadline: "2025-08-01",
      category: "Purchase",
    },
  ];

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Financial Goals</h2>
        <Button variant="outline" size="sm">
          Add Goal
        </Button>
      </div>

      <div className="space-y-4">
        {goalsData.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target);

          return (
            <div
              key={goal.id}
              className="p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-full mr-2">
                    <Target size={16} />
                  </div>
                  <h3 className="font-medium">{goal.name}</h3>
                </div>
                <span className="text-sm text-gray-500">{goal.category}</span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">
                    ${goal.current.toLocaleString()} of $
                    {goal.target.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium">
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="text-xs text-gray-500">
                  Due by {formatDate(goal.deadline)}
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp size={12} className="mr-1" />
                  On track
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
