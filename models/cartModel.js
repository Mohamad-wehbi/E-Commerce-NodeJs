const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    cartItem: [
      {
        id: { type: mongoose.Types.ObjectId },
        prodect: { type: mongoose.Schema.ObjectId, ref: "Prodect" },
        quantity: { type: Number, default: 1 },
        color: { type: String },
        price: { type: Number },
        discountPrice: { type: Number },
      },
    ],
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    totalPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
