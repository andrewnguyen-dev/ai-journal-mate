import prisma from "@/lib/prisma";

export const getAllStudentsInSemester = async (semesterId: string) => {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: "STUDENT",
        semesterId,
      },
    });

    return students;
  } catch (error) {
    console.error(error);
    return null;
  }
};