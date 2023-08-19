const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apiFeatures");
const ApiError = require("../utils/apiError");

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) filter = req.filterObj;

    //Build query with features
    const lengthOfDocuments = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .fields()
      .search()
      .paginate(lengthOfDocuments);

    //Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    let documents = await mongooseQuery;
    res
      .status(200)
      .json({ data: documents, paginationResult, length: documents.length });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) next(new ApiError(`No document for this id: ${id}`, 404));
    res.status(200).json({ data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!document) next(new ApiError(`No document for this id: ${id}`, 404));
    await document.save();
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) next(new ApiError(`No document for this id: ${id}`, 404));
    await document.remove();
    res.status(204).send();
  });

exports.getchildByParent = (prop) => (req, res, next) => {
  const filter = {};
  if (req.params[`${prop}Id`]) filter[prop] = req.params[`${prop}Id`];
  req.filterObj = filter;
  next();
};

exports.createChildByParent = (prop) => (req, res, next) => {
  if (!req.body[prop]) req.body[prop] = req.params[`${prop}Id`];
  next();
};
