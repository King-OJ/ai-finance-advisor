const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const demoBudgets = [
  {
    id: 1,
    name: "Monthly Expenses",
    description: "Regular monthly household expenses",
    targetAmount: 2500,
    currentAmount: 1800,
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    category: "Home",
  },
  {
    id: 2,
    name: "Vacation Fund",
    description: "Saving for summer vacation",
    targetAmount: 5000,
    currentAmount: 1200,
    startDate: "2025-01-01",
    endDate: "2025-07-31",
    category: "Vacation",
  },
  {
    id: 3,
    name: "Emergency Fund",
    description: "For unexpected expenses",
    targetAmount: 10000,
    currentAmount: 0,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    category: "Others",
  },
];

async function main() {
  for (const budget of demoBudgets) {
    const {
      name,
      category,
      description,
      endDate,
      startDate,
      currentAmount,
      targetAmount,
    } = budget;

    await prisma.budget.create({
      data: {
        name,
        description,
        category,
        currentAmount,
        targetAmount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        createdBy: 1,
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
