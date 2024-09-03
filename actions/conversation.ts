'use server'

import { createConversation, getConversationIdByUserIdAndWeekId } from "@/data/conversation";

export const getConversationIdByUserIdAndWeekIdAction = async (userId: string, weekId: string) => {
  const conversationId = await getConversationIdByUserIdAndWeekId(userId, weekId);
  return conversationId;
};

export const createConversationAction = async (userId: string, weekId: string) => {
  const newConversationId = await createConversation(userId, weekId);
  return newConversationId;
};