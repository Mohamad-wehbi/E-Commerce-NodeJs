const validator = (schema, property, path) => (req, res, next) => {
  const schemaObj = schema(req)[property];
  const { error } = schemaObj.validate(req[path]);
  if (error) res.status(400).json({ messege: error.details[0].message });
  next();
};

module.exports = validator;
