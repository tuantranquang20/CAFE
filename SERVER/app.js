const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const productRouter = require("./src/routes/product");
const cartRouter = require("./src/routes/cart");
const orderRouter = require("./src/routes/order");
const paymentRouter = require("./src/routes/payment");
const storeRouter = require("./src/routes/store");
const moviesRouter = require("./src/routes/movies");
const cinemaRouter = require("./src/routes/cinema");
const roomRouter = require("./src/routes/room");
const homeRouter = require("./src/routes/home");
const notificationRouter = require("./src/routes/notification");

require("./src/configs/db");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.use("/store", storeRouter);
app.use("/movie", moviesRouter);
app.use("/cinema", cinemaRouter);
app.use("/room", roomRouter);
app.use("/home", homeRouter);
app.use("/notification", notificationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
