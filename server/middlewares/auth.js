const jwt = require("jsonwebtoken");
const { ACC_TOKEN } = require("../config");

const auth = (req, res, next) => {
  try {
    // check ac token
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ 
        msg: "Authentication failed." 
    });

    // validate
    jwt.verify(token, ACC_TOKEN, (err, user) => {
      if (err) return res.status(400).json({ 
        user,  
        msg: "Authentication failed." 
        });
      // success
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};





module.exports = auth;