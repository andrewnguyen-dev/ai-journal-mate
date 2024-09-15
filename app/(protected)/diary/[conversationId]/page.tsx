
import { getConversationById, getMessagesByConversationId } from "@/data/conversation";
import { getAllWeeks } from "@/data/week";
import TopBar from "@/components/diary/top-bar";
import MainChatSection from "@/components/diary/main-chat-section";
import { getQuestionsByWeekId } from "@/data/questions";

const Conversation = async ({ params }: { params: { conversationId: string }; }) => {
  const conversation = await getConversationById(params.conversationId);
  if (!conversation) {
    return <div className="w-full text-center">Failed to load conversation data</div>;
  }

  const weeksData = await getAllWeeks();
  if (!weeksData) {
    return <div className="w-full text-center">Failed to load week data</div>;
  }

  const conversationWeek = weeksData.find((week) => week.id === conversation.weekId);
  if (!conversationWeek) {
    return <div className="w-full text-center">Failed to find conversation week</div>;
  }

  const questions = await getQuestionsByWeekId(conversationWeek.id);
  if (!questions) {
    return <div className="w-full text-center">Failed to load questions</div>;
  }

  const draftMessages = await getMessagesByConversationId(params.conversationId);
  console.log("🚀 ~ Conversation ~ draftMessages:", draftMessages)

  return (
    <>
      <TopBar conversationWeek={conversationWeek} />
      <MainChatSection conversationId={params.conversationId} questions={questions} draftMessages={draftMessages} />  
    </>
  );
};

export default Conversation;
