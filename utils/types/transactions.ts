import { Category } from "./others";

export enum Type {
  credit = "credit",
  debit = "debit",
}

export enum Status {
  completed = "completed",
  pending = "pending",
  failed = "failed",
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  category: Category;
  type: Type;
  accountId: string;
  merchant?: string;
  status: Status;
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  category?: Category;
  type?: Type;
  status?: Status;
  searchQuery?: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date("2025-03-01"),
    amount: 150.75,
    description: "Grocery shopping",
    category: Category.Groceries,
    type: Type.debit,
    accountId: "acc123",
    status: Status.completed,
    merchant: "SuperMart",
  },
  {
    id: "2",
    date: new Date("2025-03-02"),
    amount: 250.0,
    description: "Salary payment",
    category: Category.Income,
    type: Type.credit,
    accountId: "acc123",
    status: Status.completed,
  },
  {
    id: "3",
    date: new Date("2025-03-02"),
    amount: 40.5,
    description: "Coffee at cafe",
    category: Category.Dining,
    type: Type.debit,
    accountId: "acc124",
    status: Status.completed,
    merchant: "Brewed Delight",
  },
  {
    id: "4",
    date: new Date("2025-03-03"),
    amount: 300.0,
    description: "Transfer from savings",
    category: Category.Transfer,
    type: Type.credit,
    accountId: "acc125",
    status: Status.completed,
  },
  {
    id: "5",
    date: new Date("2025-03-04"),
    amount: 125.0,
    description: "Utility bill payment",
    category: Category.Bill,
    type: Type.debit,
    accountId: "acc123",
    status: Status.pending,
  },
  {
    id: "6",
    date: new Date("2025-03-05"),
    amount: 60.0,
    description: "Fuel refill",
    category: Category.Automotive,
    type: Type.debit,
    accountId: "acc126",
    status: Status.completed,
    merchant: "Fuel Express",
  },
  {
    id: "7",
    date: new Date("2025-03-06"),
    amount: 200.0,
    description: "Freelance project payment",
    category: Category.Income,
    type: Type.credit,
    accountId: "acc127",
    status: Status.completed,
  },
  {
    id: "8",
    date: new Date("2025-03-07"),
    amount: 15.99,
    description: "Magazine subscription",
    category: Category.Subscriptions,
    type: Type.debit,
    accountId: "acc128",
    status: Status.completed,
    merchant: "Mag World",
  },
  {
    id: "9",
    date: new Date("2025-03-08"),
    amount: 500.0,
    description: "Home improvement",
    category: Category.Home,
    type: Type.debit,
    accountId: "acc129",
    status: Status.completed,
    merchant: "Home Depot",
  },
  {
    id: "10",
    date: new Date("2025-03-09"),
    amount: 75.5,
    description: "Dinner with friends",
    category: Category.Dining,
    type: Type.debit,
    accountId: "acc130",
    status: Status.completed,
    merchant: "The Bistro",
  },
  {
    id: "11",
    date: new Date("2025-03-10"),
    amount: 90.0,
    description: "New shoes",
    category: Category.Shopping,
    type: Type.debit,
    accountId: "acc131",
    status: Status.completed,
    merchant: "Shoe Shop",
  },
  {
    id: "12",
    date: new Date("2025-03-11"),
    amount: 180.0,
    description: "Car repair",
    category: Category.Automotive,
    type: Type.debit,
    accountId: "acc132",
    status: Status.completed,
    merchant: "CarFix Garage",
  },
  {
    id: "13",
    date: new Date("2025-03-12"),
    amount: 1000.0,
    description: "Loan repayment",
    category: Category.Loan,
    type: Type.debit,
    accountId: "acc133",
    status: Status.pending,
  },
  {
    id: "14",
    date: new Date("2025-03-13"),
    amount: 1200.0,
    description: "Freelance project payment",
    category: Category.Income,
    type: Type.credit,
    accountId: "acc134",
    status: Status.completed,
  },
  {
    id: "15",
    date: new Date("2025-03-14"),
    amount: 45.75,
    description: "Book purchase",
    category: Category.Shopping,
    type: Type.debit,
    accountId: "acc135",
    status: Status.completed,
    merchant: "Bookstore",
  },
  {
    id: "16",
    date: new Date("2025-03-15"),
    amount: 200.0,
    description: "Payment for project",
    category: Category.Income,
    type: Type.credit,
    accountId: "acc136",
    status: Status.completed,
  },
  {
    id: "17",
    date: new Date("2025-03-16"),
    amount: 50.0,
    description: "Concert tickets",
    category: Category.Entertainment,
    type: Type.debit,
    accountId: "acc137",
    status: Status.completed,
    merchant: "LiveNation",
  },
  {
    id: "18",
    date: new Date("2025-03-17"),
    amount: 600.0,
    description: "Rent payment",
    category: Category.Rent,
    type: Type.debit,
    accountId: "acc138",
    status: Status.completed,
  },
  {
    id: "19",
    date: new Date("2025-03-18"),
    amount: 80.0,
    description: "Gym membership",
    category: Category.Health,
    type: Type.debit,
    accountId: "acc139",
    status: Status.completed,
    merchant: "Fitness World",
  },
  {
    id: "20",
    date: new Date("2025-03-19"),
    amount: 600.0,
    description: "Bonus payment",
    category: Category.Income,
    type: Type.credit,
    accountId: "acc140",
    status: Status.completed,
  },
];
