"use client";
import {
  TransactionFilters,
  TransactionResponse,
} from "@/utils/types/transactions";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useTransactions = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "10");
  const budgetId = searchParams.get("budgetId");
  const category = searchParams.get("category");

  const queryKey = ["transactions", { page, perPage, budgetId, category }];
  const queryFn = useCallback(async () => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("perPage", perPage.toString());
    if (budgetId) params.set("budgetId", budgetId);
    if (category) params.set("category", category);
    // if (dateFrom) params.set("dateFrom", dateFrom);
    // if (dateTo) params.set("dateTo", dateTo);

    const response = await fetch(`/api/transactions?${params.toString()}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  }, [page, budgetId, perPage, category]);

  const updateURL = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setFilters = useCallback(
    (filters: TransactionFilters) => {
      queryClient.cancelQueries({ queryKey: ["transactions"] });
      const newParams = {
        page: filters.page?.toString() || "1",
        perPage: filters.perPage?.toString() || "10",
        ...(filters.budgetId !== "" && { budgetId: filters.budgetId }),
        ...(filters.category !== "" && { category: filters.category }),
      };

      updateURL(newParams);
    },
    [queryClient, updateURL]
  );

  const query = useQuery<TransactionResponse>({
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes,
  });

  return {
    ...query,
    setFilters,
    filters: { page, perPage, budgetId, category },
  };
};
