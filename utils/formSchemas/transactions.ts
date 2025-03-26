import * as z from "zod";
import { TransactionType } from "../types/transactions";
import { Category } from "../types/others";

export const addTransactionFormSchema = z.object({
  merchant: z.string().min(1, "Merchant name is required"),
  type: z.nativeEnum(TransactionType, {
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

export const searchTransactionSchema = z.object({
  searchQuery: z.string().min(1, "Provide a search query"),
  searchCategory: z.nativeEnum(Category, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  searchType: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: "Please select a valid type" }),
  }),
});
