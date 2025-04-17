import * as z from "zod";
import { Category } from "../types/budget";

export const createBudgetSchema = z.object({
  name: z.string().min(1, "Budget name is required"),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  description: z.string().optional(),
  targetAmount: z
    .number({
      required_error: "Enter target  amount for the transaction",
      invalid_type_error: "Amount must be a number",
    })
    .min(10, "Amount must be at least $10")
    .max(20000, "Amount cannot be more than $20,000"),
  currentAmount: z.number({
    required_error: "Enter current amount for the transaction",
    invalid_type_error: "Amount must be a number",
  }),
  startDate: z.string({
    required_error: "A date is required",
  }),
  endDate: z.string({
    required_error: "A date is required",
  }),

  // Example of checking if the date is in the future
  // .refine((date) => date.getTime() > new Date().getTime(), {
  //   message: "Date must be in the future",
  // }),
});

export type CreateBudgetType = z.infer<typeof createBudgetSchema>;
