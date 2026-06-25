import prisma from "../data/prisma.js";

// create maintenance request
export const createMaintenanceRequest = (data) => {
  return prisma.maintenanceRequest.create({
    data,
  });
};

// get all maintenance requests
export const getAllMaintenanceRequests = (filter = {}) => {
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
  });
};

// get maintenance request by id
export const getMaintenanceRequestById = (id) => {
  return prisma.maintenanceRequest.findUnique({
    where: { id },
  });
};

// update maintenance request
export const updateMaintenanceRequest = (id, data) => {
  return prisma.maintenanceRequest.update({
    where: { id },
    data,
  });
};