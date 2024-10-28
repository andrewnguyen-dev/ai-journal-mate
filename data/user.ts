import prisma from '@/lib/prisma'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getUserIdByStudentId = async (studentId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        studentId,
      },
    })

    return user?.id;
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getStudentIdByUserId = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    return user?.studentId;
  } catch (error) {
    console.error(error)
    return null
  }
}