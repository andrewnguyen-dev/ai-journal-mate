'use server'

import { addWeek } from "@/data/week";

export const addWeekAction = async (weekId: string, title: string, description: string, fromDate: Date, toDate: Date) => {
  const newWeek = await addWeek(weekId, title, description, fromDate, toDate);
  return newWeek;
};