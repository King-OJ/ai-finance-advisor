"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";

interface PageHeaderProps {
  pageTitle: string;
  btnTitle: string;
  Form: React.ComponentType<{
    onSuccess?: () => void;
    closeDialogue?: () => void;
  }>;
}

function PageHeader({ pageTitle, btnTitle, Form }: PageHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold">{pageTitle}</h2>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="font-bold">{btnTitle}</Button>
        </DialogTrigger>

        <Form closeDialogue={() => setIsModalOpen(false)} />
      </Dialog>
    </div>
  );
}

export default PageHeader;
