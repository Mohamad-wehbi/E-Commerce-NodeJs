const express = require("express");
const {
  createReview,
  createReviewByProd,
  getReviews,
  getReview,
  getReviewsByProd,
  updateReview,
  deleteReview,
  verifyCeateReview,
  verifyDeleteReview,
  verifyUpdateReview,
} = require("../services/reviewSevice");
const {
  createValidator,
  deleteValidator,
  getOneValidator,
  updateValidator,
} = require("../validations/reviewValidation");
const { authenticated, authorized } = require("../middlewares/auth");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authenticated,
    authorized("user"),
    createReviewByProd,
    createValidator,
    verifyCeateReview,
    createReview
  )
  .get(getReviewsByProd, getReviews);
router
  .route("/:id")
  .get(getOneValidator, getReview)
  .put(
    authenticated,
    authorized("user"),
    updateValidator,
    verifyUpdateReview,
    updateReview
  )
  .delete(
    authenticated,
    authorized("user", "admin", "manager"),
    deleteValidator,
    verifyDeleteReview,
    deleteReview
  );

module.exports = router;
