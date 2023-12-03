import { AsyncErrors } from "../utils/asyncErrorHandler.js";

export const isAuthenticated = AsyncErrors((req, res, next) => {
  res.send({ message: " Verified" });
  next();
});
