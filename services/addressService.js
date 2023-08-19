const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const ApiError = require("../utils/apiError");

exports.addAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.user._id, 
    {$addToSet: { addresses: req.body }},
    {new:true});
  const indIndex = user.addresses.length -1;  
  res.status(201).json({data: user.addresses[indIndex], message: 'success'});
});

exports.removeAddress = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, 
    { $pull: { addresses: {_id: req.params.id} } },
    { new: true });
  res.status(204).json({message: 'this address removed'});
});

exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate('addresses') 
  res.status(200).json({data: user.addresses, result: user.addresses.length});
});

exports.updateAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);
  const index = req.user.addresses.findIndex((address)=> address._id == req.params.id);
  if(index == -1)next(new ApiError(`there is no address for this id:${req.params.id}`, 404))
  const address = user.addresses[index];
  address.alias = req.body.alias || address.alias;
  address.details = req.body.details || address.details;
  address.phone = req.body.phone || address.phone;
  address.city = req.body.city || address.city;
  address.country = req.body.country || address.country;
  address.postalCode = req.body.postalCode || address.alias;
  user.addresses[index] = address;
  const newUser = await user.save()
  res.status(200).json({data: newUser.addresses[index], message: 'this address updated'});
});