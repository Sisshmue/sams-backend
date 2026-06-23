import prisma from "../data/prisma.js";

//auth
export const createUser = (data, tx = prisma) => {
  return tx.user.create({ data });
};

export const createEmployee = (data, tx = prisma) => {
  return tx.employee.create({ data });
};

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

//user managements
export const findUserById = (userId, tx = prisma) => {
  return tx.user.findUnique({
    where: { id: userId },
    include: { employee: true },
  });
};

export const findEmployeByUserId = (userId, tx = prisma) => {
  return tx.employee.findUnique({ where: { userId } });
};

export const getUsers = (filters = {}) => {
  const { roleId, departmentId } = filters;
  return prisma.user.findMany({
    where: {
      roleId: roleId ? Number(roleId) : undefined,
      employee: departmentId
        ? { departmentId: Number(departmentId) }
        : undefined,
    },
  });
};

export const updateUser = (userId, data) => {
  return prisma.user.update({ where: { id: userId }, data });
};

export const deactivateUser = (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isDeactivated: true },
  });
};
