"use client";
import { Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CreateGoalForm from "./CreateGoalForm";
import { GoalType } from "@/utils/demoData";
import { formatDate } from "@/utils/clientActions";

export default function GoalsProgress({ data }: { data: GoalType[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Financial Goals</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="font-bold">Create Goal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Enter a new portfolio name here. Click create when you are done.
              </DialogDescription>
            </DialogHeader>
            <CreateGoalForm onSuccess={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {data.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target);

          return (
            <div
              key={goal.id}
              className="p-4 bg-muted rounded-lg shadow-sm hover:bg-muted/90"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-full mr-2">
                    <Target size={16} />
                  </div>
                  <h3 className="font-semibold">{goal.name}</h3>
                </div>
                <span className="text-sm text-muted-foreground">
                  {goal.category}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">
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
                <div className="text-xs text-muted-foreground">
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
