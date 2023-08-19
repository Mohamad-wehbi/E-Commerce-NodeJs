const validate = require("../middlewares/validatorMiddleware");

const getPath = (name) => (name.endsWith("_p") ? "params" : "body");

//get all validators
const getAllValidators = (Schema) => {
  let state = "";
  const schemaObj = {};
  const keys = Object.keys(Schema());
  keys.forEach((el) => {
    state = getPath(el);
    schemaObj[`${el.split("_p").join("")}Validator`] = validate(Schema,el,state);
  });
  return schemaObj;
};
module.exports = getAllValidators;
