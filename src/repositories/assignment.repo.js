import prisma from "../data/prisma.js";

//assign assets or create assignment
export const createAssignment = (data) => {
  return prisma.assetAssignment.create({ data });
};

//get all asset assignment history of an asset
export const getAllAssignment = (page = 1, limit = 10, ...filter) => {
  const { id, assetId, employeeId, assignedAt, returnedAt } = filter;
  return prisma.assetAssignment.findMany({
    where: {
      id,
      assetId,
      employeeId,
      assignedAt,
      returnedAt,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
};
