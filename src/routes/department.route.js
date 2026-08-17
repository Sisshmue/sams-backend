import { Router } from "express";
import * as departmentController from "../controllers/department.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/roles.middleware.js";

const route = Router();

route.post("/", authMiddleware, roleMiddleware("Admin"), departmentController.createDepartment);
route.get("/", authMiddleware, departmentController.getAllDepartments);
route.get("/:id", authMiddleware, departmentController.getDepartmentById);
route.put("/:id", authMiddleware, roleMiddleware("Admin"), departmentController.updateDepartment);
route.delete("/:id", authMiddleware, roleMiddleware("Admin"), departmentController.deleteDepartment);

export default route;
