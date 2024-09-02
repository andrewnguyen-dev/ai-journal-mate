'use server'

import { getConversationIdByUserIdAndWeekId } from "@/data/conversation";

export const getConversationIdByUserIdAndWeekIdAction = async (userId: string, weekId: string) => {
  const newConversationId = await getConversationIdByUserIdAndWeekId(userId, weekId);
  return newConversationId;
};
