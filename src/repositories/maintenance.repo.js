import prisma from "../data/prisma.js";

// create maintenance request
export const createMaintenanceRequest = (data, tx = prisma) => {
  return tx.maintenanceRequest.create({
    data,
  });
};

// get all maintenance requests
export const getAllMaintenanceRequests = (page = 1, limit = 10, filter = {}) => {
  const {
    assetId,
    requestedBy,
    assignedTo,
    status,
    priority,
  } = filter;

  return prisma.maintenanceRequest.findMany({
    where: {
      assetId,
      requestedBy,
      assignedTo,
      status,
      priority,
    },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      asset: true,
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
      technician: {
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
    orderBy: {
      createdAt: "desc",
    },
  });
};

// get maintenance request by id
export const getMaintenanceRequestById = (id, tx = prisma) => {
  return tx.maintenanceRequest.findUnique({
    where: { id },
    include: {
      asset: true,
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
      technician: {
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

// update maintenance request
export const updateMaintenanceRequest = (id, data, tx = prisma) => {
  return tx.maintenanceRequest.update({
    where: { id },
    data,
  });
};