const mongoose = require("mongoose");
const url = `mongodb://localhost:27017/cafe`;
mongoose.Promise = global.Promise;
// Connect MongoDB at default port 27017.
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
