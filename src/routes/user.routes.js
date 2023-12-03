import express from "express";
import { userController } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/verifyUser.js";

const router = express.Router();

router.route("/products").get(isAuthenticated, userController.getProducts);

export default router;
