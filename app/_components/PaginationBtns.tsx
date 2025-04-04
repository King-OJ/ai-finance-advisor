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
import { Button } from "@/components/ui/button";

interface PaginationBtnsProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

function PaginationBtns({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationBtnsProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <Pagination>
        <PaginationContent>
          {
            <PaginationItem>
              <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage == 1}
                variant={"outline"}
              >
                Previous
              </Button>
            </PaginationItem>
          }
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <Button
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </Button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <Button
              variant={"outline"}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage == totalPages}
            >
              Next
            </Button>
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
