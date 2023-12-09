import Joi from "joi";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { AsyncErrors } from "../utils/asyncErrorHandler.js";
import Jwt from "jsonwebtoken";

const registerUser = AsyncErrors(async (req, res, next) => {
  // validations
  const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
    role: Joi.string(),
  });
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(new ApiError(501, error.details[0].message));
  }

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return new ApiError(500, "User Already Exist");
  }

  const newUser = new User(req.body);

  await newUser.save();

  res.status(200).json({ message: "Register Successfully", newUser });
});

const loginUser = AsyncErrors(async (req, res, next) => {
  //validation
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(new ApiError(501, error.details[0].message));
  }

  const user = await User.findOne({ email: req.body.email }).select(
    "-password"
  );

  if (!user) return next(new ApiError(500, "User not found!"));

  const token = await Jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json({ message: "Login success", user });
});

const authController = {
  registerUser,
  loginUser,
};

export default authController;
