const joi = require("joi");
const getAllValidators = require("../utils/Validators");
const slugify = require('slugify');

//auth schema
const authSchema = (req) => ({
  signup: joi.object().keys({
    userName: joi.string().max(30).min(2).required().custom(val => req.body.slug = slugify(val)),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
  login: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
  forgotPassword: joi.object().keys({
    email: joi.string().email().required(),
  }),
  verifyResetCode: joi.object().keys({
    resetCode: joi.string().min(6).max(6).required(),
  }),
  resetPassword: joi.object().keys({
    email: joi.string().email().required(),
    newPassword: joi.string().min(8).required(),
    confirmNewPassword: joi.string().min(8).required().valid(joi.ref('newPassword')),
  }),
});

//all validators
module.exports = getAllValidators(authSchema);
