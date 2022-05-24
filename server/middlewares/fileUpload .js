const fs = require("fs");

module.exports = (req, res, next) => {
  // check file exist
  if (typeof req.file === "undefined" || typeof req.body === "undefined")
    return res.status(400).json({ msg: "Issue with uploading this File." });

  // app use upload
  let ufile = req.file.path;


  // success
  next();
};