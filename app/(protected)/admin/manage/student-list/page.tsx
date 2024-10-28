import UploadCSVButton from '@/components/buttons/upload-csv-button';
import { columns } from '@/components/students-data-table/columns';
import { StudentsDataTable } from '@/components/students-data-table/students-data-table';
import { getAllStudentsInSemester } from '@/data/students';
import { currentSemesterId } from '@/lib/constants';
import React from 'react'

const StudentList = async () => {
  const students = await getAllStudentsInSemester(currentSemesterId);

  if (!students) {
    return <div className="w-full text-center">Failed to load students data</div>;
  }

  return (
    <>
      <div className='bg-white w-full px-4 py-3 rounded border'>
        <UploadCSVButton />
      </div>
      <StudentsDataTable columns={columns} data={students} />
    </>
  )
}

export default StudentList