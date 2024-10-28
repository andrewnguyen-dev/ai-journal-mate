import { Column, Row } from "@tanstack/react-table";
import { Conversation, User } from "@prisma/client";

type FormatDateProps<TData> = {
  row: Row<TData>;
  column: Column<TData>;
};

export const formatDate = <TData extends Conversation | User>({
  row,
  column,
}: FormatDateProps<TData>) => {
  const value = row.getValue(column.id);
  // Ensure that 'value' is a string, number, or Date (avoid TS error)
  if (!value || !(typeof value === 'string' || typeof value === 'number' || value instanceof Date)) {
    return <span>-</span>;
  }
  
  const date = new Date(value);
  
  // Specify the locale and date format options 
  const formatted = date.toLocaleDateString('en-GB', { // 'en-GB' for DD/MM/YYYY
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  return <span>{formatted}</span>;
};
