import { Router } from "express";
import * as assetController from "../controllers/asset.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/roles.middleware.js";

const route = Router();

// Get all assets (supports pagination and filtering)
route.get("/", authMiddleware, assetController.getAllAssets);

// Get detailed asset information by ID in path parameter
route.get("/:id", authMiddleware, assetController.getAssetDetailById);

// Create a new asset (Admin only)
route.post("/", authMiddleware, roleMiddleware("Admin"), assetController.createAsset);

// Update an existing asset by ID (Admin only)
route.put("/:id", authMiddleware, roleMiddleware("Admin"), assetController.editAsset);

// Update asset status by ID (Admin only)
route.patch("/:id/status", authMiddleware, roleMiddleware("Admin"), assetController.updateAssetStatusById);

// Soft delete an asset by ID (Admin only)
route.delete("/:id", authMiddleware, roleMiddleware("Admin"), assetController.deleteAsset);

export default route;
