const joi = require("joi");
const getAllValidators = require("../utils/Validators");
const slugify = require("slugify");

//subCategory schema
const subCategorySchema = (req) => ({
  create: joi.object().keys({
    name: joi.string().max(30).min(3).required().custom((val) => (req.body.slug = slugify(val))),
    category: joi.string().hex().length(24).required(),
  }),
  update: joi.object().keys({
    name: joi.string().max(30).min(3).custom((val) => (req.body.slug = slugify(val))),
    category: joi.string().hex().length(24),
  }),
  getOne_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  delete_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
});

//all validators
module.exports = getAllValidators(subCategorySchema);
