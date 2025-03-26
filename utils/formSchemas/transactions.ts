import * as z from "zod";
import { Type, Status } from "../types/transactions";
import { Category } from "../types/others";

export const addTransactionFormSchema = z.object({
  merchant: z.string().min(1, "Merchant name is required"),
  type: z.nativeEnum(Type, {
    errorMap: () => ({ message: "Please select a valid type" }),
  }),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  amount: z
    .number({
      required_error: "Enter amount for this transaction",
      invalid_type_error: "Amount must be a number",
    })
    .min(1, "Amount for transaction must be atleast 1$"),
  description: z.string().optional(),
});

export const TransactionFiltersSchema = z
  .object({
    searchQuery: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    category: z.nativeEnum(Category).optional(),
    type: z.nativeEnum(Type).optional(),
    status: z.nativeEnum(Status).optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        return end >= start;
      }

      return true;
    },
    {
      message: "End date must be after or the same as start date",
      path: ["endDate"],
    }
  );
