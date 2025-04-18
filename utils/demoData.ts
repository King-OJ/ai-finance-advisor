import { Budget } from "./types/budget";

export const demoData = {
  user: {
    id: "demo-user",
    name: "Alex Demo",
    email: "demo@example.com",
    plan: "free",
    joinedDate: "2025-01-15",
    preferences: {
      currency: "USD",
      theme: "light",
      notifications: true,
    },
  },
  summary: {
    totalBalance: 42580.65,
    income: 5240.8,
    expenses: 3890.45,
    savingsRate: 25.8,
  },
  transactions: [
    {
      id: "tr-0",
      type: "expense",
      category: "Utilities",
      amount: 16.2,
      date: new Date("2025-02-25"),
      merchant: "DSTV",
    },
    {
      id: "tr-1",
      type: "expense",
      category: "Groceries",
      amount: 89.45,
      date: new Date("2025-02-25"),
      merchant: "Whole Foods",
    },
    {
      id: "tr-2",
      type: "expense",
      category: "Dining",
      amount: 42.8,
      date: new Date("2025-02-24"),
      merchant: "Chipotle",
    },
    {
      id: "tr-3",
      type: "income",
      category: "Salary",
      amount: 2450.0,
      date: new Date("2025-02-20"),
      merchant: "Employer Inc.",
    },
    {
      id: "tr-4",
      type: "expense",
      category: "Transportation",
      amount: 35.0,
      date: new Date("2025-02-19"),
      merchant: "Uber",
    },
    {
      id: "tr-5",
      type: "expense",
      category: "Entertainment",
      amount: 15.99,
      date: new Date("2025-02-18"),
      merchant: "Netflix",
    },
    {
      id: "tr-6",
      type: "expense",
      category: "Utilities",
      amount: 85.75,
      date: new Date("2025-02-15"),
      merchant: "Electric Company",
    },
    {
      id: "tr-7",
      type: "expense",
      category: "Housing",
      amount: 1500.0,
      date: new Date("2025-02-01"),
      merchant: "Rent",
    },
    {
      id: "tr-8",
      type: "income",
      category: "Dividends",
      amount: 120.5,
      date: new Date("2025-02-10"),
      merchant: "Investment Inc.",
    },
    {
      id: "tr-9",
      type: "expense",
      category: "Shopping",
      amount: 67.99,
      date: new Date("2025-02-12"),
      merchant: "Amazon",
    },
    {
      id: "tr-10",
      type: "expense",
      category: "Health",
      amount: 25.0,
      date: new Date("2025-02-05"),
      merchant: "Pharmacy",
    },
  ],
  goals: [
    {
      id: "goal-1",
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      deadline: "2025-05-01",
      category: "Saving",
      monthlyContribution: 500,
    },
    {
      id: "goal-2",
      name: "Vacation",
      target: 3000,
      current: 1500,
      deadline: "2025-06-15",
      category: "Travel",
      monthlyContribution: 300,
    },
    {
      id: "goal-3",
      name: "New Laptop",
      target: 2000,
      current: 800,
      deadline: "2025-08-01",
      category: "Purchase",
      monthlyContribution: 200,
    },
    {
      id: "goal-4",
      name: "School Fees",
      target: 5000,
      current: 3200,
      deadline: "2025-04-15",
      category: "Purchase",
      monthlyContribution: 500,
    },
  ],
  portfolio: {
    totalValue: 312590.45,
    performance: {
      "1W": [
        { date: "02/19", value: 305000 },
        { date: "02/20", value: 307000 },
        { date: "02/21", value: 304500 },
        { date: "02/22", value: 309000 },
        { date: "02/23", value: 310000 },
        { date: "02/24", value: 311500 },
        { date: "02/25", value: 312590.45 },
      ],
      "1M": [
        { date: "01/26", value: 298000 },
        { date: "01/31", value: 301000 },
        { date: "02/05", value: 303500 },
        { date: "02/10", value: 305000 },
        { date: "02/15", value: 308000 },
        { date: "02/20", value: 307000 },
        { date: "02/25", value: 312590.45 },
      ],
      "3M": [
        { date: "Nov", value: 280000 },
        { date: "Dec", value: 289000 },
        { date: "Jan", value: 295000 },
        { date: "Feb", value: 312590.45 },
      ],
      "1Y": [
        { date: "Mar", value: 250000 },
        { date: "May", value: 260000 },
        { date: "Jul", value: 275000 },
        { date: "Sep", value: 280000 },
        { date: "Nov", value: 290000 },
        { date: "Jan", value: 300000 },
        { date: "Feb", value: 312590.45 },
      ],
    },
    allocation: [
      { name: "Stocks", value: 65 },
      { name: "Bonds", value: 20 },
      { name: "Real Estate", value: 10 },
      { name: "Cash", value: 5 },
    ],
    assets: [
      {
        id: "asset-1",
        name: "S&P 500 ETF",
        type: "Stock",
        value: 125000,
        growth: 8.5,
      },
      {
        id: "asset-2",
        name: "Tech Fund",
        type: "Stock",
        value: 78000,
        growth: 12.3,
      },
      {
        id: "asset-3",
        name: "Treasury Bonds",
        type: "Bond",
        value: 62500,
        growth: 3.2,
      },
      {
        id: "asset-4",
        name: "Real Estate Trust",
        type: "Real Estate",
        value: 31250,
        growth: 5.8,
      },
      {
        id: "asset-5",
        name: "Savings Account",
        type: "Cash",
        value: 15840.45,
        growth: 0.8,
      },
    ],
  },
  insights: [
    {
      id: "insight-1",
      type: "positive",
      title: "Spending Reduction",
      description:
        "Your dining expenses decreased by 15% compared to last month.",
      actionable:
        "Keep it up! This could save you approximately $120 per month.",
    },
    {
      id: "insight-2",
      type: "alert",
      title: "Subscription Alert",
      description:
        "You have 3 streaming subscriptions totaling $35.97 monthly.",
      actionable: "Consider consolidating to save $10-15 monthly.",
    },
    {
      id: "insight-3",
      type: "opportunity",
      title: "Investment Opportunity",
      description:
        "Your savings account has over $5,000 earning minimal interest.",
      actionable:
        "Moving to a high-yield account could earn you an additional $150 annually.",
    },
    {
      id: "insight-4",
      type: "positive",
      title: "Savings Goal Progress",
      description: "You're ahead of schedule on your Emergency Fund goal.",
      actionable: "At this rate, you'll reach your goal 1 month early.",
    },
  ],
  categories: [
    { id: "cat-1", name: "Housing", color: "#FF8042", budget: 1600 },
    { id: "cat-2", name: "Food", color: "#00C49F", budget: 600 },
    { id: "cat-3", name: "Transportation", color: "#0088FE", budget: 300 },
    { id: "cat-4", name: "Entertainment", color: "#FFBB28", budget: 200 },
    { id: "cat-5", name: "Utilities", color: "#A569BD", budget: 250 },
    { id: "cat-6", name: "Health", color: "#5DADE2", budget: 150 },
  ],
  monthlySpending: [
    { month: "Sep", amount: 3650 },
    { month: "Oct", amount: 3820 },
    { month: "Nov", amount: 3950 },
    { month: "Dec", amount: 4200 },
    { month: "Jan", amount: 3700 },
    { month: "Feb", amount: 3890 },
  ],
};

export type SummaryDataType = {
  totalBalance: number;
  income: number;
  expenses: number;
  savingsRate: number;
};

export type TransactionType = {
  id: string;
  type: string;
  category: string;
  amount: number;
  date: Date;
  merchant: string;
};

export type CategoryType = {
  id: string;
  name: string;
  color: string;
  budget: number;
};

export type MonthlySpendingType = { month: string; amount: number };

export type DemoDataType = {
  summary: SummaryDataType;
  transactions: TransactionType[];
  budget: Budget[];
  portfolio: PortfolioType;
  insights: InsightType[];
  categories: CategoryType[];
  monthlySpending: MonthlySpendingType[];
};

export type AllocationType = {
  name: string;
  value: number;
};

export type AssetType = {
  id: string;
  name: string;
  type: string;
  value: number;
  growth: number;
};

export type PerformanceEntry = {
  date: string;
  value: number;
};

export type PerformanceType = {
  [timeRange: string]: PerformanceEntry[];
};

export type PortfolioType = {
  totalValue: number;
  assets: AssetType[];
  allocation: AllocationType[];
  performance: PerformanceType;
};

export type InsightType = {
  id: string;
  type: string;
  title: string;
  description: string;
  actionable: string;
};
