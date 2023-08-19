const express = require("express");
const {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
  resizeUserImage,
  uploadUserImage,
  sendUserIdToParams,
  changePassword,
  updateLoggedUser,
  getLoggedUser,
} = require("../services/userService");
const {
  createValidator,
  deleteValidator,
  getOneValidator,
  updateValidator,
  updateMeValidator,
  changePasswordValidator,
  deleteMeValidator,
  getMeValidator,
} = require("../validations/userValidation");
const { authenticated, authorized } = require("../middlewares/auth");
const router = express.Router();
router.use(authenticated);

//admin route
router
  .route("/")
  .post(
    authorized("admin"),
    uploadUserImage,
    resizeUserImage,
    createValidator,
    createUser
  )
  .get(authorized("admin", "manager"), getUsers);
router
  .route("/:id")
  .get(authorized("admin", "manager"), getOneValidator, getUser)
  .put(
    authorized("admin"),
    uploadUserImage,
    resizeUserImage,
    updateValidator,
    updateUser
  )
  .delete(authorized("admin"), deleteValidator, deleteUser);

//user route
router.put("/me/changePassword", changePasswordValidator, changePassword);
router.get("/me/get", getLoggedUser);
router.delete("/me/delete", deleteMeValidator, deleteUser);
router.put(
  "/me/update",
  uploadUserImage,
  resizeUserImage,
  updateMeValidator,
  updateLoggedUser
);
module.exports = router;
