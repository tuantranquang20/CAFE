const Sequelize = require("sequelize");
const { debug } = require("../utils/constant");
const CONSTANT = require("../utils/constant");

// const USER = require('./models/USER.js');

const env = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456Aa@",
  database: process.env.DB_NAME || "kasonlu"
};

const sequelize = new Sequelize(env.database, env.user, env.password, {
  host: env.host,
  dialect: "mysql",
  logging: debug.db,
  logging: false,
  query: { raw: false },
  timezone: "+07:00",
  // pool: {
  //   max: 30,
  //   min: 0,
  //   acquire: 60000,
  //   idle: 5000
  // },
  define: {
    // rejectOnEmpty: Promise.reject({
    //   code: CONSTANT.apiCode.NOT_FOUND
    // })
    hooks: true
  }
});

module.exports = sequelize;
