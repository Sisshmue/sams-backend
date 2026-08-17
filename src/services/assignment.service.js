import * as assignmentRepo from "../repositories/assignment.repo.js";
import prisma from "../data/prisma.js";
import { logActivity } from "./activityLog.service.js";

export const createAssignment = async (assetId, data, userId) => {
  return await prisma.$transaction(async (tx) => {
    const asset = await tx.asset.findUnique({
      where: { id: assetId },
    });

    const activeAssignment = await tx.assetAssignment.findFirst({
      where: {
        assetId,
        returnedAt: null,
      },
    });

    if (!asset) {
      throw new Error("Asset not found");
    }

    if (!asset.isActive) {
      throw new Error("Asset is inactive");
    }

    if (asset.status !== "AVAILABLE") {
      throw new Error("Asset already assigned");
    }

    if (activeAssignment) {
      throw new Error("Asset already assigned");
    }

    const createdAssignment = await assignmentRepo.createAssignment(data, tx);

    await tx.asset.update({
      where: { id: assetId },
      data: {
        status: "ASSIGNED",
      },
    });

    await logActivity(userId, "ASSIGN_ASSET", `Asset ID ${assetId} assigned to Employee ID ${data.employeeId}`, tx);

    return createdAssignment;
  });
};

export const returnAssignment = async (assignmentId, notes, userId) => {
  return await prisma.$transaction(async (tx) => {
    const assignment = await assignmentRepo.getAssignmentById(assignmentId, tx);

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    if (assignment.returnedAt) {
      throw new Error("Asset has already been returned");
    }

    // Update assignment return date and append return notes
    const updatedAssignment = await assignmentRepo.updateAssignment(
      assignmentId,
      {
        returnedAt: new Date(),
        notes: notes ? `${assignment.notes || ""}\nReturn Notes: ${notes}`.trim() : assignment.notes,
      },
      tx
    );

    // Update asset status back to AVAILABLE
    await tx.asset.update({
      where: { id: assignment.assetId },
      data: {
        status: "AVAILABLE",
      },
    });

    // Log action
    await logActivity(userId, "RETURN_ASSET", `Asset ID ${assignment.assetId} returned from Employee ID ${assignment.employeeId}`, tx);

    return updatedAssignment;
  });
};

export const getAllAssignment = async (page, limit, filter) => {
  const result = await assignmentRepo.getAllAssignment(page, limit, filter);
  return result;
};
