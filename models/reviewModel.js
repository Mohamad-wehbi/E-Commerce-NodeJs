const mongoose = require("mongoose");
const ProdectModel = require('../models/prodectModel');

const reviewSchema = new mongoose.Schema(
  {
    ratings: { type: Number, min: 1, max: 5, required: true },
    description: { type: String, min: 2, max: 100 },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    prodect: { type: mongoose.Schema.ObjectId, ref: "Prodect", required: true },
  },
  { timestamps: true }
);

reviewSchema.statics.calcAvgRatingsAndCuantity = async function (prodectId){
  const result = await this.aggregate([
    { $match: { prodect :prodectId } },
    { $group: { _id: prodectId, ratingsAverage:{ $avg: '$ratings' }, ratingsQuantity:{ $sum : 1 }}}
  ]);
  if(result.length){
    const {ratingsAverage, ratingsQuantity} = result[0];
    await ProdectModel.findByIdAndUpdate(prodectId, {ratingsAverage, ratingsQuantity});
  }
};

reviewSchema.post('save', async function() 
  {await this.constructor.calcAvgRatingsAndCuantity(this.prodect)});
reviewSchema.post('remove', async function() 
  {await this.constructor.calcAvgRatingsAndCuantity(this.prodect)});


module.exports = mongoose.model("Review", reviewSchema);
