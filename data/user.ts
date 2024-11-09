import prisma from '@/lib/prisma'
import { currentSemesterId } from '@/lib/constants'
import { getUsernameFromEmail } from '@/lib/utils'

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

export const addSupervisor = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const newSupervisor = await prisma.user.create({
      data: {
        firstName,
        lastName,
        studentId: getUsernameFromEmail(email),
        email,
        password,
        emailVerified: new Date(),
        role: 'SUPERVISOR',
        semesterId: currentSemesterId,
      },
    })

    return newSupervisor
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    })

    return deletedUser
  } catch (error) {
    console.error(error)
    return null
  }
}