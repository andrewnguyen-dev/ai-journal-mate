import { RoleGate } from '@/components/auth/role-gate'
import { columnsWithViewBtn } from '@/components/students-data-table/columns';
import { StudentsDataTable } from '@/components/students-data-table/students-data-table';
import { getAllStudentsInSemester } from '@/data/students';
import { currentSemesterId } from '@/lib/constants';
import React from 'react'

const DiaryMarking = async () => {
  const students = await getAllStudentsInSemester(currentSemesterId);

  if (!students) {
    return <div className="w-full text-center">Failed to load students data</div>;
  }

  return (
    <RoleGate allowedRole="SUPERVISOR">
      <p className='text-sm text-gray-600'>Current Semester: {currentSemesterId}</p>
      <StudentsDataTable columns={columnsWithViewBtn} data={students} withViewBtn={true} />
    </RoleGate>
  )
}

export default DiaryMarking