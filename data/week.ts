import prisma from '@/lib/prisma'

export const getAllWeeks = async () => {
  try {
    const weeksData = await prisma.week.findMany()
    return weeksData
  } catch (error) {
    console.error(error)
    return null
  }
}