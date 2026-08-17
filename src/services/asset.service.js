import * as assetRepo from "../repositories/asset.repo.js";
import { logActivity } from "./activityLog.service.js";

export const getAllAssets = async (page, limit, filter) => {
  const result = await assetRepo.getAllAssets(page, limit, filter);
  return result;
};

export const getAssetDetailById = async (id) => {
  const result = await assetRepo.getAssetDetailById(id);
  return result;
};

export const createAsset = async (data, userId) => {
  const result = await assetRepo.createAsset(data);
  await logActivity(userId, "CREATE_ASSET", `Asset "${result.name}" (ID ${result.id}) created`);
  return result;
};

export const editAsset = async (id, data, userId) => {
  const result = await assetRepo.editAsset(id, data);
  await logActivity(userId, "UPDATE_ASSET", `Asset "${result.name}" (ID ${id}) updated`);
  return result;
};

export const updateAssetStatusById = async (id, status, userId) => {
  const result = await assetRepo.updateAssetStatusById(id, status);
  await logActivity(userId, "STATUS_CHANGE_ASSET", `Asset "${result.name}" (ID ${id}) status updated to ${status}`);
  return result;
};

export const deleteAsset = async (id, userId) => {
  const result = await assetRepo.deleteAsset(id);
  await logActivity(userId, "DELETE_ASSET", `Asset "${result.name}" (ID ${id}) soft-deleted`);
  return result;
};
