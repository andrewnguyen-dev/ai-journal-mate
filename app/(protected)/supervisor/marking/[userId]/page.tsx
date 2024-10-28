import { columns } from '@/components/student-diaries-data-table/columns';
import { StudentDiariesDataTable } from '@/components/student-diaries-data-table/student-diaries-data-table';
import { getDiariesAndReflectionByUserId } from '@/data/conversation';

const StudentDiaryList = async ({
  params
}: {
  params: { userId: string }
}) => {
  const userId = params.userId;
  const userConversations = await getDiariesAndReflectionByUserId(userId);
  if (!userConversations) {
    return <div className="w-full text-center">Failed to load diaries</div>;
  }

  // Calculate total grade, excluding conversations with weekId === '99'
  const totalGrade = userConversations
    .filter(conversation => conversation.weekId !== '99' && conversation.grade !== null)
    .reduce((sum, conversation) => sum + (conversation.grade ?? 0), 0);
  
  return (
    <div>
      <p className='float-right'>Total Grade: {totalGrade}/??</p>
      <StudentDiariesDataTable columns={columns} data={userConversations} />
    </div>
  )
}

export default StudentDiaryList