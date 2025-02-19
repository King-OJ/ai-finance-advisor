"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { CustomSelectField } from "./FormComponents";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

function FinanceForm() {
  const form = useForm();
  return (
    <Card>
      <Form {...form}>
        <form action="" className="space-y-4">
          <CustomSelectField
            name="type"
            values={["income", "expenses"]}
            placeholder="Select type"
          />
        </form>
      </Form>
    </Card>
  );
}

export default FinanceForm;
