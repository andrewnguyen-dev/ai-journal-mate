"use client"
 
import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "../utils/format-date"
import UserDeleteCell from "../students-data-table/user-delete-cell"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: formatDate
  },
  {
    accessorKey: "delete",
    header: "",
    cell: UserDeleteCell
  }
]