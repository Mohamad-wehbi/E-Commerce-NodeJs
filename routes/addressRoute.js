const express = require("express");
const {
  addAddress,
  getLoggedUserAddresses,
  removeAddress,
  updateAddress,
} = require("../services/addressService");
const {
  addAddressValidator,
  removeAddressValidator,
  updateAddressValidator,
} = require("../validations/addressValidation");
const { authenticated, authorized } = require("../middlewares/auth");
const router = express.Router();

router.use(authenticated, authorized("user"));
router
  .route("/")
  .post(addAddressValidator, addAddress)
  .get(getLoggedUserAddresses);
router
  .route("/:id")
  .delete(removeAddressValidator, removeAddress)
  .put(updateAddressValidator, updateAddress);

module.exports = router;
