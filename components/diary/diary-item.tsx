"use client";

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { handleOpenConversation } from '@/lib/utils';

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
    const path = await handleOpenConversation({ userId, weekId, type: 'DIARY' });
    if (path) {
      router.push(path);
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
