const joi = require("joi");
const getAllValidators = require("../utils/Validators");
const slugify = require("slugify");

//Prodect schema
const prodectSchema = (req) => ({
  create: joi.object().keys({
    title: joi.string().max(100).min(2).required().custom((val) => (req.body.slug = slugify(val))),
    description: joi.string().min(20).max(300).required(),
    quantity: joi.number().required(),
    price: joi.number().required(),
    priceAfterDiscounte: joi.number().custom((v, { error }) => {
      if (v >= req.body.price) return error("priceAfterDiscounte is not valid")}),
    imageCover: joi.string(),
    images: joi.array().items(joi.string()),
    colors: joi.array().items(joi.string()),
    category: joi.string().hex().length(24).required(),
    brand: joi.string().hex().length(24),
    subCategories: joi.array().items(joi.string().hex().length(24)),
  }),
  update: joi.object().keys({
    title: joi.string().max(100).min(2).custom((val) => (req.body.slug = slugify(val))),
    description: joi.string().min(20).max(300),
    quantity: joi.number(),
    price: joi.number(),
    priceAfterDiscounte: joi.number().custom((v, { error }) => {
      if (v >= req.body.price) return error("priceAfterDiscounte is not valid")}),
    imageCover: joi.string(),
    images: joi.array().items(joi.string()),
    colors: joi.array().items(joi.string()),
    category: joi.string().hex().length(24),
    brand: joi.string().hex().length(24),
    subCategories: joi.array().items(joi.string().hex().length(24)),
  }),
  getOne_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
  delete_p: joi.object().keys({
    id: joi.string().hex().length(24).required(),
  }),
});

//all validators
module.exports = getAllValidators(prodectSchema);
