import { Router } from "express";
import * as activityLogController from "../controllers/activityLog.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/roles.middleware.js";

const route = Router();

route.get("/", authMiddleware, roleMiddleware("Admin"), activityLogController.getLogs);

export default route;
