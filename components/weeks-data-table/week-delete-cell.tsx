import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { Row, Table } from '@tanstack/react-table'
import { Week } from '@prisma/client'
import { Button } from '../ui/button'
import { deleteWeekAction } from '@/actions/week'
import { useRouter } from "next/navigation";

type WeekDeleteCellProps<TData> = {
  row: Row<TData>
  table: Table<TData>
}

const WeekDeleteCell = <TData extends Week>({
  row,
  table
}: WeekDeleteCellProps<TData>) => {
  const router = useRouter();
  const handleDelete = async () => {
    // Update the data state in the table
    table.options.meta?.deleteRow(row.index)

    const deletePromise = deleteWeekAction(row.original.id)

    toast.promise(
      deletePromise,
      {
        loading: 'Deleting...',
        success: () => {
          router.refresh();
          return 'Deleted!';
        },
        error: 'Failed to delete'
      },
      { style: { padding: '6px 18px' } }
    )

    await deletePromise
  }

  return (
    <Button variant='ghost' size='sm'>
      <Trash2
        onClick={handleDelete}
        size={16}
        className='text-slate-500 dark:text-slate-400'
      />
    </Button>
  )
}

export default WeekDeleteCell
