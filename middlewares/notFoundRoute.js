const ApiError = require("../utils/apiError");

const notFoundRoute = (req, res, next) =>
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));

module.exports = notFoundRoute;
