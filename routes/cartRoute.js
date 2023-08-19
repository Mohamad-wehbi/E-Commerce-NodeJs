const express = require("express");
const router = express.Router();
const {
  addProdectToCart,
  applyCoupon,
  deleteCart,
  deleteCartItem,
  getloggedUserCart,
  updateCartItem,
} = require("../services/cartService");
const {
  addProdectValidator,
  updateCartItemValidator,
  deleteCartItemValidator,
  applyCouponValidator,
} = require("../validations/cartValidation");
const { authenticated, authorized } = require("../middlewares/auth");

router.use(authenticated, authorized("user"));

router
  .route("/")
  .get(getloggedUserCart)
  .delete(deleteCart)
  .post(addProdectValidator, addProdectToCart);
router.route("/applyCoupon").put(applyCouponValidator, applyCoupon);
router
  .route("/:id")
  .put(updateCartItemValidator, updateCartItem)
  .delete(deleteCartItemValidator, deleteCartItem);

module.exports = router;
