import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { Row, Table } from '@tanstack/react-table'
import { User } from '@prisma/client'
import { Button } from '../ui/button'
import { useRouter } from "next/navigation";
import { deleteUserAction } from '@/actions/user'

type UserDeleteCellProps<TData> = {
  row: Row<TData>
  table: Table<TData>
}

const UserDeleteCell = <TData extends User>({
  row,
  table
}: UserDeleteCellProps<TData>) => {
  const router = useRouter();
  const handleDelete = async () => {
    // Update the data state in the table
    table.options.meta?.deleteRow(row.index)

    const deletePromise = deleteUserAction(row.original.id)

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

export default UserDeleteCell
