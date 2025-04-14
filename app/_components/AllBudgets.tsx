"use client";
import { Button } from "@/components/ui/button";

import { FormLabel } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { initialBudgets } from "@/utils/mockData/budget";
import { Delete } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import BudgetItem from "./BudgetItem";
import { Budget } from "@/utils/types/budget";
import { CustomFormInputField } from "./FormComponents";

function AllBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: 0,
    spent: 0,
    startDate: "",
    endDate: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Handle card click to open dialog with selected budget data

  // Close dialog and reset form

  // Update form data as user types
  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]:
  //         name === "amount" || name === "spent" ? parseFloat(value) || 0 : value,
  //     });

  //     // Clear error for this field when user starts typing
  //     if (formErrors[name]) {
  //       setFormErrors({
  //         ...formErrors,
  //         [name]: null,
  //       });
  //     }
  //   };

  // Validate form fields
  //   const validateForm = () => {
  //     const errors = {};

  //     if (!formData.name.trim()) errors.name = "Budget name is required";
  //     if (formData.amount <= 0)
  //       errors.amount = "Amount must be greater than zero";
  //     if (formData.spent < 0) errors.spent = "Spent amount cannot be negative";
  //     if (!formData.startDate) errors.startDate = "Start date is required";
  //     if (!formData.endDate) errors.endDate = "End date is required";
  //     if (formData.startDate > formData.endDate)
  //       errors.endDate = "End date must be after start date";

  //     setFormErrors(errors);
  //     return Object.keys(errors).length === 0;
  //   };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {budgets.map((budget) => (
        <BudgetItem budget={budget} key={budget.id} />
      ))}
    </div>
  );
}

export default AllBudgets;
