const joi = require("joi");
const getAllValidators = require("../utils/Validators");

//review schema
const reviewSchema = (req) => ({
  create: joi.object().keys({
    ratings: joi.number().max(5).min(1).required(),
    description: joi.string().max(100).min(2).custom((v)=> req.body.user= req.user._id),
    prodect: joi.string().hex().length(24).required(),
  }),
  update: joi.object().keys({
    ratings: joi.number().max(5).min(1).required(),
    description: joi.string().max(100).min(2),
  }),
  getOne_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  delete_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
});

//all validators
module.exports = getAllValidators(reviewSchema);
