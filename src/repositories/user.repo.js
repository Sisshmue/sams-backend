import prisma from "../data/prisma.js";

export const createUser = (data, tx = prisma) => {
  return tx.user.create({ data });
};

export const createEmployee = (data, tx = prisma) => {
  return tx.employee.create({ data });
};

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findEmployeByEmail = (userId) => {
  return prisma.employee.findUnique({ where: { userId } });
};
