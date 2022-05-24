const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    //check cookies
    const cookies = req.headers.cookie;
    if (!cookies) return res.status(400).json({ msg: "Authentication failed - Not Found cookies" });
    const token = cookies.split("=")[1];
    if (!token) return res.status(400).json({ msg: "Authentication failed." });

    // validate
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.status(400).json({ msg: "Authentication failed." });
      // success
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;