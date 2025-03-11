import * as z from "zod";

export enum TransactionType {
  Incoming = "Incoming",
  Outgoing = "Outgoing",
}

export enum TransactionCategory {
  Groceries = "Groceries",
  Salary = "Salary",
  Utilities = "Utilities",
  Miscelleneous = "Miscelleneous",
  Entertainment = "Entertainment",
  Rent = "Rent",
  Transport = "Transport",
  Savings = "Savings",
  Profit = "Profit",
}

export enum GoalsCategory {
  Business = "Business",
  Vacation = "Vacation",
  Birthday = "Birthday",
  Shopping = "Shopping",
  Entertainment = "Entertainment",
  Rent = "Rent",
  Travel = "Travel",
  Savings = "Savings",
  Others = "Others",
}

export const addTransactionFormSchema = z.object({
  merchant: z.string().min(1, "Merchant name is required"),
  type: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: "Please select a valid type" }),
  }),
  category: z.nativeEnum(TransactionCategory, {
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

export const createGoalSchema = z.object({
  name: z.string().min(1, "Goal name is required"),
  category: z.nativeEnum(GoalsCategory, {
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
