import React from "react";
import { Target, TrendingUp } from "lucide-react";
import { formatDate, getEmojiForCategory } from "@/utils/actions/clientActions";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BudgetType } from "@/utils/types/budget";

const calculateProgress = (current: number, target: number) => {
  return Math.min((current / target) * 100, 100);
};

function BudgetItem({ budget }: { budget: BudgetType }) {
  const { name, category, current, target, deadline } = budget;

  const progress = calculateProgress(current, target);

  const categoryEmoji = getEmojiForCategory(category);

  return (
    <>
      <Card className="md:px-2 md:py-2">
        <CardHeader className="sr-only">Budget</CardHeader>
        <CardContent className="pt-0">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 text-primary rounded-full mr-2">
                  {categoryEmoji ? categoryEmoji : <Target size={16} />}
                </div>
                <h3 className="font-semibold">{name}</h3>
              </div>
              <span className="text-sm text-secondary-foreground">
                {category}
              </span>
            </div>

            <div className="mt-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm">
                  ${current.toLocaleString()} of ${target.toLocaleString()}
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
              <div className="text-xs">Due by {formatDate(deadline)}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp size={12} className="mr-1" />
                On track
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default BudgetItem;
