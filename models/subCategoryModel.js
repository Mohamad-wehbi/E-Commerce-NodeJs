const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {type: String,required: true,unique: true,maxlength: 32,minlength: 3},
    slug: { type: String, required: true, lowercase: true },
    category: {type: mongoose.Schema.ObjectId,ref: "Category",required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
