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
