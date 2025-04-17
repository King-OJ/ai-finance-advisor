"use client";

import { Budget } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      newBudget: Omit<Budget, "id" | "createdAt" | "updatedAt" | "createdBy">
    ) =>
      fetch("/api/budgets", {
        method: "POST",
        body: JSON.stringify(newBudget),
      }).then((res) => res.json()),

    onMutate: async (newBudget) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });

      const previousBudgets = queryClient.getQueryData(["budgets"]) || [];

      queryClient.setQueryData(["budgets"], (old: Budget[]) => [
        ...(old || []),
        { ...newBudget, id: Date.now().toString() },
      ]);

      return { previousBudgets };
    },

    onError: (err, _, context) => {
      if (context?.previousBudgets) {
        queryClient.setQueryData(["budgets"], context.previousBudgets);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};
