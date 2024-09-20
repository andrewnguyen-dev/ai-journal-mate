import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from 'react-hot-toast';
import { getConversationIdByUserIdAndWeekIdAction, createConversationAction } from '@/actions/conversation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUsernameFromEmail = (email: string) => {
  const [username] = email.split("@");
  return username;
};

export const generateRandomId = (length = 7) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export const handleOpenConversation = async ({ userId, weekId, type }: { userId: string, weekId: string, type: 'DIARY' | 'REFLECTION_REPORT'}) => {
  try {
    const typeUrl = type === 'DIARY' ? 'diary' : 'reflection';

    const conversationId = await getConversationIdByUserIdAndWeekIdAction(userId, weekId, type);

    if (conversationId) {
      return `/${typeUrl}/${conversationId}`;
    } else {
      const newConversation = await createConversationAction(userId, weekId, type);
      if (!newConversation) {
        toast.error("Failed to create conversation");
        return null;
      }
      return `/${typeUrl}/${newConversation.id}`;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};