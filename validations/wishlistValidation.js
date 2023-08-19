const joi = require("joi");
const getAllValidators = require("../utils/Validators");

//wishlist schema
const wishlistSchema = (req) => ({
  addProdect: joi.object().keys({
    prodect: joi.string().hex().length(24).required(),
  }),
  removeProdect_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
});

//all validators
module.exports = getAllValidators(wishlistSchema);
