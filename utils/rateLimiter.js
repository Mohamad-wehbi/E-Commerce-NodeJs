const rateLimit = require("express-rate-limit");

const expressRateLimit = (app) => {
  const rateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many accounts created from this IP, please try again after an hour",
  });
  app.use("/api/v1/auth/login", rateLimiter);
  app.use("/api/v1/auth/forgotPassword", rateLimiter);
  app.use("/api/v1/users/me/changePassword", rateLimiter);
};

module.exports = expressRateLimit;
