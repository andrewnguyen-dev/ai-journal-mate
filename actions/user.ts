'use server'

import { addSupervisor } from "@/data/user";

export const addSupervisorAction = async (firstName: string, lastName: string, email: string, password: string) => {
  const newSupervisor = await addSupervisor(firstName, lastName, email, password);
  return newSupervisor;
};