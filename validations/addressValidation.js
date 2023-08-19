const joi = require("joi");
const getAllValidators = require("../utils/Validators");

//address schema
const addressSchema = (req) => ({
  addAddress: joi.object().keys({
    alias: joi.string().min(2).max(30).required(),
    details: joi.string().min(2).max(100).required(),
    phone: joi.string().pattern(/[6-9]{1}[0-9]{9}/).required(),
    city: joi.string().min(2).max(30).required(),
    country: joi.string().min(2).max(30).required(),
    postalCode: joi.string().length(6).required(),
  }),
  updateAddress: joi.object().keys({
    alias: joi.string().min(2).max(30),
    details: joi.string().min(2).max(100),
    phone: joi.string().pattern(/[6-9]{1}[0-9]{9}/),
    city: joi.string().min(2).max(30),
    country: joi.string().min(2).max(30),
    postalCode: joi.string().length(6),
  }),
  removeAddress_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
});

//all validators
module.exports = getAllValidators(addressSchema);
