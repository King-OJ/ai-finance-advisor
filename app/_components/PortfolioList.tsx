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
import AssetForm from "./AssetForm";

function PortfolioList() {
  const [isAddPortfolioOpen, setIsAddPortfolioOpen] = useState(false);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);

  return (
    <div className="space-x-4">
      <Dialog open={isAddPortfolioOpen} onOpenChange={setIsAddPortfolioOpen}>
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
          <PortfolioForm onSuccess={() => setIsAddPortfolioOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isAddAssetOpen} onOpenChange={setIsAddAssetOpen}>
        <DialogTrigger asChild>
          <Button className="font-bold">Add Asset</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Enter a new asset name here. Click create when you are done.
            </DialogDescription>
          </DialogHeader>
          <AssetForm
            onSuccess={() => setIsAddAssetOpen(false)}
            portfolioId="123"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PortfolioList;
