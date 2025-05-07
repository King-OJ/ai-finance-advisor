import * as z from "zod";
import { Categories } from "../types/budget";

export const addTransactionFormSchema = z.object({
  merchant: z.string().min(1, "Merchant name is required"),
  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Please select a valid type" }),
  }),
  // status: z.enum(["completed", "pending", "failed"], {
  //   errorMap: () => ({ message: "Please select a valid category" }),
  // }),
  amount: z
    .number({
      required_error: "Enter amount for this transaction",
      invalid_type_error: "Amount must be a number",
    })
    .min(1, "Amount for transaction must be atleast 1$"),
  description: z.string().optional(),
});

export const TransactionFiltersSchema = z.object({
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.string().optional(),
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
