const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const factory = require("./factory");
const { uploadSingleImage } = require("../middlewares/uploadImage");
const { resizeSingleImage } = require("../middlewares/resizeImage");
const ApiError = require("../utils/apiError");
const createToken = require("../utils/createToken");
const asyncHandler = require("express-async-handler");
const filterFiels = require("../utils/filterFields");

const updateLoggedUser = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const user = await Model.findByIdAndUpdate(_id, req.body, { new: true });
    if (!user) next(new ApiError(`No user for this id: ${id}`, 404));
    if (req.body.email) {
      const user = await Model.findOne({ email: req.body.email });
      if (user) next(new ApiError("there is user for this email", 400));
    }
    await user.save();
    res.status(200).json({ data: filterFiels(user) });
  });

const getLoggedUser = (Model) =>
  asyncHandler(async (req, res, next) => {
    const user = await Model.findById(req.user._id);
    if (!user) next(new ApiError(`No user for this id: ${id}`, 404));
    res.status(200).json({ data: filterFiels(user) });
  });

const changePassword = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { password, newPassword } = req.body;
    const user = await Model.findById(req.user._id);
    if (!(await bcrypt.compare(password, user.password)))
      return next(new ApiError("password is not valid, try again please!"));
    user.password = newPassword;
    user.passwordChangedAt = Date.now();
    const newUser = await user.save();
    const token = createToken(newUser._id);
    res.status(200).json({ data: filterFiels(user), token });
  });

exports.uploadUserImage = uploadSingleImage("profileImg");
exports.resizeUserImage = resizeSingleImage("profileImg", "user");
exports.getUsers = factory.getAll(UserModel);
exports.getUser = factory.getOne(UserModel);
exports.createUser = factory.createOne(UserModel);
exports.updateUser = factory.updateOne(UserModel);
exports.deleteUser = factory.deleteOne(UserModel);
exports.changePassword = changePassword(UserModel);
exports.updateLoggedUser = updateLoggedUser(UserModel);
exports.getLoggedUser = getLoggedUser(UserModel);
