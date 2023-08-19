const factory = require("./factory");
const BrandModel = require("../models/brandModel");
const { uploadSingleImage } = require("../middlewares/uploadImage");
const { resizeSingleImage } = require("../middlewares/resizeImage");

exports.resizeBrandImage = resizeSingleImage("image", "Brand");
exports.uploadBrandImage = uploadSingleImage("image");
exports.getBrands = factory.getAll(BrandModel);
exports.getBrand = factory.getOne(BrandModel);
exports.createBrand = factory.createOne(BrandModel);
exports.updateBrand = factory.updateOne(BrandModel);
exports.deleteBrand = factory.deleteOne(BrandModel);
