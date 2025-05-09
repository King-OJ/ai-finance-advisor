import * as z from "zod";
import { Categories } from "../types/budget";

export const addTransactionFormSchema = z.object({
  merchant: z.string().min(3, "Please provide a valid merchant name"),
  category: z.nativeEnum(Categories, {
    required_error: "Select a category for this transaction",
  }),
  status: z.boolean(),
  date: z.string({
    required_error: "Please provide a date for the transaction",
  }),
  amount: z
    .number({
      required_error: "Enter amount for this transaction",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than $0"),
  budgetId: z.string({
    required_error: "Select a budget that this transaction belongs to",
  }),
});

export const TransactionFiltersSchema = z.object({
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budgetId: z.string().optional(),
  category: z.nativeEnum(Categories).optional(),
});
// .refine(
//   (data) => {
//     if (data.startDate && data.endDate) {
//       const start = new Date(data.startDate);
//       const end = new Date(data.endDate);
//       return end >= start;
//     }

//     return true;
//   },
//   {
//     message: "End date must be after start date",
//     path: ["endDate"],
//   }
// );

export type FilterValues = z.infer<typeof TransactionFiltersSchema>;

export type AddTransactionFormType = z.infer<typeof addTransactionFormSchema>;
