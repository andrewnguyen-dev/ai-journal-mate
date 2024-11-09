"use client"
 
import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import ViewDiariesButton from "./view-diaries-btn"
import { formatDate } from "../utils/format-date"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"
import UserDeleteCell from "./user-delete-cell"

export const columnsWithViewBtn: ColumnDef<User>[] = [
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "viewDiaries",
    header: "Action",
    cell: ({ row }) => {
      const userId = row.original.id
      
      return <ViewDiariesButton userId={userId} />
    },
  },
]

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "semesterId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Semester ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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