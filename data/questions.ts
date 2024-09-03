import prisma from '@/lib/prisma'

export const getQuestionsByWeekId = async (weekId: string) => {
  try {
    const questions = await prisma.question.findMany({
      where: {
        weekId
      },
      orderBy: {
        order: 'asc'
      }
    })
    return questions
  } catch (error) {
    console.error(error)
    return null
  }
}