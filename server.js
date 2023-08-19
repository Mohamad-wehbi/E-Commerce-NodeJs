const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
const mountRoutes = require("./routes");
const connectDatabase = require("./config/database");
const globalError = require("./middlewares/globalError");
const handleRejection = require("./utils/regError");
const cors = require("cors");
const compression = require("compression");
const { webhookCheckout } = require("./services/orderService");
const expressRateLimit = require("./utils/rateLimiter");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

//connect database
connectDatabase();

//express app
const app = express();

//Enable other domains to access your application
app.use(cors());
app.options("*", cors());

//compress all responses
app.use(compression());

//Checkout webhook
app.get("/webhook", express.raw({ type: "application/json" }), webhookCheckout);

//middelewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json({ limit: "30kb" }));
app.use(express.static(path.join(__dirname, "images")));

//to apply data sanitization
app.use(mongoSanitize());
app.use(xss());

//Apply the rate limiting middleware
expressRateLimit(app);

//Add the HPP middleware
app.use(hpp({ whitelist: ["price"] }));

//mount all routes
mountRoutes(app);

//Global error handling middleware for express
app.use(globalError);

//running server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`App Running on ${PORT}`));

// Handle rejection outside express
handleRejection(server);