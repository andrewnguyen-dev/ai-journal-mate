"use client"
 
import { Week } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "../utils/format-date"

export const columns: ColumnDef<Week>[] = [
  {
    accessorKey: "id",
    header: "Week ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "fromDate",
    header: "From Date",
    cell: formatDate
  },
  {
    accessorKey: "toDate",
    header: "To Date",
    cell: formatDate
  }
]