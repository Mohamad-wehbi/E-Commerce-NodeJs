const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { addImageUrl } = require("../utils/imageUrl");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, trim: true, required: true },
    slug: { type: String, lowercase: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, min: 8, required: true },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    phoneNumber: String,
    profileImg: String,
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Prodect" }],
    loged: { type: Boolean, default: true },
    role: { type: String, enum: ["user", "manager", "admin"], default: "user" },
    addresses: [
      {
        id: { type: mongoose.Types.ObjectId },
        alias: { type: String },
        details: { type: String },
        phone: { type: String },
        city: { type: String },
        country: { type: String },
        postalCode: { type: String },
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.post("save", (doc) => addImageUrl(doc, "profileImg", "user"));
userSchema.post("init", (doc) => addImageUrl(doc, "profileImg", "user"));

module.exports = mongoose.model("User", userSchema);
