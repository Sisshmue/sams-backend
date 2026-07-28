import * as assetRepo from "../repositories/asset.repo.js";

export const getAllAssets = async (page, limit, filter) => {
  const result = await assetRepo.getAllAssets(page, limit, filter);
  return result;
};

export const getAssetDetailById = async (id) => {
  const result = await assetRepo.getAssetDetailById(id);
  return result;
};

export const createAsset = async (data) => {
  const result = await assetRepo.createAsset(data);
  return result;
};

export const editAsset = async (id, data) => {
  const result = await assetRepo.editAsset(id, data);
  return result;
};

export const updateAssetStatusById = async (id, status) => {
  const result = await assetRepo.updateAssetStatusById(id, status);
  return result;
};

export const deleteAsset = async (id) => {
  const result = await assetRepo.deleteAsset(id);
  return result;
};
