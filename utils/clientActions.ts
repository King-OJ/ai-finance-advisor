export const formatDate = (date: Date) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return dateFormatter.format(new Date(date));
};
