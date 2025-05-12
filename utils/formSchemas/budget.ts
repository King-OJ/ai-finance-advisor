import * as z from "zod";
import { Categories } from "../types/budget";
import { normalizeToUTC, parseDateStringToUTC } from "../actions/clientActions";

export const createBudgetSchema = z
  .object({
    name: z.string().min(1, "Budget name is required"),
    category: z.nativeEnum(Categories, {
      errorMap: () => ({ message: "Please select a valid category" }),
    }),
    description: z.string().optional(),
    amount: z
      .number({
        required_error: "Enter amount for the budget",
        invalid_type_error: "Amount must be a number",
      })
      .min(10, "Amount must be at least $10")
      .max(20000, "Amount cannot be more than $20,000"),
    spent: z.number({
      required_error: "Enter amount spent inside the budget",
      invalid_type_error: "Amount must be a number",
    }),
    startDate: z.string({
      required_error: "A date is required",
    }),
    endDate: z.string({
      required_error: "A date is required",
    }),
  })
  .superRefine((data, ctx) => {
    const start = parseDateStringToUTC(data.startDate);
    const end = parseDateStringToUTC(data.endDate);

    if (normalizeToUTC(end) < normalizeToUTC(start)) {
      ctx.addIssue({
        path: ["endDate"],
        message: `End date should be after Start date. Not before!`,
        code: z.ZodIssueCode.custom,
      });
    }

    if (normalizeToUTC(start) > normalizeToUTC(end)) {
      ctx.addIssue({
        path: ["startDate"],
        message: `Start date should be before end date! Not after`,
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.spent > data.amount) {
      ctx.addIssue({
        path: ["spent"],
        message: `Your spent amount can't be greater than your budget amount.`,
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type CreateBudgetType = z.infer<typeof createBudgetSchema>;
