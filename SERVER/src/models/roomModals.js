const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");

const roomSchema = new mongoose.Schema({
    idCinema :{
        type : mongoose.Schema.ObjectId,
        ref : REF.CINEMA,
        required : [true, "Phải thuộc 1 rạp nào đó"]
    },
    nameRoom : {
        type : String,
        required : [true, "Phải nhập tên phòng"],
        unique : true
    },
    numberSheet :{
        type : Number,
        required : [true, "Phải nhập số ghế có trong 1 phòng"]
    },
    rowSheet : {
        type : String,
        required : [true, "Phải nhập số hàng ghế"]
    },
});

const Room = mongoose.model(REF.ROOM, roomSchema);
module.exports = Room;
