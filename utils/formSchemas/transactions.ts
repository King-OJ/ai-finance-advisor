import * as z from "zod";
import { Categories } from "../types/budget";
import { TransactionsPageBudgets } from "../types/transactions";
import {
  formatDate,
  normalizeToUTC,
  parseDateStringToUTC,
} from "../actions/clientActions";

export const addTransactionFormSchema = (budgets: TransactionsPageBudgets) =>
  z
    .object({
      merchant: z.string().min(3, "Please provide a valid merchant name"),
      category: z.nativeEnum(Categories, {
        required_error: "Select a category for this transaction",
      }),
      status: z.boolean(),
      date: z.string({
        required_error: "Please provide a date for this transaction",
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
    })
    .superRefine((data, ctx) => {
      const budget = budgets.find((b) => b.id.toString() === data.budgetId);
      if (!budget) {
        ctx.addIssue({
          path: ["budgetId"],
          message: "Selected budget does not exist",
          code: z.ZodIssueCode.custom,
        });
        return;
      }
      const inputDate = parseDateStringToUTC(data.date);
      const start = budget.startDate;
      const end = budget.endDate;

      if (
        normalizeToUTC(inputDate) < normalizeToUTC(start) ||
        normalizeToUTC(inputDate) > normalizeToUTC(end)
      ) {
        ctx.addIssue({
          path: ["date"],
          message: `Date must be between ${formatDate(
            budget.startDate
          )} and ${formatDate(budget.endDate)} for this budget`,
          code: z.ZodIssueCode.custom,
        });
      }

      const remaining = budget.amount - budget.spent;
      if (data.amount > remaining) {
        ctx.addIssue({
          path: ["amount"],
          message: `You only have $${remaining.toFixed(2)} left in this budget`,
          code: z.ZodIssueCode.custom,
        });
      }
    });

export const TransactionFiltersSchema = z.object({
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budgetId: z.string().optional(),
  category: z.nativeEnum(Categories).optional(),
});

export type FilterValues = z.infer<typeof TransactionFiltersSchema>;

export type AddTransactionFormSchemaType = z.infer<
  ReturnType<typeof addTransactionFormSchema>
>;
