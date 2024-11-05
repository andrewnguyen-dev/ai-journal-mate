'use server'

import { createConversation, deleteConversationMessages, getConversationIdByUserIdAndWeekId, saveDraft, submitDiary, submitMarking, unsubmitDiary } from "@/data/conversation";
import { Message } from "ai";

export const getConversationIdByUserIdAndWeekIdAction = async (userId: string, weekId: string, type: 'DIARY' | 'REFLECTION_REPORT') => {
  const conversationId = await getConversationIdByUserIdAndWeekId(userId, weekId, type);
  return conversationId;
};

export const createConversationAction = async (userId: string, weekId: string, type: 'DIARY' | 'REFLECTION_REPORT') => {
  const newConversationId = await createConversation(userId, weekId, type);
  return newConversationId;
};

export const saveDraftAction = async (conversationId: string, messages: Message[]) => {
  const savedDraft = await saveDraft(conversationId, messages);
  return savedDraft;
};

export const deleteConversationMessagesAction = async (conversationId: string) => {
  const deletedConversation = await deleteConversationMessages(conversationId);
  return deletedConversation;
};

export const submitDiaryAction = async (conversationId: string, summary: string) => {
  const submittedDiary = await submitDiary(conversationId, summary);
  return submittedDiary;
};

export const unsubmitDiaryAction = async (conversationId: string) => {
  const unsubmittedDiary = await unsubmitDiary(conversationId);
  return unsubmittedDiary;
};

export const submitMarkingAction = async (conversationId: string, feedback: string, grade: number) => {
  const submittedMarking = await submitMarking(conversationId, feedback, grade);
  return submittedMarking;
};