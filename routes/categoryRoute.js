const express = require("express");
const subCategoryRoute = require("./subCategoryRoute");
const { authenticated, authorized } = require("../middlewares/auth");
const {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
  resizeCategoryImage,
  uploadCategoryImage,
} = require("../services/categoryService");
const {
  createValidator,
  deleteValidator,
  getOneValidator,
  updateValidator,
} = require("../validations/categoryValidation");
const router = express.Router({ mergeParams: true });

router.use("/:categoryId/subcategories", subCategoryRoute);
router
  .route("/")
  .post(
    authenticated,
    authorized("admin", "manager"),
    uploadCategoryImage,
    resizeCategoryImage,
    createValidator,
    createCategory
  )
  .get(getCategories);
router
  .route("/:id")
  .get(getOneValidator, getCategory)
  .put(
    authenticated,
    authorized("admin", "manager"),
    uploadCategoryImage,
    resizeCategoryImage,
    updateValidator,
    updateCategory
  )
  .delete(
    authenticated,
    authorized("admin", "manager"),
    deleteValidator,
    deleteCategory
  );

module.exports = router;
