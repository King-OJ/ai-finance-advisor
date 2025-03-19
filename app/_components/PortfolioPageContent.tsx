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
import PortfolioForm from "./PortfolioForm";
import PortfolioOverview from "./PortfolioOverview";
import { PortfolioType } from "@/utils/demoData";

function PortfolioPageContent({ data }: { data: PortfolioType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="font-bold">Create Portfolio</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Portfolio</DialogTitle>
            <DialogDescription>
              Enter a new portfolio name here. Click create when you are done.
            </DialogDescription>
          </DialogHeader>
          <PortfolioForm onSuccess={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <PortfolioOverview data={data} />
    </div>
  );
}

export default PortfolioPageContent;
