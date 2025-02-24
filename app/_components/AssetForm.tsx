"use client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomFormInputField } from "./FormComponents";

type AssetFormProps = {
  portfolioId: string;
  onSuccess?: () => void;
};

const assetSchema = z.object({
  symbol: z.string().min(1, "Symbol is required").max(5),
  shares: z.string().transform((val) => parseFloat(val)),
  costBasis: z.string().transform((val) => parseFloat(val)),
});

function AssetForm({ portfolioId, onSuccess }: AssetFormProps) {
  const form = useForm<z.infer<typeof assetSchema>>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      symbol: "",
      shares: 2,
      costBasis: 5,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof assetSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormInputField name="symbol" control={form.control} />
        <CustomFormInputField name="shares" control={form.control} />
        <CustomFormInputField name="costBasis" control={form.control} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Asset"}
        </Button>
      </form>
    </Form>
  );
}

export default AssetForm;
