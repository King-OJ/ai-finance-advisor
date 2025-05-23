"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetBudgetsParams } from "../../types/budget";

export const useBudgets = (params: GetBudgetsParams = {}) => {
  const queryKey = ["budgets", params];
  const queryFn = async () => {
    const url = new URL("/api/budgets", window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });
    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`Failed to fetch budgets: ${res.status}`);
    }

    return res.json();
  };

  return useQuery({
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
    staleTime: 0,
  });
};

export const useBudgetsDetail = (id: number) => {
  return useQuery({
    queryKey: ["budget", id],
    queryFn: async () => {
      const response = await fetch(`/api/budgets/${id}`);
      const data = await response.json();

      if (!response.ok) throw new Error("Failed to fetch budget");
      return { ...data, transactions: data.transactions || [] };
    },
    enabled: !!id, // Only fetch when ID exists
    staleTime: 60 * 1000, // 1 minute cache
  });
};
