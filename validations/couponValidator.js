const joi = require("joi");
const getAllValidators = require("../utils/Validators");

//coupon schema
const couponSchema = (req) => ({
  create: joi.object().keys({
    key: joi.string().max(30).min(3).uppercase().alphanum().required(),
    expire: joi.date().required(),
    discount: joi.number().min(1).max(100).required(),
  }),
  update: joi.object().keys({
    key: joi.string().max(30).min(3).uppercase().alphanum(),
    expire: joi.date(),
    discount: joi.number().min(1).max(100),
  }),
  getOne_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  delete_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
});

//all validators
module.exports = getAllValidators(couponSchema);
