import * as assignmentRepo from "../repositories/assignment.repo.js";
import prisma from "../data/prisma.js";

export const createAssignment = async (assetId, data) => {
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

    await assignmentRepo.createAssignment(data, tx);

    await tx.asset.update({
      where: { id: assetId },
      data: {
        status: "ASSIGNED",
      },
    });
  });
};

export const getAllAssignment = async (page, limit, filter) => {
  const result = await assignmentRepo.getAllAssignment(page, limit, filter);
  return result;
};
