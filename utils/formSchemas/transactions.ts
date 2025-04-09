import * as z from "zod";

export const addTransactionFormSchema = z.object({
  merchant: z.string().min(1, "Merchant name is required"),
  type: z.enum(["income", "expense", "transfer"], {
    errorMap: () => ({ message: "Please select a valid type" }),
  }),
  category: z.enum(["Food", "Entertainment", "Bills", "Salary", "Investment"], {
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

export const TransactionFiltersSchema = z.object({
  search: z.string().optional(),
  // startDate: z.string().optional(),
  // endDate: z.string().optional(),
  category: z
    .enum(["Food", "Entertainment", "Bills", "Salary", "Investment"])
    .optional(),
  type: z.enum(["income", "expense", "transfer"]).optional(),
  status: z.enum(["completed", "pending", "failed"]).optional(),
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
