import * as maintenanceRepo from "../repositories/maintenance.repo.js";
import * as userRepo from "../repositories/user.repo.js";
import prisma from "../data/prisma.js";
import { logActivity } from "./activityLog.service.js";

export const createMaintenanceRequest = async (data, userId) => {
  return await prisma.$transaction(async (tx) => {
    // Find employee ID of the requestor
    const employee = await userRepo.findEmployeByUserId(userId, tx);
    if (!employee) {
      throw new Error("Employee profile not found for user");
    }

    const asset = await tx.asset.findUnique({
      where: { id: data.assetId },
    });
    if (!asset) {
      throw new Error("Asset not found");
    }

    const requestData = {
      assetId: data.assetId,
      requestedBy: employee.id,
      description: data.description,
      priority: data.priority || "MEDIUM",
      status: "PENDING",
    };

    const newRequest = await maintenanceRepo.createMaintenanceRequest(requestData, tx);

    await logActivity(
      userId,
      "MAINTENANCE_CREATE",
      `Maintenance request created for Asset ID ${data.assetId} (Priority: ${requestData.priority})`,
      tx
    );

    return newRequest;
  });
};

export const getAllMaintenanceRequests = async (page, limit, filter) => {
  return await maintenanceRepo.getAllMaintenanceRequests(page, limit, filter);
};

export const getMaintenanceRequestById = async (id) => {
  return await maintenanceRepo.getMaintenanceRequestById(id);
};

export const updateMaintenanceRequest = async (id, updateData, userId) => {
  return await prisma.$transaction(async (tx) => {
    const existing = await maintenanceRepo.getMaintenanceRequestById(id, tx);
    if (!existing) {
      throw new Error("Maintenance request not found");
    }

    const dataToUpdate = {};
    if (updateData.status) dataToUpdate.status = updateData.status;
    if (updateData.priority) dataToUpdate.priority = updateData.priority;
    if (updateData.description) dataToUpdate.description = updateData.description;
    if (updateData.cost !== undefined) dataToUpdate.cost = parseFloat(updateData.cost);
    if (updateData.assignedTo !== undefined) {
      dataToUpdate.assignedTo = updateData.assignedTo ? parseInt(updateData.assignedTo, 10) : null;
    }

    // Handle resolution timestamps
    if (updateData.status === "COMPLETED" || updateData.status === "REJECTED") {
      dataToUpdate.resolvedAt = new Date();
    }

    const updatedRequest = await maintenanceRepo.updateMaintenanceRequest(id, dataToUpdate, tx);

    // Asset status transition logic
    if (updateData.status) {
      let newAssetStatus = null;
      if (updateData.status === "IN_PROGRESS" || updateData.status === "APPROVED") {
        newAssetStatus = "UNDER_MAINTENANCE";
      } else if (updateData.status === "COMPLETED" || updateData.status === "REJECTED") {
        newAssetStatus = "AVAILABLE";
      }

      if (newAssetStatus) {
        await tx.asset.update({
          where: { id: existing.assetId },
          data: { status: newAssetStatus },
        });
      }
    }

    await logActivity(
      userId,
      "MAINTENANCE_UPDATE",
      `Maintenance request ID ${id} status updated to ${updateData.status || existing.status}`,
      tx
    );

    return updatedRequest;
  });
};
