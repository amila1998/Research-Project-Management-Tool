const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const coSupervisor = async(req, res, next) => {
    
    try {
     
      const user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({ 
          msg: "User Not Found." 
      });

      if(user.role!='coSupervisor') return res.status(400).json({ 
        msg: "Co Supervisor Authentication Failed !!." 
    });


        next();
    
    } catch (err) {
      res.status(500).json({ 
          msg: err.message 
      });
    }
  };

  module.exports = coSupervisor;