const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const OrderModel = require("../models/orderModel");
const CartModel = require("../models/cartModel");
const ProdectModel = require("../models/prodectModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./factory");
const UserModel = require("../models/userModel");

const bulkOption = (cart) =>
  cart.cartItem.map((item) => ({
    updateOne: {
      filter: { _id: item.prodect },
      update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
    },
  }));

exports.createCashOrder = asyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) next(new ApiError("there is no cart for logged user", 404));
  const taxPrice = 0;
  const shippingPrice = 0;
  cart.totalPrice += taxPrice + shippingPrice;
  const order = await OrderModel.create({
    user: req.user._id,
    cartItem: cart.cartItem,
    addresses: req.user.addresses[req.user.addresses.length - 1],
    totalOrederPrice: cart.totalPrice,
    shippingPrice,
    taxPrice,
  });
  if (cart) await ProdectModel.bulkWrite(bulkOption(order), {});
  await CartModel.findByIdAndDelete(cart._id);
  res.status(201).json({ data: order, status: "success" });
});

exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    { isPaid: true, paidAt: Date.now() },
    { new: true }
  );
  if (!order) next(new ApiError(`there is no order for this id: ${id}`, 404));
  res.status(200).json({ data: order, status: "success" });
});

exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    { isDelivered: true, deliveredAt: Date.now() },
    { new: true }
  );
  if (!order) next(new ApiError(`there is no order for this id: ${id}`, 404));
  res.status(200).json({ data: order, status: "success" });
});

exports.getOrdersForUser = asyncHandler(async (req, res, next) => {
  if (req.user.role == "user") req.filterObj = { user: req.user._id };
  next();
});

exports.checkoutSession = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const cart = await CartModel.findOne({ user: req.user._id }).populate({
    path: "cartItem.prodect",
  });
  if (!cart) next(new ApiError("there is no cart for logged user", 404));
  const session = await stripe.checkout.sessions.create({
    line_items: cart.cartItem.map((el) => {
      let price = el.discountPrice || el.price;
      price += taxPrice;
      return {
        price_data: {
          currency: "usd",
          unit_amount: price * 100,
          product_data: {
            name: el.prodect.title,
            description: el.prodect.description,
            images: [el.prodect.imageCover],
          },
        },
        quantity: el.quantity,
      };
    }),
    mode: "payment",
    customer_email: req.user.email,
    client_reference_id: String(cart._id),
    success_url: `${req.protocol}://${req.get("host")}/orders`,
    cancel_url: `${req.protocol}://${req.get("host")}/cart`,
  });
  console.log(session.client_reference_id);

  res.status(200).send({ url: session });
});

const createCardOrder = async (session) => {
  const totalOrederPrice = session.amount_total / 100;
  const cart = await CartModel.findById(session.client_reference_id);
  const user = await UserModel.findOne({ email: session.customer_email });
  const order = await OrderModel.create({
    user: user._id,
    cartItem: cart.cartItem,
    addresses: user.addresses[user.addresses.length - 1],
    totalOrederPrice,
    isPaid: true,
    paidAt: Date.now(),
    payType: "card",
  });
  if (order) await ProdectModel.bulkWrite(bulkOption(cart), {});
  await CartModel.findByIdAndDelete(card._id);
  res.status(200).json({ data: order, status: "success" });
};

exports.webhookCheckout = asyncHandler(async (req, res, next) => {
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET_KEY
    );
  } catch (err) {
    return next(new ApiError(`Webhook Error: ${err.message}`, 400));
  }
  if (event.type === "checkout.session.completed")
    createCardOrder(event.data.object);
  res.status(200).json({ received: true });
});

exports.getOrders = factory.getAll(OrderModel);
exports.getOrder = factory.getOne(OrderModel);
