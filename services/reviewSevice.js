const factory = require("./factory");
const ReviewModel = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const checkIfUserCreatedBefore = (Model) => asyncHandler(async (req, res, next) => {
  const review = await Model.findOne({user: req.user._id, prodect: req.body.prodect});
  if (review) next(new ApiError("You already created a review before", 400));
  next();
});
const chickeIfUserIsAllowed = (Model, method) => asyncHandler(async (req, res, next) => {
  if(method == 'deleteOne' && req.user.role !== 'user')  return next();
  const review = await Model.findOne({_id: req.params.id, user: req.user._id});
  if (!review) next(new ApiError("Your are not allowed", 403));
  next()
  });

exports.getReviewsByProd = factory.getchildByParent("prodect");
exports.createReviewByProd = factory.createChildByParent("prodect");

exports.getReviews = factory.getAll(ReviewModel);
exports.getReview = factory.getOne(ReviewModel);
exports.createReview = factory.createOne(ReviewModel);
exports.updateReview = factory.updateOne(ReviewModel);
exports.deleteReview = factory.deleteOne(ReviewModel);

exports.verifyCeateReview = checkIfUserCreatedBefore(ReviewModel);
exports.verifyUpdateReview = chickeIfUserIsAllowed(ReviewModel, 'updateOne');
exports.verifyDeleteReview = chickeIfUserIsAllowed(ReviewModel, 'deleteOne');
