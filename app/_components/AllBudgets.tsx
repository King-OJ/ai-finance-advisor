"use client";

import React, { useState } from "react";
import BudgetItem from "./BudgetItem";
import { Budget } from "@/utils/types/budget";

import { useSearchParams } from "next/navigation";
import { PageSkeleton } from "./PageSkeleton";
import { useBudgets } from "@/utils/hooks/budgets/useBudgets";
import PaginationBtns from "./PaginationBtns";

function AllBudgets() {
  const searchParams = useSearchParams();

  // Get current params from URL
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialPageSize = Number(searchParams.get("pageSize")) || 4;

  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);

  const { data, isPlaceholderData, isError, isFetching, isPending } =
    useBudgets({
      page,
      pageSize,
    });
  const budgets = data?.budgets || [];
  if (isPending || (isFetching && !data && !isPlaceholderData)) {
    return <PageSkeleton />;
  }

  if (isError) {
    return <div>Error loading budgets</div>;
  }

  return (
    <div className="space-y-8">
      {budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets?.map((budget: Budget) => (
            <BudgetItem budget={budget} key={budget.id} />
          ))}
        </div>
      ) : (
        <div>No Budgets to display</div>
      )}
      {data && data.totalPages > 1 && (
        <PaginationBtns
          page={page}
          handlePageChange={setPage}
          totalPages={data.totalPages}
        />
      )}
    </div>
  );
}

export default AllBudgets;
