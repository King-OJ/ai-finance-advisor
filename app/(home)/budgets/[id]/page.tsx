import BudgetDetailPage from "@/app/_components/BudgetDetailPage";

const BudgetDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <BudgetDetailPage id={Number(id)} />;
};

export default BudgetDetailsPage;
