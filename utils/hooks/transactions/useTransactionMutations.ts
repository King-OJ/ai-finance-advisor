import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTransactions = (closeDialog: () => void) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutationFn = (
    newTransaction: Omit<Transaction, "id" | "createdAt" | "createdBy">
  ) => {
    return fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(newTransaction),
    }).then((res) => res.json());
  };

  const onMutate = async (
    newTransaction: Omit<Transaction, "id" | "createdAt" | "createdBy">
  ) => {
    await queryClient.cancelQueries({ queryKey: ["transactions"] });
    const previousTransactions = queryClient.getQueryData<Transaction[]>([
      "transactions",
    ]);

    queryClient.setQueryData(
      ["transactions"],
      (old: Transaction[] | undefined) => [
        ...(old || []),
        { id: Date.now().toString(), ...newTransaction },
      ]
    );
    return { previousTransactions };
  };

  return useMutation({
    mutationFn,
    onMutate,
    onError: (err, _, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          ["transactions"],
          context.previousTransactions
        );
      }

      toast({
        title: "Error occured!",
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Transaction added!",
        className: "text-green",
      });
      closeDialog();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
