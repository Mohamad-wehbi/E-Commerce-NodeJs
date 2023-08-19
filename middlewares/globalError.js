//send error for dev mode
const devError = (err, res) => {
  const { status, message, stack } = err;
  return res.status(err.statusCode).json({ status, message, stack });
};

//send error for prod mode
const prodError = (err, res) => {
  const { status, message } = err;
  return res.status(err.statusCode).json({ status, message });
};

//global express error
const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  process.env.NODE_ENV === "development"
    ? devError(err, res)
    : prodError(err, res);
};

module.exports = globalError;
