"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomFormInputField } from "./FormComponents";
import { Button } from "@/components/ui/button";

const portfolioFormSchema = z.object({
  name: z.string().min(1, "Portfolio name is required"),
});

interface PortFolioFormProps {
  onSuccess?: () => void;
}

function PortfolioForm({ onSuccess }: PortFolioFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof portfolioFormSchema>>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof portfolioFormSchema>) => {
    console.log(values);
    onSuccess?.();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormInputField name="name" control={form.control} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}

export default PortfolioForm;
