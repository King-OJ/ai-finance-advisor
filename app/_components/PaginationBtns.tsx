"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationBtnsProps {
  page: number;
  totalPages: number;
}

function PaginationBtns({ page, totalPages }: PaginationBtnsProps) {
  const renderPaginationItems = () => {
    const items = [];

    //always show page 1 button
    items.push(
      <PaginationItem key="first">
        <PaginationLink isActive={page === 1}>1</PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if needed
    if (page > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;

      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={page === i}>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if needed
    if (page < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink isActive={page === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        {
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        }

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            aria-disabled={page === totalPages}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationBtns;
