"use client";
import { Form } from "@/components/ui/form";
import {
  createBudgetSchema,
  CreateBudgetType,
} from "@/utils/formSchemas/budget";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  CustomDatePickerField,
  CustomFormInputField,
  CustomSelectField,
} from "./FormComponents";
import { Button } from "@/components/ui/button";
import CategoryEmoji from "./CategoryEmoji";
import { Budget, Category } from "@/utils/types/budget";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useCreateBudget,
  useDeleteBudget,
  useEditBudget,
} from "@/utils/hooks/budgets/useBudgetMutations";
import { useToast } from "@/hooks/use-toast";

interface CreateBudgetFormProps {
  closeDialogue?: () => void;
  budget?: Budget;
}

function CreateBudgetForm({ closeDialogue, budget }: CreateBudgetFormProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const form = useForm<CreateBudgetType>({
    resolver: zodResolver(createBudgetSchema),
    defaultValues: {
      name: budget?.name || "",
      description: budget?.description || "",
      targetAmount: budget?.targetAmount || undefined,
      currentAmount: budget?.currentAmount || undefined,
      startDate: budget?.startDate || undefined,
      endDate: budget?.endDate || undefined,
      category: budget?.category || undefined,
    },
  });
  const { toast } = useToast();
  const { mutate: createBudget, isPending: isCreatingBudget } =
    useCreateBudget();
  const { mutate: editBudget, isPending: isEditingBudget } = useEditBudget();
  const { mutate: deleteBudget, isPending: isDeletingBudget } =
    useDeleteBudget();

  const onCreate = (values: CreateBudgetType) => {
    const newBudget = {
      name: values.name,
      targetAmount: values.targetAmount,
      currentAmount: values.currentAmount,
      category: values.category.toString(),
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate),
      description: values.description ?? null,
    };

    createBudget(newBudget, {
      onSuccess: () => {
        form.reset();
        closeDialogue?.();

        toast({
          title: "New Budget Created!",
          className: "text-green",
        });
      },
      onError: (err) =>
        toast({
          title: "Error creating budget",
          description: err.message,
          variant: "destructive",
        }),
      onSettled: () => {},
    });
  };

  const onSave = (values: CreateBudgetType) => {
    const newBudget = {
      id: budget!.id,
      name: values.name,
      targetAmount: values.targetAmount,
      currentAmount: values.currentAmount,
      category: values.category.toString(),
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate),
      description: values.description ?? null,
    };

    editBudget(newBudget, {
      onSuccess: () => {
        form.reset();
        closeDialogue?.();

        toast({
          title: "Budget updated Succesfully!",
          className: "text-green",
        });
      },
      onError: (err) =>
        toast({
          title: "Error creating budget",
          description: err.message,
          variant: "destructive",
        }),
      onSettled: () => {},
    });
  };

  const handleDelete = () => {
    deleteBudget(budget!.id, {
      onSuccess: () => {
        toast({
          title: "Budget deleted successfully",
          variant: "default",
          className: "text-green",
        }); // Close the main dialog
      },
      onError: (error) => {
        toast({
          title: "Error deleting budget",
          description: error.message,
          variant: "destructive",
        });
      },
      onSettled: () => {
        setIsDeleteDialogOpen(false); // Close delete confirmation dialog
      },
    });
  };

  const selectedCategory = form.watch("category");

  return (
    <DialogContent className="border-none py-10">
      <DialogHeader className="mb-2">
        <DialogTitle>Create New Budget</DialogTitle>
        <DialogDescription>
          Enter your budget details here. Click {""}
          <span className="font-bold">Create</span> when you are done.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={
            budget ? form.handleSubmit(onSave) : form.handleSubmit(onCreate)
          }
        >
          <CustomFormInputField
            name="name"
            label="Budget Name"
            control={form.control}
            placeholder="e.g Dubai Vacation"
          />
          <CustomFormInputField
            name="description"
            label="Budget Description"
            control={form.control}
            placeholder="Describe the budget (Optional) "
          />
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <CustomSelectField
                name="category"
                label="budget category"
                control={form.control}
                placeholder="Select Category"
                values={Object.values(Category)}
              />
            </div>
            <CategoryEmoji category={selectedCategory} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomDatePickerField
              control={form.control}
              name="startDate"
              title="Budget starts by :"
              label="start date"
            />

            <CustomDatePickerField
              control={form.control}
              name="endDate"
              title="Budget will by due by :"
              label="end date"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomFormInputField
              label="Current Amount"
              name="currentAmount"
              control={form.control}
              type="number"
              placeholder="e.g $5000"
            />
            <CustomFormInputField
              label="Budget Target"
              name="targetAmount"
              control={form.control}
              type="number"
              placeholder="e.g $5000"
            />
          </div>

          {budget ? (
            <DialogFooter className="flex justify-between sm:justify-between">
              <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-none">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your budget and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeletingBudget}
                    >
                      {isDeletingBudget ? "Deleting" : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="mr-2"
                  onClick={closeDialogue}
                >
                  Cancel
                </Button>
                <Button disabled={isEditingBudget} type="submit">
                  {isEditingBudget ? "Saving" : "Save Changes"}
                </Button>
              </div>
            </DialogFooter>
          ) : (
            <Button
              type="submit"
              disabled={isCreatingBudget}
              className="font-bold w-full block max-w-sm mx-auto"
            >
              {isCreatingBudget ? "Creating..." : "Create"}
            </Button>
          )}
        </form>
      </Form>
    </DialogContent>
  );
}

export default CreateBudgetForm;
