import prisma from "@/lib/prisma";

export const getAllWeeks = async () => {
  try {
    const weeksData = await prisma.week.findMany();
    return weeksData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addWeek = async (weekId: string, title: string, description: string, fromDate: Date, toDate: Date) => {
  try {
    const newWeek = await prisma.week.create({
      data: {
        id: weekId,
        title,
        description,
        fromDate,
        toDate,
      },
    });

    return newWeek;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteWeek = async (weekId: string) => {
  try {
    const deletedWeek = await prisma.week.delete({
      where: {
        id: weekId,
      },
    });

    return deletedWeek;
  } catch (error) {
    console.error(error);
    return null;
  }
};