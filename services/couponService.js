const factory = require("./factory");
const CouponModel = require("../models/couponModel");

exports.getSubCoupons = factory.getAll(CouponModel);
exports.getSubCoupon = factory.getOne(CouponModel);
exports.createSubCoupon = factory.createOne(CouponModel);
exports.updateSubCoupon = factory.updateOne(CouponModel);
exports.deleteSubCoupon = factory.deleteOne(CouponModel);
