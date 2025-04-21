"use client";

import { useToast } from "@/hooks/use-toast";
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

      queryClient.setQueryData(["budgets"], (old: Budget[] | undefined) => [
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

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/budgets/${id}`, { method: "DELETE" }),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });
      const previousBudgets = queryClient.getQueryData(["budgets"]) || [];

      queryClient.setQueryData(
        ["budgets"],
        (old: Budget[]) => old?.filter((budget) => budget.id !== id) || []
      );

      return { previousBudgets };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["budgets"], context?.previousBudgets);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

export const useEditBudget = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const onSettled = () => {
    queryClient.invalidateQueries({ queryKey: ["budgets"] });
  };

  const mutationFn = (
    updatedBudget: Omit<Budget, "createdAt" | "updatedAt" | "createdBy">
  ) =>
    fetch(`/api/budgets/${updatedBudget.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedBudget),
    }).then((res) => res.json());

  const onMutate = async (
    updatedBudget: Omit<Budget, "createdAt" | "updatedAt" | "createdBy">
  ) => {
    await queryClient.cancelQueries({ queryKey: ["budgets"] });
    const previousBudgets = queryClient.getQueryData(["budgets"]) || [];
    queryClient.setQueryData(
      ["budgets"],
      (old: Budget[]) =>
        old?.map((budget) =>
          budget.id === updatedBudget.id
            ? { ...budget, ...updatedBudget }
            : budget
        ) || []
    );

    return { previousBudgets };
  };

  return useMutation({
    mutationFn,
    onMutate,
    onSettled,
    onError: (error, _, context) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
      // Rollback on error
      queryClient.setQueryData(["budgets"], context?.previousBudgets);
    },
  });
};
