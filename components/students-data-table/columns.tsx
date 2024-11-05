"use client"
 
import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import ViewDiariesButton from "./view-diaries-btn"
import { formatDate } from "../utils/format-date"

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
    header: "Semester ID",
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: formatDate
  }
]