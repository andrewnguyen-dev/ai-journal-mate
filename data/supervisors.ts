import prisma from "@/lib/prisma";

export const getAllSupervisorsInSemester = async (semesterId: string) => {
  try {
    const supervisors = await prisma.user.findMany({
      where: {
        role: "SUPERVISOR",
        semesterId,
      },
    });

    return supervisors;
  } catch (error) {
    console.error(error);
    return null;
  }
};