const CartModel = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const CouponModel = require("../models/couponModel");
const ProdectModel = require("../models/prodectModel");

const calcPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItem.forEach((el) => {
    if (el.discountPrice) totalPrice += el.discountPrice * el.quantity;
    else totalPrice += el.price * el.quantity;
  });
  cart.totalPrice = totalPrice;
};

exports.addProdectToCart = asyncHandler(async (req, res, next) => {
  const prodect = await ProdectModel.findById(req.body.prodect);
  if (!prodect)
    next(new ApiError(`there is no prodect for this id: ${req.body.prodect}`));
  req.body.price = prodect.price;
  let cart = await CartModel.findOne({ user: req.user._id });
  if (!cart)
    cart = await CartModel.create({ user: req.user._id, cartItem: [req.body] });
  else {
    const indexProdect = cart.cartItem.findIndex(
      (el) => el.prodect == req.body.prodect && el.color == req.body.color
    );
    if (indexProdect > -1) cart.cartItem[indexProdect].quantity += 1;
    else cart.cartItem.push(req.body);
  }
  calcPrice(cart);
  await cart.save();
  res.status(200).json({ data: cart, numOfCartItems: cart.cartItem.length });
});

exports.getloggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) next(new ApiError("there is no cart for logged user", 404));
  res.status(200).json({ data: cart, numOfCartItems: cart.cartItem.length });
});

exports.deleteCartItem = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItem: { _id: req.params.id } } },
    { new: true }
  );
  calcPrice(cart);
  await cart.save();
  res.status(200).json({ data: cart, numOfCartItems: cart.cartItem.length });
});

exports.deleteCart = asyncHandler(async (req, res, next) => {
  await CartModel.findOneAndDelete({ user: req.user._id });
  res.status(204).json({ message: "Cart deleted successfully" });
});

exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) next(new ApiError("there is no cart for logged user"));
  const index = cart.cartItem.findIndex((item) => item._id == id);
  if (index == -1)
    next(new ApiError(`there is no item for this id: ${id}`, 404));
  cart.cartItem[index].quantity = req.body.quantity;
  calcPrice(cart);
  await cart.save();
  res.status(200).json({ data: cart, numOfCartItems: cart.cartItem.length });
});

exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) next(new ApiError("there is no cart for logged user"));
  const coupon = await CouponModel.findOne({
    key: req.body.key,
    expire: { $gt: Date.now() },
  });
  if (!coupon) next(new ApiError("The key is not valid or expire", 400));
  cart.cartItem.forEach((el) => {
    el.discountPrice =
      el.price - ((el.price * coupon.discount) / 100).toFixed(2);
  });
  calcPrice(cart);
  await cart.save();
  res.status(200).json({ data: cart, numOfCartItems: cart.cartItem.length });
});
