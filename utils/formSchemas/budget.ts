import * as z from "zod";
import { Category } from "../types/others";

export const createBudgetSchema = z.object({
  name: z.string().min(1, "Goal name is required"),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  targetAmount: z
    .number({
      required_error: "Enter amount for the transaction",
      invalid_type_error: "Amount must be a number",
    })
    .min(10, "Amount must be at least $10")
    .max(20000, "Amount cannot be more than $20,000"),
  currentAmount: z.number({
    required_error: "Enter amount for the transaction",
    invalid_type_error: "Amount must be a number",
  }),
  deadline: z
    .date({
      required_error: "A date is required",
    })

    // Example of checking if the date is in the future
    .refine((date) => date.getTime() > new Date().getTime(), {
      message: "Date must be in the future",
    }),
});
