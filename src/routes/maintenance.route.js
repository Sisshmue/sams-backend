import { Router } from "express";
import * as maintenanceController from "../controllers/maintenance.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/roles.middleware.js";

const route = Router();

route.post("/", authMiddleware, maintenanceController.createMaintenanceRequest);
route.get("/", authMiddleware, maintenanceController.getAllMaintenanceRequests);
route.get("/:id", authMiddleware, maintenanceController.getMaintenanceRequestById);
route.put("/:id", authMiddleware, roleMiddleware("Admin", "Technician"), maintenanceController.updateMaintenanceRequest);

export default route;
