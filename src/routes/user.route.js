import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/roles.middleware.js";

const route = Router();
route.post(
  "/getUserById",
  authMiddleware,
  roleMiddleware("Admin"),
  userController.getUserById,
);
route.post(
  "/getUserByEmail",
  authMiddleware,
  roleMiddleware("Admin"),
  userController.getUserByEmail,
);
route.post(
  "/getUsers",
  authMiddleware,
  roleMiddleware("Admin"),
  userController.getUsers,
);
route.post(
  "/updateUser",
  authMiddleware,
  roleMiddleware("Admin"),
  userController.updatedUser,
);
route.post(
  "/deleteUser",
  authMiddleware,
  roleMiddleware("Admin"),
  userController.deactivateUser,
);
route.get(
  "/getRoles",
  authMiddleware,
  roleMiddleware("Admin"),
  userController.getRoles,
);
route.get(
  "/createRole",
  authMiddleware,
  roleMiddleware("Admin"),
  userController.createRole,
);
route.get(
  "/updateRole",
  authMiddleware,
  roleMiddleware("Admin"),
  userController.updateRole,
);
route.get(
  "/deleteRole",
  authMiddleware,
  roleMiddleware("Admin"),
  userController.updateRole,
);

export default route;
