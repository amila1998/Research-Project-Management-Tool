require("dotenv").config();

module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT,
  SECRET: process.env.APP_SECRET,
  ACC_TOKEN: process.env.ACCESS_TOKEN,
  ACT_TOKEN: process.env.ACTIVATION_TOKEN,
  REF_TOKEN: process.env.REFRESH_TOKEN
};