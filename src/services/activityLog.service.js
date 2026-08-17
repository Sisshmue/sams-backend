import * as activityLogRepo from "../repositories/activityLog.repo.js";

export const logActivity = async (userId, action, details = null, tx = undefined) => {
  try {
    if (!userId) {
      console.warn(`ActivityLog skipped: userId is missing for action ${action}`);
      return;
    }
    await activityLogRepo.createLog({
      userId,
      action,
      details,
    }, tx);
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};

export const getLogs = async (page = 1, limit = 10) => {
  const result = await activityLogRepo.getLogs(page, limit);
  return result;
};
