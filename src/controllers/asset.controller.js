import * as assetServices from "../services/asset.service.js";

// Get all assets with pagination and filtering
export const getAllAssets = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;

    // Extract filter options from query parameters
    const filter = {};
    if (req.query.name) filter.name = req.query.name;
    if (req.query.serialNumber) filter.serialNumber = req.query.serialNumber;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.status) filter.status = req.query.status;

    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === "true";
    }

    if (req.query.purchaseCost !== undefined) {
      filter.purchaseCost = parseFloat(req.query.purchaseCost);
    }

    if (req.query.purchaseDate) {
      filter.purchaseDate = new Date(req.query.purchaseDate);
    }

    if (req.query.createdAt) {
      filter.createdAt = new Date(req.query.createdAt);
    }

    const result = await assetServices.getAllAssets(page, limit, filter);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get detailed asset information by ID
export const getAssetDetailById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid asset ID" });
    }

    const result = await assetServices.getAssetDetailById(id);
    if (!result) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Create a new asset
export const createAsset = async (req, res) => {
  try {
    const data = req.body;

    if (data.purchaseDate) {
      data.purchaseDate = new Date(data.purchaseDate);
    }
    if (data.purchaseCost !== undefined) {
      data.purchaseCost = parseFloat(data.purchaseCost);
    }

    const result = await assetServices.createAsset(data, req.user.userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Update an existing asset
export const editAsset = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid asset ID" });
    }

    const data = req.body;
    if (data.purchaseDate) {
      data.purchaseDate = new Date(data.purchaseDate);
    }
    if (data.purchaseCost !== undefined) {
      data.purchaseCost = parseFloat(data.purchaseCost);
    }

    const result = await assetServices.editAsset(id, data, req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Update status of an asset by ID
export const updateAssetStatusById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid asset ID" });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required in request body" });
    }

    const result = await assetServices.updateAssetStatusById(id, status, req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Soft delete an asset by setting isActive to false
export const deleteAsset = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid asset ID" });
    }

    const result = await assetServices.deleteAsset(id, req.user.userId);
    res.status(200).json({
      message: "Asset deleted successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
