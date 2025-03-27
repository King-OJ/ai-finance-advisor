import { Category, CategoryEmojis } from "../types/others";

export const formatDate = (date: Date) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return dateFormatter.format(new Date(date));
};
export const getEmojiForCategory = (category: Category) => {
  return CategoryEmojis[category];
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
