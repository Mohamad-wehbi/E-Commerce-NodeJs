const express = require("express");
const {
  createProdect,
  deleteProdect,
  getProdect,
  getProdects,
  updateProdect,
  resizeProdectImages,
  uploadProdectImages,
} = require("../services/prodectService");
const {
  createValidator,
  deleteValidator,
  getOneValidator,
  updateValidator,
} = require("../validations/prodectValidation");
const { authenticated, authorized } = require("../middlewares/auth");
const reviewRoute = require("../routes/reviewRoute");
const router = express.Router();
router.use("/:prodectId/reviews", reviewRoute);

router
  .route("/")
  .post(
    authenticated,
    authorized("admin", "manager"),
    uploadProdectImages,
    resizeProdectImages,
    createValidator,
    createProdect
  )
  .get(getProdects);
router
  .route("/:id")
  .get(getOneValidator, getProdect)
  .put(
    authenticated,
    authorized("admin", "manager"),
    uploadProdectImages,
    resizeProdectImages,
    updateValidator,
    updateProdect
  )
  .delete(
    authenticated,
    authorized("admin", "manager"),
    deleteValidator,
    deleteProdect
  );

module.exports = router;
