"use client";

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { getConversationIdByUserIdAndWeekIdAction } from '@/actions/conversation';
import { createConversationAction } from '@/actions/conversation';
import toast from 'react-hot-toast';

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
  const router = useRouter()

  const handleClick = async ({ userId, weekId }: { userId: string, weekId: string }) => {
    try {
      const conversationId = await getConversationIdByUserIdAndWeekIdAction(userId, weekId);
      if (conversationId) {
        router.push(`/diary/${conversationId}`);
      } else {
        const newConversation = await createConversationAction(userId, weekId);
        if (!newConversation) {
          toast.error("Failed to create conversation");
          return null;
        }
        router.push(`/diary/${newConversation.id}`);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };
  
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
