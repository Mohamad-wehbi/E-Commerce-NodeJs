const mongoose = require("mongoose");
const { addImageUrl } = require("../utils/imageUrl");

const brandSchema = new mongoose.Schema(
  {
    name: {type: String,required: true,unique: true,maxlength: 32,minlength: 3},
    slug: {type: String,required: true,lowercase: true},
    image: {type: String,required: true},
  },
  { timestamps: true }
);

brandSchema.post("init", (doc) => addImageUrl(doc, "image", "brand"));
brandSchema.post("save", (doc) => addImageUrl(doc, "image", "brand"));

module.exports = mongoose.model("Brand", brandSchema);
