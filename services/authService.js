const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const createToken = require("../utils/createToken");
const { sendEmail, optionsForEmail } = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const hashedResetCode = require("../utils/crypto");
const filterFiels = require("../utils/filterFields");


exports.signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (user) next(new ApiError(`there is user for this email: ${email}`, 400));
  user = await UserModel.create({ userName, email, password });
  const token = createToken(user._id);
  res.status(201).json({ data: filterFiels(user), token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    next(new ApiError(`email or password is not valid`, 400));
  user.loged = true;
  user = await user.save();
  const token = createToken(user._id);
  res.status(201).json({ data: filterFiels(user), token });
});

exports.logout = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { loged: false });
  res.status(200).json({ message: "succese" });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) next(new ApiError(`there is user for this email: ${email}`, 400));
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.passwordResetCode = hashedResetCode(resetCode);
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();
  const optionsEmail = optionsForEmail(user, resetCode);
  try {
    await sendEmail(optionsEmail);
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(new ApiError("There is an error in sending email", 500));
  }
  res.status(200).json({ message: "reset code sent to email" });
});

exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  const { resetCode } = req.body;
  const user = await UserModel.findOne({
    passwordResetCode: hashedResetCode(resetCode),
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) next(new ApiError("Reset code invalid or expired", 400));
  user.verifyPassResetCode = true;
  await user.save();
  res.status(200).json({ status: "success" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword, email } = req.body;
  const user = await UserModel.findOne({ email, verifyPassResetCode: true });
  if (!user) next(new ApiError("You are not allowed to reset password", 403));
  user.password = newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();
  const token = createToken(user._id);
  res.status(200).json({ status: "success", token });
});
