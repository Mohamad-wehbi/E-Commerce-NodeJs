const express = require("express");
const router = express.Router();
const {
  createCashOrder,
  getOrder,
  getOrders,
  getOrdersForUser,
  updateOrderToDelivered,
  updateOrderToPaid,
  checkoutSession,
} = require("../services/orderService");
const {
  updateOrderToPaidValidator,
  updateOrderToDeliveredValidator,
} = require("../validations/orderValidation");
const { authenticated, authorized } = require("../middlewares/auth");

router.use(authenticated);
router
  .route("/")
  .get(getOrdersForUser, getOrders)
  .post(authorized("user"), createCashOrder);

router.get("/checkoutSession", authorized("user"), checkoutSession);

router.get("/:id", authorized("admin"), getOrder);

router.put(
  "/:id/pay",
  authorized("admin"),
  updateOrderToPaidValidator,
  updateOrderToPaid
);

router.put(
  "/:id/deliver",
  authorized("admin"),
  updateOrderToDeliveredValidator,
  updateOrderToDelivered
);

module.exports = router;
