const factory = require("./factory");
const ProdectModel = require("../models/prodectModel");
const { uploadManyImages } = require("../middlewares/uploadImage");
const { resizeManyImages } = require("../middlewares/resizeImage");

const images = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
];

const options = [
  { name: "imageCover", folder: "prodect", type: "var" },
  { name: "images", folder: "prodect", type: "arr" },
];

exports.resizeProdectImages = resizeManyImages(options);
exports.uploadProdectImages = uploadManyImages(images);
exports.getProdects = factory.getAll(ProdectModel);
exports.getProdect = factory.getOne(ProdectModel);
exports.createProdect = factory.createOne(ProdectModel);
exports.updateProdect = factory.updateOne(ProdectModel);
exports.deleteProdect = factory.deleteOne(ProdectModel);
