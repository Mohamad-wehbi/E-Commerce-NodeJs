const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const buildSharp = async (fileName, folderName, obj) => {
  await sharp(obj.buffer)
    .resize(1280, 800)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(`images/${folderName}/${fileName}`);
};

const resizeImages = (fieldName, folderName, type, req) => {
  req.body[fieldName] = [];
  const arr = req.files[fieldName];
  if (arr) {
    arr.forEach(async (image, i) => {
      const fileName = `${i}-${folderName}-${uuidv4()}-${Date.now()}.jpeg`;
      buildSharp(fileName, folderName, image);
      if (type === "var") req.body[fieldName] = fileName;
      if (type === "arr") req.body[fieldName][i] = fileName;
    });
  }
};

exports.resizeSingleImage = (fieldName, folderName) =>
  asyncHandler((req, res, next) => {
    if (req.file) {
      const fileName = `${folderName}-${uuidv4()}-${Date.now()}.jpeg`;
      buildSharp(fileName, folderName, req.file);
      req.body[fieldName] = fileName;
    }
    next();
  });

exports.resizeManyImages = (array) =>
  asyncHandler((req, res, next) => {
    if (req.files) {
      array.forEach((imgOption) => {
        const { name, folder, type } = imgOption;
        resizeImages(name, folder, type, req);
      });
    }

    next();
  });
