import express from "express";
import { userController } from "../controllers/user.controller.js";
import { isAuthenticated, validateRole } from "../middlewares/verifyUser.js";

const router = express.Router();

router
  .route("/products")
  .get(isAuthenticated, validateRole("admin"), userController.getProducts);

export default router;
