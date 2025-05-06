"use client";
import { Transaction } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useBudgetTransactions(
  budgetId: number,
  options: {
    page: number;
    perPage: number;
    category?: string | null;
  },
  initialTransactions?: Transaction[]
) {
  const { page, perPage, category } = options;

  const queryKey = [
    "budgetTransactions",
    budgetId,
    { page, perPage, category },
  ];

  const fetchTransactions = useCallback(async () => {
    const params = new URLSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
      ...(options.category && { category: options.category }),
    });

    const response = await fetch(
      `/api/budgets/${budgetId}/transactions?${params}`
    );

    if (!response.ok) throw new Error("Network response was not ok");

    return await response.json();
  }, [budgetId, page, perPage, category]);

  return useQuery({
    queryKey,
    queryFn: fetchTransactions,
    placeholderData: keepPreviousData,
    initialData: () => {
      if (!category && page === 1 && initialTransactions) {
        return {
          data: initialTransactions || [],
          pagination: {
            page: 1,
            perPage,
            total: initialTransactions?.length || 0,
            totalPages: Math.ceil((initialTransactions?.length || 0) / perPage),
          },
        };
      }

      return undefined;
    },
    initialDataUpdatedAt: initialTransactions ? Date.now() : undefined,
    enabled: !!budgetId,
  });
}
