import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  // token sent alongside login
  const tokenSent = req.cookies.accessToken;

  //check if token is present
  if (!tokenSent) return next(createError(401, "Token is not valid"));

  // verify the sent token belongs to the user
  jwt.verify(tokenSent, process.env.SECRET_KEY, (err, payload) => {
    if (err) next(createError(403, "Token is not valid"));

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
