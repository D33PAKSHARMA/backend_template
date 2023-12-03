import Joi from "joi";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { AsyncErrors } from "../utils/asyncErrorHandler.js";

const registerUser = AsyncErrors(async (req, res, next) => {
  // validations
  const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
  });
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(new ApiError(501, error.details[0].message));
  }

  //   const user = await User.findOne({ email });

  //   if (user) {
  //     return new ApiError(500, "User Already Exist");
  //   }

  //   const newUser = new User({
  //     name,
  //     email,
  //     password,
  //   });

  //   await newUser.save();

  res.status(200).json({ status: 200, message: "User Register Successfully" });
});

const authController = {
  registerUser,
};

export default authController;
