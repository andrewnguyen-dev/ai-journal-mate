'use server'

import { addSupervisor, deleteUser } from "@/data/user";

export const addSupervisorAction = async (firstName: string, lastName: string, email: string, password: string) => {
  const newSupervisor = await addSupervisor(firstName, lastName, email, password);
  return newSupervisor;
};

export const deleteUserAction = async (userId: string) => {
  const deletedUser = await deleteUser(userId);
  return deletedUser;
};