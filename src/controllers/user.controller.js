import { AsyncErrors } from "../utils/asyncErrorHandler.js";

const getProducts = AsyncErrors(async (req, res, next) => {
  return res.json({ message: "All product is here" });
});

export const userController = {
  getProducts,
};
