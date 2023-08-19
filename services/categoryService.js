const factory = require("./factory");
const CategoryModel = require("../models/categoryModel");
const { uploadSingleImage } = require("../middlewares/uploadImage");
const { resizeSingleImage } = require("../middlewares/resizeImage");

exports.resizeCategoryImage = resizeSingleImage("image", "category");
exports.uploadCategoryImage = uploadSingleImage("image");
exports.getCategories = factory.getAll(CategoryModel);
exports.getCategory = factory.getOne(CategoryModel);
exports.createCategory = factory.createOne(CategoryModel);
exports.updateCategory = factory.updateOne(CategoryModel);
exports.deleteCategory = factory.deleteOne(CategoryModel);
