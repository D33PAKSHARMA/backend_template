import { AsyncErrors } from "../utils/asyncErrorHandler.js";

const getProducts = AsyncErrors(async (req, res) => {
  res.json({ message: "All products" });
});

export const userController = {
  getProducts,
};
