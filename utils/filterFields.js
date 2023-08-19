const filterFiels = (document) => {
  delete document._doc.password;
  delete document._doc.passwordChangedAt;
  delete document._doc.passwordResetCode;
  delete document._doc.passwordResetExpires;
  delete document._doc.passwordResetVerified;
  delete document._doc.loged;
  delete document._doc.role;
  return document;
};

module.exports = filterFiels;
