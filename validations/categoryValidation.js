const joi = require("joi");
const getAllValidators = require("../utils/Validators");
const slugify = require('slugify');

//Category schema
const categorySchema = (req) => ({
  create: joi.object().keys({
    name: joi.string().max(30).min(3).required().custom(val => req.body.slug = slugify(val)),
    image: joi.string().required(),
  }),
  update: joi.object().keys({
    name: joi.string().max(30).min(3).custom(val => req.body.slug = slugify(val)),
    image: joi.string(),
  }),
  getOne_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  delete_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
});

//all validators
module.exports = getAllValidators(categorySchema);
