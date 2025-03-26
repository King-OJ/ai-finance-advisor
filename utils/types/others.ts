export type SignUpFormType = {
  name: string;
  email: string;
  password: string;
};

export type SignInFormType = {
  email: string;
  password: string;
};

export type AddTransactionType = {
  type: string;
  category: string;
  merchant: string;
  amount: number;
  description?: string;
  userId?: string;
};

export type CreateGoalType = {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
};

export enum Category {
  Transfer = "Transfer",
  Home = "Home",
  Bill = "Bill",
  Vacation = "Vacation",
  Health = "Health & Fitness",
  Shopping = "Shopping",
  Entertainment = "Entertainment",
  Rent = "Rent",
  Income = "Income",
  Automotive = "Automotive",
  Loan = "Loan",
  Subscriptions = "Subscriptions",
  Transportation = "Transportation",
  Dining = "Dining",
  Groceries = "Groceries",
  Others = "Others",
}

export const CategoryEmojis: Record<Category, string> = {
  [Category.Groceries]: "🛒",
  [Category.Vacation]: "✈️",
  [Category.Bill]: "🔌",
  [Category.Dining]: "🍽️",
  [Category.Shopping]: "🛍️",
  [Category.Entertainment]: "🎬",
  [Category.Rent]: "🏠",
  [Category.Automotive]: "🚗",
  [Category.Subscriptions]: "🔁",
  [Category.Income]: "💵",
  [Category.Loan]: "🏦",
  [Category.Home]: "🏠",
  [Category.Transportation]: "🚌",
  [Category.Transfer]: "💸",
  [Category.Health]: "💊",
  [Category.Others]: "❓",
};
