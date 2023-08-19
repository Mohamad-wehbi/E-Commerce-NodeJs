const crypto = require("crypto");

const hashedResetCode = (resetCode) =>
  crypto.createHash("sha256").update(resetCode).digest("hex");

module.exports = hashedResetCode;
