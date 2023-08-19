const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((connect) => console.log("Database Connected!"))
    .catch((err) => {
      console.error(`Database Error: ${err}`);
      process.exit(1);
    });
};

module.exports = connectDatabase;
