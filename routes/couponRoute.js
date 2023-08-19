const express = require("express");
const {
  createSubCoupon,
  deleteSubCoupon,
  getSubCoupon,
  getSubCoupons,
  updateSubCoupon,
} = require("../services/couponService");
const {
  createValidator,
  deleteValidator,
  getOneValidator,
  updateValidator,
} = require("../validations/couponValidator");
const { authenticated, authorized } = require("../middlewares/auth");

const router = express.Router();
router.use(authenticated, authorized("admin"));
router
  .route("/")
  .post(createValidator, createSubCoupon)
  .get(getSubCoupons);
router
  .route("/:id")
  .get(getOneValidator, getSubCoupon)
  .put(updateValidator, updateSubCoupon)
  .delete(deleteValidator, deleteSubCoupon);

module.exports = router;
