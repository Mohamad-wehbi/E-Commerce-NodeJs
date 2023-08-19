const mongoose = require("mongoose");
const { addImageUrl } = require("../utils/imageUrl");

const categorySchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true, maxlength: 32, minlength: 3},
    slug: {type: String, required: true, lowercase: true},
    image: {type: String, required: true},
  },
  { timestamps: true }
);

categorySchema.post("init", (doc) => addImageUrl(doc, "image", "category"));
categorySchema.post("save", (doc) => addImageUrl(doc, "image", "category"));

module.exports = mongoose.model("Category", categorySchema);
