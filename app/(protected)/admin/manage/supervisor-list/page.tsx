import AddSupervisorForm from '@/components/form/add-supervisor-form';
import { columns } from '@/components/supervisors-data-table/columns';
import { SupervisorsDataTable } from '@/components/supervisors-data-table/supervisors-data-table'
import { getAllSupervisorsInSemester } from '@/data/supervisors';
import { currentSemesterId } from '@/lib/constants';
import React from 'react'

const SupervisorList = async () => {
  const supervisors = await getAllSupervisorsInSemester(currentSemesterId);

  if (!supervisors) {
    return <div className="w-full text-center">Failed to load supervisors data</div>;
  }

  return (
    <>
      <AddSupervisorForm />
      <SupervisorsDataTable columns={columns} data={supervisors} />
    </>
  )
}

export default SupervisorList