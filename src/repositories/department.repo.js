import prisma from "../data/prisma.js";

export const createDepartment = (data, tx = prisma) => {
  return tx.department.create({ data });
};

export const getAllDepartments = () => {
  return prisma.department.findMany({
    include: {
      employee: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export const getDepartmentById = (id) => {
  return prisma.department.findUnique({
    where: { id },
    include: {
      employee: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export const updateDepartment = (id, data) => {
  return prisma.department.update({
    where: { id },
    data,
  });
};

export const deleteDepartment = (id) => {
  return prisma.department.delete({
    where: { id },
  });
};
