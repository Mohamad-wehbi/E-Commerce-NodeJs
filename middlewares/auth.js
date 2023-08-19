const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");

exports.authenticated = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization && !authorization.startsWith("Bearer"))
    next(new ApiError("You are not login Please login to get access", 401));
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await UserModel.findById(decoded.userId);
  if (!user || user.loged === false)
    next(new ApiError("The user that belong to this token or not login", 401));
  if (user.passwordChangedAt) {
    const ChangedTime = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
    if (ChangedTime > decoded.iat)
      next(new ApiError("User changed his password. please login again", 401));
  }
  req.user = user;
  next();
});

exports.authorized = (...roles) =>
  asyncHandler((req, res, next) => {
    if (!roles.includes(req.user.role))
      next(new ApiError("You are not allowed to access this route", 403));
    next();
  });
