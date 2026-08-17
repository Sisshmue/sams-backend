import * as assignmentServices from "../services/assignment.service.js";

// Create a new asset assignment
export const createAssignment = async (req, res) => {
  try {
    const { assetId, employeeId, notes } = req.body;

    if (!assetId) {
      return res.status(400).json({ message: "assetId is required" });
    }
    if (!employeeId) {
      return res.status(400).json({ message: "employeeId is required" });
    }

    const parsedAssetId = parseInt(assetId, 10);
    const parsedEmployeeId = parseInt(employeeId, 10);

    if (isNaN(parsedAssetId)) {
      return res.status(400).json({ message: "Invalid assetId" });
    }
    if (isNaN(parsedEmployeeId)) {
      return res.status(400).json({ message: "Invalid employeeId" });
    }

    const data = {
      assetId: parsedAssetId,
      employeeId: parsedEmployeeId,
      notes: notes || null,
    };

    const result = await assignmentServices.createAssignment(parsedAssetId, data, req.user.userId);
    res.status(201).json({
      message: "Asset assigned successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get all asset assignments with pagination and filtering
export const getAllAssignment = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;

    // Extract filter options from query parameters
    const filter = {};
    if (req.query.id) filter.id = parseInt(req.query.id, 10);
    if (req.query.assetId) filter.assetId = parseInt(req.query.assetId, 10);
    if (req.query.employeeId) filter.employeeId = parseInt(req.query.employeeId, 10);
    
    if (req.query.assignedAt) {
      filter.assignedAt = new Date(req.query.assignedAt);
    }
    if (req.query.returnedAt !== undefined) {
      filter.returnedAt = req.query.returnedAt === "null" ? null : new Date(req.query.returnedAt);
    }

    const result = await assignmentServices.getAllAssignment(page, limit, filter);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Return an asset assignment (mark as returned)
export const returnAssignment = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid assignment ID" });
    }

    const { notes } = req.body;
    const userId = req.user.userId;

    const result = await assignmentServices.returnAssignment(id, notes, userId);
    res.status(200).json({
      message: "Asset returned successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
