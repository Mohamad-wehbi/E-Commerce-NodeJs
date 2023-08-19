const express = require("express");
const {
  signup,
  login,
  logout,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} = require("../services/authService");
const {
  signupValidator,
  loginValidator,
  forgotPasswordValidator,
  verifyResetCodeValidator,
  resetPasswordValidator,
} = require("../validations/authValidation");
const { authenticated } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/logout", authenticated, logout);
router.post("/forgotPassword", forgotPasswordValidator, forgotPassword);
router.post("/verifyResetCode", verifyResetCodeValidator, verifyResetCode);
router.put("/resetPassword", resetPasswordValidator, resetPassword);

module.exports = router;
