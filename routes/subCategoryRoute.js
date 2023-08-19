const express = require("express");
const {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  createSubCategoryByCat,
  getSubCategoriesByCat,
} = require("../services/subCategoryService");
const {
  createValidator,
  deleteValidator,
  getOneValidator,
  updateValidator,
} = require("../validations/subCategoryValidation");
const { authenticated, authorized } = require("../middlewares/auth");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authenticated,
    authorized("admin", "manager"),
    createSubCategoryByCat,
    createValidator,
    createSubCategory
  )
  .get(getSubCategoriesByCat, getSubCategories);
router
  .route("/:id")
  .get(getOneValidator, getSubCategory)
  .put(
    authenticated,
    authorized("admin", "manager"),
    updateValidator,
    updateSubCategory
  )
  .delete(
    authenticated,
    authorized("admin", "manager"),
    deleteValidator,
    deleteSubCategory
  );

module.exports = router;
