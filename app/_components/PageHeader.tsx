"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import CreateBudgetForm from "./CreateBudgetForm";

interface PageHeaderProps {
  title: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

function PageHeader({ title, Icon }: PageHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold">{title}</h2>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="font-bold">Create Budget</Button>
        </DialogTrigger>
        <DialogContent className="border-none">
          <DialogHeader className="mb-2">
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              Enter your budget details here. Click create when you are done.
            </DialogDescription>
          </DialogHeader>
          <CreateBudgetForm onSuccess={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PageHeader;
