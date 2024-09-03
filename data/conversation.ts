import prisma from "@/lib/prisma";
import { semesterId } from "@/lib/constants";

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
) => {
  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        userId,
        weekId,
        type: 'DIARY',
        semesterId
      },
    });
    return conversation?.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createConversation = async (userId: string, weekId: string) => {
  try {
    const newConversation = await prisma.conversation.create({
      data: {
        userId,
        weekId,
        type: 'DIARY',
        semesterId,
      },
    });
    return newConversation;
  } catch (error) {
    console.error(error);
    return null;
  }
};