import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/roles.middleware.js";

const route = Router();
route.post(
  "/getUserById",
  authMiddleware,
  roleMiddleware,
  userController.getUserById,
);
route.post(
  "/getUserByEmail",
  authMiddleware,
  roleMiddleware,
  userController.getUserByEmail,
);
route.post(
  "/getUsers",
  authMiddleware,
  roleMiddleware,
  userController.getUsers,
);
route.post(
  "/updateUser",
  authMiddleware,
  roleMiddleware,
  userController.updatedUser,
);
route.post(
  "/deleteUser",
  authMiddleware,
  roleMiddleware,
  userController.deactivateUser,
);
route.get("/getRoles", authMiddleware, roleMiddleware, userController.getRoles);

export default route;
