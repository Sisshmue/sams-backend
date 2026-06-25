import prisma from "../data/prisma.js";

//auth
export const createUser = (data, tx = prisma) => {
  return tx.user.create({ data });
};

export const createEmployee = (data, tx = prisma) => {
  return tx.employee.create({ data });
};

//user managements
export const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
    include: { employee: true },
  });
};

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
      isDeactivated: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      roleId: true,
      employee: {
        select: {
          departmentId: true,
        },
      },
      createdAt: true,
    },
  });
};

export const updateUser = (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      roleId: true,
      employee: {
        select: {
          departmentId: true,
        },
      },
      createdAt: true,
    },
  });
};

export const deactivateUser = (userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isDeactivated: true },
  });
};

export const getRoles = () => {
  return prisma.role.findMany({});
};

export const createRole = (data) => {
  return prisma.role.create({ data });
};

export const updateRole = (roleId, data) => {
  return prisma.role.update({ where: { id: roleId }, data });
};

export const deleteRole = (roleId) => {
  return prisma.role.delete({ where: { id: roleId } });
};
