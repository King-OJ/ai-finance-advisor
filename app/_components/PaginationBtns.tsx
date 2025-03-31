"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationBtnsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

function PaginationBtns({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationBtnsProps) {
  const params = new URLSearchParams();
  const router = useRouter();

  const updateUrl = () => {
    params.set("page", currentPage.toString());
    router.push(`/transactions?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <Pagination>
        <PaginationContent>
          {
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    updateUrl();
                  }
                }}
                isActive={currentPage > 1}
              />
            </PaginationItem>
          }
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                  updateUrl();
                }
              }}
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}

export default PaginationBtns;
