import { DiaryItem } from "@/components/diary/diary-item";
import { getConversationsByUserId } from "@/data/conversation";
import { getAllWeeks } from "@/data/week";
import { currentUser } from "@/lib/auth";

const Diary = async () => {
  const weeksData = await getAllWeeks();
  if (!weeksData) {
    return <div className="w-full text-center">Failed to load week data</div>;
  }
  
  const user = await currentUser();
  if (!user || !user.id) {
    return <div className="w-full text-center">Failed to load user data</div>;
  }

  const userConversations = await getConversationsByUserId(user.id);

  // Initialize gradeMap with null values for all weekIds (1 to 14)
  const gradeMap: { [weekId: string]: number | null } = {};
  for (let i = 1; i <= 14; i++) {
    gradeMap[i.toString()] = null;
  }

  // If userConversations is not null, update gradeMap with actual grades
  if (userConversations) {
    userConversations.forEach((conversation) => {
      gradeMap[conversation.weekId] = conversation.grade;
    });
  }

  // Map over weeksData and add the grade key
  const userWeeksData = weeksData.map((week) => ({
    ...week,
    grade: gradeMap[week.id] || null, // Add grade or null if not found
  }));

  return (
    <div className="space-y-6">
      <section id="header" className="flex justify-between">
        <h1>Diary</h1>
        <span>Total Grade: 5/100%</span>
      </section>
      <section className="space-y-4">
        {userWeeksData.map((week) => (
          <DiaryItem
            key={week.id}
            weekId={week.id}
            userId={user.id as string}
            title={week.title}
            description={week.description}
            grade={week.grade}
          />
        ))}
      </section>
    </div>
  );
};

export default Diary;
