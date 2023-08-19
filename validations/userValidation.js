const joi = require("joi");
const getAllValidators = require("../utils/Validators");
const slugify = require('slugify');

//user schema
const userSchema = (req) => ({
  create: joi.object().keys({
    userName: joi.string().trim().required().custom(val => req.body.slug = slugify(val)),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    phoneNumber: joi.string().pattern(/[6-9]{1}[0-9]{9}/),
    profileImg: joi.string(),
    role: joi.valid('user', 'manager', 'admin'),
  }),
  update: joi.object().keys({
    userName: joi.string().trim().custom(val => req.body.slug = slugify(val)),
    email: joi.string().email(),
    phoneNumber: joi.string().pattern(/[6-9]{1}[0-9]{9}/),
    profileImg: joi.string(),
    role: joi.valid('user', 'manager', 'admin'),
  }),
  getOne_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  delete_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  updateMe: joi.object().keys({
    userName: joi.string().trim().custom(val => req.body.slug = slugify(val)),
    email: joi.string().email(),
    phoneNumber: joi.string().pattern(/[6-9]{1}[0-9]{9}/),
    profileImg: joi.string(),
  }),
  deleteMe_p: joi.object().keys({
    id: joi.custom(val => req.params.id = req.user._id),
  }),
  changePassword: joi.object().keys({
    password: joi.string().trim().min(8),
    newPassword: joi.string().trim().min(8),
    confirmNewPassword: joi.string().trim().min(8).valid(joi.ref('newPassword')),
  }),
});

//all validators
module.exports = getAllValidators(userSchema);
