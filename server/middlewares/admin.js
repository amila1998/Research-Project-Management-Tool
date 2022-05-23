const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const admin = async(req, res, next) => {
    
    try {
     
      const user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({ 
          msg: "User Not Found." 
      });

      if(user.role!='admin') return res.status(400).json({ 
        msg: "Admin Authentication Failed !!." 
    });


        next();
    
    } catch (err) {
      res.status(500).json({ 
          msg: err.message 
      });
    }
  };

  module.exports = admin;