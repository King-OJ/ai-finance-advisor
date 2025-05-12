"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";

type PageHeaderProps<P> = {
  pageTitle: string;
  btnTitle: string;
  Form: React.ComponentType<P & { closeDialog: () => void }>;
  formProps: P;
};

function PageHeader<P>({
  pageTitle,
  btnTitle,
  Form,
  formProps,
}: PageHeaderProps<P>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeDialog = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold">{pageTitle}</h2>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="font-bold">{btnTitle}</Button>
        </DialogTrigger>

        <Form
          {...formProps}
          closeDialog={closeDialog}
          dialogOpen={isModalOpen}
        />
      </Dialog>
    </div>
  );
}

export default PageHeader;
