import DiarySupervisorMarking from "@/components/diary/diary-supervisor-marking";
import { getConversationById, getMessagesByConversationId } from "@/data/conversation";

const ConversationMarking = async ({
  params,
}: {
  params: { userId: string; conversationId: string };
}) => {
  const conversation = await getConversationById(params.conversationId);
  if (!conversation) {
    return (
      <div className="w-full text-center">Failed to load conversation data</div>
    );
  }

  const conversationMessages = await getMessagesByConversationId(
    params.conversationId,
  );
  if (!conversationMessages) {
    return <div className="w-full text-center">Failed to load messages</div>;
  }

  return (
    <>
      <DiarySupervisorMarking
        conversationId={params.conversationId}
        conversationMessages={conversationMessages}
        summary={conversation.summary}
      />
    </>
  );
};

export default ConversationMarking;
