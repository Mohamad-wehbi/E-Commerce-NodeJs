const mongoose = require("mongoose");
const { addImageUrl, addImagesUrl } = require("../utils/imageUrl");

const prodectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, max: 2, min: 100 },
    slug: { type: String, lowercase: true, required: true },
    description: { type: String, min: 20, max: 300, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    price: { type: Number, required: true },
    priceAfterDiscounte: { type: Number },
    ratingsQuantity: { type: Number, default: 0 },
    ratingsAverage: { type: Number, min: 0, max: 5, default: 0 },
    imageCover: { type: String, required: true },
    images: [String],
    colors: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: { type: mongoose.Schema.ObjectId, ref: "Brand" },
    subCategories: [{ type: mongoose.Schema.ObjectId, ref: "SubCategory" }],
  },
  { timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, }
);

prodectSchema.virtual("review", {
  ref: "Review",
  foreignField: "prodect",
  localField: "_id",
});

prodectSchema.pre(/^find/, function (next) {
  this.populate({ path: "category", select: "name -_id" });
  next();
});

const addUrlForImg = (doc) => {
  addImageUrl(doc, "imageCover", "prodect");
  addImagesUrl(doc, "images", "prodect");
};
prodectSchema.post("init", (doc) => addUrlForImg(doc));
prodectSchema.post("save", (doc) => addUrlForImg(doc));

module.exports = mongoose.model("Prodect", prodectSchema);
