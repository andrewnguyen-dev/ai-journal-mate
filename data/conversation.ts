import prisma from "@/lib/prisma";
import { semesterId } from "@/lib/constants";
import { SenderRole } from "@prisma/client";
import { Message } from "ai";

export const getConversationsByUserId = async (userId: string) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        userId,
      },
      // include: {
      //   messages: true,
      // },
    });

    return conversations;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getConversationById = async (conversationId: string) => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      // include: {
      //   messages: true,
      // },
    });

    return conversation;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getConversationIdByUserIdAndWeekId = async (
  userId: string,
  weekId: string,
  type: 'DIARY' | 'REFLECTION_REPORT',
) => {
  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        userId,
        weekId,
        type,
        semesterId,
      },
    });
    return conversation?.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createConversation = async (userId: string, weekId: string, type: 'DIARY' | 'REFLECTION_REPORT') => {
  try {
    const newConversation = await prisma.conversation.create({
      data: {
        userId,
        weekId,
        type,
        semesterId,
      },
    });
    return newConversation;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveDraft = async (
  conversationId: string,
  messages: Message[],
) => {
  try {
    const transformedMessages = messages
    .filter((message) => !message.id.includes('default-system-message')) // Exclude messages with 'default-system-message' in the id
    .map((message) => ({
      id: message.id,
      messageText: message.content,
      sender: message.role as SenderRole,
      createdAt: message.createdAt,
      conversationId: conversationId,
    }));

    const savedDraft = await prisma.message.createMany({
      data: transformedMessages,
    });
    return savedDraft;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteConversationMessages = async (conversationId: string) => {
  try {
    const deletedMessages = await prisma.message.deleteMany({
      where: {
        conversationId: conversationId,
      },
    });
    return deletedMessages;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMessagesByConversationId = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return messages;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const submitDiary = async (conversationId: string, summary: string) => {
  try {
    const submittedDiary = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        submittedAt: new Date(),
        isDraft: false,
        summary,
      },
    });
    return submittedDiary;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const unsubmitDiary = async (conversationId: string) => {
  try {
    const unsubmittedDiary = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        submittedAt: null,
        isDraft: true,
        summary: null,
      },
    });
    return unsubmittedDiary;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getConversationSummaries = async () => {
  try {
    const conversationSummaries = await prisma.conversation.findMany({
      select: {
        summary: true,
      },
    });

    // Merge summaries into a single string
    const mergedSummaries = conversationSummaries.map(convo => convo.summary).join('\n');

    // Return the merged summaries
    return mergedSummaries;
  } catch (error) {
    console.error(error);
    return null;
  }
};