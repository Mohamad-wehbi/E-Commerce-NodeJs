const joi = require("joi");
const getAllValidators = require("../utils/Validators");

//Order schema
const orderSchema = (req) => ({
  updateOrderToPaid_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  updateOrderToDelivered_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
});

//all validators
module.exports = getAllValidators(orderSchema);
