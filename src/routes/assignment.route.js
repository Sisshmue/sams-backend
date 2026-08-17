import { Router } from "express";
import * as assignmentController from "../controllers/assignment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/roles.middleware.js";

const route = Router();

// Create a new assignment (Admin only)
route.post("/", authMiddleware, roleMiddleware("Admin"), assignmentController.createAssignment);

// Return an asset assignment (Admin only)
route.patch("/:id/return", authMiddleware, roleMiddleware("Admin"), assignmentController.returnAssignment);

// Get all assignments with optional filters and pagination
route.get("/", authMiddleware, assignmentController.getAllAssignment);

export default route;
