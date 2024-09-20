'use client'

import { Button } from "@/components/ui/button";
import { handleOpenConversation } from "@/lib/utils";

import { useRouter } from 'next/navigation'

const ReflectionItem = ({ weekId, userId }: { weekId: string, userId: string }) => {
  const router = useRouter()

  const handleClick = async ({ userId, weekId }: { userId: string, weekId: string }) => {
    const path = await handleOpenConversation({ userId, weekId, type: 'REFLECTION_REPORT' });
    if (path) {
      router.push(path);
    }
  };

  return (
    <Button onClick={() => handleClick({ userId, weekId })}>My Reflection</Button>
  )
}

export default ReflectionItem