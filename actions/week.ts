'use server'

import { addWeek, deleteWeek } from "@/data/week";

export const addWeekAction = async (weekId: string, title: string, description: string, fromDate: Date, toDate: Date) => {
  const newWeek = await addWeek(weekId, title, description, fromDate, toDate);
  return newWeek;
};

export const deleteWeekAction = async (weekId: string) => {
  const deletedWeek = await deleteWeek(weekId);
  return deletedWeek;
};