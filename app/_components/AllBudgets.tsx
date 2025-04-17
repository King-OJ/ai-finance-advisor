"use client";

import React, { useState } from "react";
import BudgetItem from "./BudgetItem";
import { Budget, BudgetsResponse } from "@/utils/types/budget";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { PageSkeleton } from "./PageSkeleton";
import { useBudgets } from "@/utils/hooks/budgets/useBudgets";

function AllBudgets() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current params from URL
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialPageSize = Number(searchParams.get("pageSize")) || 4;

  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);

  const { data, isLoading, isError } = useBudgets({ page, pageSize });
  const budgets = data?.budgets || [];
  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError) {
    return <div>Error loading budgets</div>;
  }

  return budgets ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {budgets.map((budget: Budget) => (
        <BudgetItem budget={budget} key={budget.id} />
      ))}
    </div>
  ) : (
    <div>No Budgets to display</div>
  );
}

export default AllBudgets;
