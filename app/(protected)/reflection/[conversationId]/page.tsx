import {
  getConversationById,
  getConversationSummaries,
  getMessagesByConversationId,
} from "@/data/conversation";
import TopBar from "@/components/reflection/top-bar";
import MainChatSection from "@/components/chat/main-chat-section";
import { getQuestionsByWeekId } from "@/data/questions";

const reflectionWeekId = "99";

const Conversation = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversation = await getConversationById(params.conversationId);
  if (!conversation) {
    return (
      <div className="w-full text-center">Failed to load conversation data</div>
    );
  }

  const questions = await getQuestionsByWeekId(reflectionWeekId);
  if (!questions) {
    return <div className="w-full text-center">Failed to load questions</div>;
  }

  const draftMessages = await getMessagesByConversationId(
    params.conversationId,
  );

  const conversationSummaries = await getConversationSummaries();
  console.log("🚀 ~ conversationSummaries:", conversationSummaries)
  
  return (
    <>
      <TopBar />
      <MainChatSection
        conversationId={params.conversationId}
        isDiarySubmitted={!!conversation.submittedAt}
        questions={questions}
        draftMessages={draftMessages}
        type="REFLECTION_REPORT"
        conversationSummaries={conversationSummaries}
      />
    </>
  );
};

export default Conversation;
