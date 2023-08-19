const joi = require("joi");
const getAllValidators = require("../utils/Validators");

//Cart schema
const cartSchema = (req) => ({
  addProdect: joi.object().keys({
    prodect: joi.string().hex().length(24).required(),
    quantity: joi.number().min(1).required(),
    color: joi.string().required(),
  }),
  updateCartItem: joi.object().keys({
    quantity: joi.number().min(1),
  }),
  deleteCartItem_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  applyCoupon: joi.object().keys({
    key: joi.string().uppercase().alphanum().required(),
  }),
});

//all validators
module.exports = getAllValidators(cartSchema);
