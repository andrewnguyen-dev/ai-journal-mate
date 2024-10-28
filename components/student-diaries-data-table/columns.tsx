"use client";

import { Conversation } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DiaryStatusBadge from "./diary-status-badge";
import { formatDate } from "../utils/format-date";
import ViewStudentDiaryButton from "./view-student-diary-btn";

export const columns: ColumnDef<Conversation>[] = [
  {
    accessorKey: "weekId",
    header: "Week",
    cell: ({ row }) => {
      return row.getValue("weekId") === "99" ? 'Reflection' : row.getValue("weekId");
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const weekId = row.original.weekId;
      const submittedAt = row.original.submittedAt;
      const markedDate = row.original.markedDate;
      return (
        <DiaryStatusBadge
          weekId={weekId}
          submittedAt={submittedAt}
          markedDate={markedDate}
        />
      );
    },
  },
  {
    accessorKey: "markedDate",
    header: "Marked Date",
    cell: formatDate,
  },
  {
    accessorKey: "grade",
    header: "Grade"
  },
  {
    accessorKey: "viewStudentDiary",
    header: "Action",
    cell: ({ row }) => {
      const userId = row.original.userId;
      const conversationId = row.original.id;
      return <ViewStudentDiaryButton userId={userId} conversationId={conversationId} />
    },
  },
];
