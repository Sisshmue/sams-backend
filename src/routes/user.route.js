import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const route = Router();
route.post("/getUserById", authMiddleware, userController.getUserById);
route.post("/getUserByEmail", authMiddleware, userController.getUserByEmail);
route.post("/getUsers", authMiddleware, userController.getUsers);
route.post("/updateUser", authMiddleware, userController.updatedUser);
route.post("/deleteUser", authMiddleware, userController.deactivateUser);

export default route;
