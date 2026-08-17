import prisma from "../data/prisma.js";

// Create activity log
export const createLog = (data, tx = prisma) => {
  return tx.activityLog.create({ data });
};

// Get activity logs
export const getLogs = (page = 1, limit = 10) => {
  return prisma.activityLog.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};
