const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const io = require("socket.io")();
const handleMessage = require("./src/ultils/message");

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
const chatRouter = require("./src/routes/chat");
const orderBookingRouter = require("./src/routes/orderBooking");
const seatBookedRouter = require("./src/routes/seatBooked");

require("./src/configs/db");

const app = express();
// app.enable("trust proxy");

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

// app.use(function (request, response, next) {
//   if (process.env.NODE_ENV != "development" && !request.secure) {
//     return response.redirect("https://" + request.headers.host + request.url);
//   }

//   next();
// });

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
app.use("/chat", chatRouter);
app.use("/orderBooking", orderBookingRouter);
app.use("/seatBooked", seatBookedRouter);

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

//socket

// const user = {};
// let currentUserId = 2;

// io.on("connection", (socket) => {
//   user[socket.id] = { userId: currentUserId++ };
//   socket.on("join", (username) => {
//     user[socket.id].username = username;
//     /* socket.id = {
//     userId : 2,
//     username : "acb"
//   } */
//     handleMessage(socket, user);
//   });
//   socket.on('action', (action) => {
//     if(action.type === 'server/hello'){
//       console.log('Got hello data!', action.data);
//       socket.emit('action', {type:'message', data:'good day!'});
//     }
//   });
// });

// io.listen(3001);

module.exports = app;
