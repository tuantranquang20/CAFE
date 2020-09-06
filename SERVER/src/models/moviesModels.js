const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");

const moviesSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: [true, "Phải thêm tên phim"],
  },
  price: {
    type: Number,
    required: [true, "Phải nhập giá bộ phim"],
  },
  description: {
    type: String,
    required: [true, "Phải nhập nội dung bộ phim"],
  },
  note: {
    type: String,
  },
  imgPath: {
    type: String,
    default: "img-default.jpg",
  },
  typeMovies: {
    type: mongoose.SchemaTypes.Mixed,
    enum: ["2D", "3D", "4d"],
    default: "2D",
  },
  directors: {
    type: String,
    required: [true, "Phải nhập tên đạo diễn"],
  },
  category: {
    type: String,
    required: [true, "Phải nhập thể loại phim"],
  },
  timeMovies: {
    type: Number,
    required: [true, "Phải nhập thời lượng bộ phim"],
  },
  timeStart: {
    type: Date,
  },
  timeEnd: {
    type: Date,
    validate: {
      validator: function (el) {
        return this.timeStart.getTime() < el.getTime();
      },
      message: "Ngày kết thúc không hợp lệ",
    },
  },
  language: {
    type: String,
  },
  trailer: {
    type: String,
  },
});

const Movie = mongoose.model(REF.MOVIE, moviesSchema);
module.exports = Movie;
