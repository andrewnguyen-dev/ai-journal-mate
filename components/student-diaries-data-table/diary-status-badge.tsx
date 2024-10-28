import { useCurrentWeek } from '@/hooks/use-current-week';
import React from 'react'

const DiaryStatusBadge = ({
  weekId,
  submittedAt,
  markedDate
}: {
  weekId: string,
  submittedAt: Date | null,
  markedDate: Date | null
}) => {
  let status;

  const currentWeek = useCurrentWeek();
  if (!currentWeek) return null;

  if (!submittedAt || parseInt(weekId) > parseInt(currentWeek?.id)) {
    return <span className="text-xs bg-gray-300 text-gray-600 px-3 py-1 rounded-full">Not Submitted</span>
  }
  if (!!submittedAt && !markedDate) {
    return <span className="text-xs bg-red-500 text-red-50 px-3 py-1 rounded-full">Submitted - Need to be Graded</span>
  }
  if (!!submittedAt && !!markedDate) {
    return <span className="text-xs bg-green-500 text-green-50 px-3 py-1 rounded-full">Graded</span>
  }

  return (
    <div>Error</div>
  )
}

export default DiaryStatusBadge