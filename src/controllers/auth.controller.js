import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { AsyncErrors } from "../utils/asyncErrorHandler.js";

const registerUser = AsyncErrors(async (req, res) => {
  //   const { email, name, password } = req.body;
  console.log("req.body==========>", req.body);

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
