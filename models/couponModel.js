const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    expire: { type: Date, required: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
