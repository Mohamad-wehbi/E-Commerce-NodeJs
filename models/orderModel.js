const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cartItem: [
      {
        prodect: { type: mongoose.Schema.ObjectId, ref: "Prodect" },
        quantity: { type: Number, default: 1 },
        color: { type: String },
        price: { type: Number },
        discountPrice: { type: Number },
      },
    ],
    addresses: {
      alias: { type: String, required: true },
      details: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },

    totalOrederPrice: Number,
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    payType: { type: String, enum: ["cash", "card"], default: "cash" },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: Date,
    deliveredAt: Date,
    taxPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "userName email phoneNumber profileImg",
  }).populate({
    path: "cartItem.prodect",
    select: "title discription imageCover",
  });
  next();
});

module.exports = mongoose.model("Order", orderSchema);
