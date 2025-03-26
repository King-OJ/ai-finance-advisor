"use state";
import React from "react";
import { Category, CategoryEmojis } from "@/utils/types/others";

function CategoryEmoji({ category }: { category: Category }) {
  if (category == undefined) {
    return null;
  }
  return (
    <span className="border rounded-md h-9 px-3 py-2">
      {CategoryEmojis[category]}
    </span>
  );
}

export default CategoryEmoji;
