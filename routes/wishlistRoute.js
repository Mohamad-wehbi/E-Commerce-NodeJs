const express = require("express");
const {
  addProdectToWishlist,
  getLoggedUserWishlist,
  removeProdectFromWishlist,
} = require("../services/wishlistService");
const {
  addProdectValidator,
  removeProdectValidator,
} = require("../validations/wishlistValidation");
const { authenticated, authorized } = require("../middlewares/auth");

const router = express.Router();
router.use(authenticated, authorized("user"));

router
  .route("/")
  .post(addProdectValidator, addProdectToWishlist)
  .get(getLoggedUserWishlist);
router.delete("/:id", removeProdectValidator, removeProdectFromWishlist);

module.exports = router;
