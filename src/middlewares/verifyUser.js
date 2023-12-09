import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { AsyncErrors } from "../utils/asyncErrorHandler.js";
import Jwt from "jsonwebtoken";

export const isAuthenticated = AsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return next(new ApiError(501, "Please login to access this resource"));
  const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById({ _id: decodedData.id });
  next();
});

export const validateRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ApiError(
          501,
          "User with this role is not allowed to access this resource!"
        )
      );
    }
    next();
  };
};
