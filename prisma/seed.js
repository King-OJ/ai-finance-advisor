const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("bcrypt");

const generateTransactions = () => {
  const transactions = [];
  const categories = [
    "Groceries",
    "Utilities",
    "Subscriptions",
    "Dining",
    "Transportation",
    "Medicals",
    "Investments",
    "Vacation",
  ];
  const merchants = [
    "Whole Foods",
    "Safeway",
    "PG&E",
    "Water Company",
    "Netflix",
    "Spotify",
    "Amazon Prime",
    "Uber",
    "Lyft",
    "Chevron",
    "Target",
    "Walmart",
    "CVS",
    "Walgreens",
    "Starbucks",
    "Local Restaurant",
    "Gym Membership",
    "Internet Provider",
    "Phone Company",
  ];

  // Generate 20 transactions
  for (let i = 1; i <= 20; i++) {
    const date = new Date(2025, 3, Math.floor(Math.random() * 30) + 1);
    const amount = Math.floor(Math.random() * 150) + 10;
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const merchantIndex = Math.floor(Math.random() * merchants.length);

    transactions.push({
      date: date,
      amount: amount,
      merchant: merchants[merchantIndex],
      category: categories[categoryIndex],
      status: Math.random() > 0.05 ? false : true,
      createdBy: 1,
    });
  }

  return transactions.sort((a, b) => b.date - a.date);
};

const demoBudgets = [
  {
    name: "Monthly Expenses",
    description: "Regular monthly household expenses",
    amount: 2500,
    spent: 1800,
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    category: "Home",
    transactions: generateTransactions(),
  },
  {
    name: "Vacation Fund",
    description: "Saving for summer vacation",
    amount: 5000,
    spent: 1200,
    startDate: "2025-01-01",
    endDate: "2025-07-31",
    category: "Vacation",
    transactions: generateTransactions(),
  },
  {
    name: "Emergency Fund",
    description: "For unexpected expenses",
    amount: 10000,
    spent: 0,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    category: "Others",
    transactions: generateTransactions(),
  },
];

async function main() {
  // Clear existing data to avoid unique constraint violations
  await prisma.transaction.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.user.deleteMany();
  const hashedPassword = await hash("123456", 10);
  await prisma.user.create({
    data: {
      id: 1,
      password: hashedPassword,
      email: "test@example.com",
      name: "Seed User",
      role: "user",
    },
  });

  for (const budget of demoBudgets) {
    const {
      name,
      category,
      description,
      endDate,
      startDate,
      spent,
      amount,
      transactions,
    } = budget;

    await prisma.budget.create({
      data: {
        name,
        description,
        category,
        spent,
        amount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        createdBy: 1,
        transactions: {
          create: transactions.map((txn) => ({
            date: txn.date,
            category: txn.category,
            amount: txn.amount,
            merchant: txn.merchant,
            status: txn.status,
            createdBy: txn.createdBy,
          })),
        },
      },
    });
  }
}

main()
  .then(() => {
    console.log("Budgets seeded successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding budgets:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
