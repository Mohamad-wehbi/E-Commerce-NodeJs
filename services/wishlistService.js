const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");

exports.addProdectToWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.user._id, 
    {$addToSet: { wishlist: req.body.prodect }},
    {new:true});
  res.status(200).json({data: user.wishlist, message: 'success'});
});

exports.removeProdectFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.user._id, 
    { $pull: { wishlist: req.params.id } },
    { new: true });
  res.status(200).json({data: user.wishlist, message: 'success'});
});

exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate('wishlist') 
  res.status(200).json({data: user.wishlist, result: user.wishlist.length});
  });