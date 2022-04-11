require("dotenv").config();

module.exports = {
  ORIGING_URL:"http://localhost:3000",
  DB: process.env.MONGODB_URL,
  PORT: process.env.APP_PORT,
  SECRET: process.env.APP_SECRET,
  ACC_TOKEN: process.env.ACCESS_TOKEN,
  ACT_TOKEN: process.env.ACTIVATION_TOKEN,
  REF_TOKEN: process.env.REFRESH_TOKEN
};