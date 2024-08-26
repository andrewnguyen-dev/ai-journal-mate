import { RoleGate } from '@/components/auth/role-gate'
import React from 'react'

const page = () => {
  return (
    <RoleGate allowedRole="ADMIN">
      <div>Admin Page</div>
    </RoleGate>
  )
}

export default page