const factory = require("./factory");
const SubCategoryModel = require("../models/subCategoryModel");

exports.getSubCategoriesByCat = factory.getchildByParent("category");
exports.createSubCategoryByCat = factory.createChildByParent("category");

exports.getSubCategories = factory.getAll(SubCategoryModel);
exports.getSubCategory = factory.getOne(SubCategoryModel);
exports.createSubCategory = factory.createOne(SubCategoryModel);
exports.updateSubCategory = factory.updateOne(SubCategoryModel);
exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);
