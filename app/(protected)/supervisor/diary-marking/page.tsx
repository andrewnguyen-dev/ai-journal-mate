import { RoleGate } from '@/components/auth/role-gate'
import React from 'react'

const DiaryMarking = () => {
  return (
    <RoleGate allowedRole="SUPERVISOR">
      <div>Diary Marking Page</div>
    </RoleGate>
  )
}

export default DiaryMarking