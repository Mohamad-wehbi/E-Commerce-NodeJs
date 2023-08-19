const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerUpload = () => {
  const storage = multer.memoryStorage();
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new ApiError("Only Images allowed", 400), false);
  };
  return multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 10 } });
};
const upload = multerUpload();
exports.uploadSingleImage = (name) => upload.single(name);
exports.uploadManyImages = (array) => upload.fields(array);
