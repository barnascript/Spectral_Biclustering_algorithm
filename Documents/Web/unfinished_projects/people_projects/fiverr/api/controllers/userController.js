import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/jwt.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    // verify the sent token belongs to the user
    if (user._id.toString() !== req.UserId) {
      return next(
        createError(401, "You are not authorized to delete this account")
      );
    }
    await User.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
};
