const jwt = require("jsonwebtoken");
const { ACT_TOKEN,REF_TOKEN,ACC_TOKEN } = require("../config");

const createToken = {
  activation: (payload) => {
    return jwt.sign(payload, ACT_TOKEN, { expiresIn: "5m" });
  },
  refresh: (payload) => {
    return jwt.sign(payload, REF_TOKEN, { expiresIn: "24h" });
  },
  access: (payload) => {
    return jwt.sign(payload, ACC_TOKEN, { expiresIn: "15m" });
  },
};

module.exports = createToken;