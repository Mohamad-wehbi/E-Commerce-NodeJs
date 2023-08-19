const express = require("express");
const {
  createBrand,
  deleteBrand,
  getBrands,
  getBrand,
  updateBrand,
  resizeBrandImage,
  uploadBrandImage,
} = require("../services/brandService");
const {
  createValidator,
  deleteValidator,
  getOneValidator,
  updateValidator,
} = require("../validations/brandValidation");
const { authenticated, authorized } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .post(
    authenticated,
    authorized("admin", "manager"),
    uploadBrandImage,
    resizeBrandImage,
    createValidator,
    createBrand
  )
  .get(getBrands);
router
  .route("/:id")
  .get(getOneValidator, getBrand)
  .put(
    authenticated,
    authorized("admin", "manager"),
    uploadBrandImage,
    resizeBrandImage,
    updateValidator,
    updateBrand
  )
  .delete(
    authenticated,
    authorized("admin", "manager"),
    deleteValidator,
    deleteBrand
  );

module.exports = router;
