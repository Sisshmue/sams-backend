import * as maintenanceServices from "../services/maintenance.service.js";

export const createMaintenanceRequest = async (req, res) => {
  try {
    const result = await maintenanceServices.createMaintenanceRequest(req.body, req.user.userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllMaintenanceRequests = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

    const filter = {};
    if (req.query.assetId) filter.assetId = parseInt(req.query.assetId, 10);
    if (req.query.requestedBy) filter.requestedBy = parseInt(req.query.requestedBy, 10);
    if (req.query.assignedTo) filter.assignedTo = parseInt(req.query.assignedTo, 10);
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;

    const result = await maintenanceServices.getAllMaintenanceRequests(page, limit, filter);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getMaintenanceRequestById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid maintenance request ID" });
    }

    const result = await maintenanceServices.getMaintenanceRequestById(id);
    if (!result) {
      return res.status(404).json({ message: "Maintenance request not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateMaintenanceRequest = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid maintenance request ID" });
    }

    const result = await maintenanceServices.updateMaintenanceRequest(id, req.body, req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
