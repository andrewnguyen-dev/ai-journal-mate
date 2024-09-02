"use client";

import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { createConversation, getConversationIdByUserIdAndWeekId } from '@/data/conversation';
import { getConversationIdByUserIdAndWeekIdAction } from '@/actions/get-conversation-id';

const handleClick = async ({ userId, weekId }: { userId: string, weekId: string }) => {
  try {
    const conversationId = await getConversationIdByUserIdAndWeekIdAction(userId, weekId);
    if (conversationId) {
      console.log("🚀 ~ handleClick ~ conversationId:", conversationId);
      redirect(`/diary/${conversationId}`); // 🔴 Error here
      return;
    }
  } catch (error) {
    console.error(error);
    return;
  }

  // const conversationId = await getConversationIdByUserIdAndWeekId(userId, weekId);
  // if (conversationId) {
  //   redirect(`/diary/${conversationId}`);
  // } else {
  //   const newConversation = await createConversation(userId, weekId);
  //   if (!newConversation) {
  //     throw new Error("Failed to create conversation");
  //   }
  //   redirect(`/diary/${newConversation.id}`);
  // }
};

export const DiaryItem = ({
  weekId,
  userId,
  title,
  description,
  grade,
}: {
  weekId: string;
  userId: string;
  title: string;
  description: string;
  grade: number | null;
}) => {
  return (
    <div className="flex flex-row justify-between items-center rounded-lg bg-white p-3 transition-all hover:shadow-sm">
      <p className="text-slate-800">
        {title}: {description}
      </p>
      <div className="flex items-center space-x-4">
        {grade && <p className="text-slate-800">Grade: {grade}</p>}
        <Button onClick={() => handleClick({ userId, weekId })} size="icon" className="h-8 w-8">
          {grade ? <Check size={18} /> : <Plus size={18} />}
        </Button>
      </div>
    </div>
  );
};
