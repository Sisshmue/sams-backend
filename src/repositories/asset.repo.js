import prisma from "../data/prisma.js";

//get all assets
export const getAllAssets = (page = 1, limit = 10, ...filter) => {
  const {
    name,
    serialNumber,
    category,
    purchaseDate,
    purchaseCost,
    status,
    isActive,
    createdAt,
  } = filter;
  return prisma.asset.findMany({
    where: {
      name,
      serialNumber,
      category,
      purchaseDate,
      purchaseCost,
      status,
      isActive: isActive ?? true,
      createdAt,
    },
    select: {
      name: true,
      serialNumber: true,
      category: true,
      status: true,
      isActive: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
};

//get asset by id in path paramenter
export const getAssetDetailById = (id) => {
  return prisma.asset.findUnique({
    where: {
      id,
    },
    include: {
      assetAssignments: true,
      maintenanceRequests: true,
    },
  });
};

//create assets
export const createAsset = (data) => {
  return prisma.asset.create({ data });
};

//edit assets
export const editAsset = (id, data) => {
  return prisma.asset.update({ where: { id }, data });
};

//change asset status only by id
export const updateAssetStatusById = (id, status) => {
  return prisma.asset.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

//delete assets
export const deleteAsset = (id) => {
  return prisma.asset.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
};

