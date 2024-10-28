import { Message } from "@prisma/client";
import { useMemo } from "react";
import ChatMessages from "../chat/chat-messages";
import MarkingForm from "../form/marking-form";
import { get } from "http";
import {
  getConversationById,
  getUserIdByConversationId,
} from "@/data/conversation";
import { getStudentIdByUserId } from "@/data/user";
import Link from "next/link";

interface DiarySupervisorMarkingProps {
  conversationId: string;
  conversationMessages: Message[];
  summary: string | null;
}

const DiarySupervisorMarking = async ({
  conversationId,
  conversationMessages,
  summary,
}: DiarySupervisorMarkingProps) => {
  // Transform draft messages to the format expected by the chat, memoized for performance
  const transformedMessages = useMemo(() => {
    if (!conversationMessages || conversationMessages.length === 0) return [];

    return conversationMessages.map((message) => ({
      id: message.id,
      content: message.messageText,
      role: message.sender,
      createdAt: message.createdAt,
    }));
  }, [conversationMessages]);

  const conversation = await getConversationById(conversationId);
  if (!conversation) {
    return <div>Failed to load conversation</div>;
  }

  const userId = await getUserIdByConversationId(conversationId);
  if (!userId) {
    return <div>Failed to load userId</div>;
  }

  const studentId = await getStudentIdByUserId(userId);
  if (!studentId) {
    return <div>Failed to load studentId</div>;
  }

  return (
    <main className="grid grid-cols-6 space-x-4">
      {/* Main chat section */}
      <section className="order-2 col-span-6 pt-6 sm:order-1 sm:col-span-4">
        <p className="mb-4 text-sm text-gray-600">
          <Link href={`/supervisor/marking`} className="underline hover:no-underline">Marking</Link>
          <span> / </span>
          <Link href={`/supervisor/marking/${userId}`} className="underline hover:no-underline">{studentId}</Link>
          <span> / </span>
          <span>Week {conversation.weekId}</span>
        </p>
        <div className="rounded-sm border border-gray-200 bg-white p-3">
          <div className="stretch relative mx-auto flex h-[75vh] w-full max-w-2xl flex-col">
            {/* Render chat messages */}
            <ChatMessages messages={transformedMessages} />
          </div>
        </div>
      </section>
      {/* Sidebar section */}
      <aside className="order-1 col-span-6 flex flex-col justify-between pt-6 sm:order-2 sm:col-span-2">
        {/* Summary */}
        <div className="rounded-sm border border-gray-200 bg-white p-5">
          <p className="font-medium text-gray-700">Diary Summary</p>
          <p className="text-sm text-gray-500">{summary}</p>
        </div>
        {/* Form for Supervisor */}
        <MarkingForm
          conversationId={conversationId}
          feedback={conversation.feedback}
          grade={conversation.grade}
        />
      </aside>
    </main>
  );
};

export default DiarySupervisorMarking;
