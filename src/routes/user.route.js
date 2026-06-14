import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const route = Router();
route.post("/register", userController.userRegister);

export default route;
