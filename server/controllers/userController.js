const sendMail = require("../helpers/sendMail");
const createToken = require("../helpers/createToken");
const validateEmail = require("../helpers/validateEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const userController = {
  register: async (req,role, res) => {
    try {
      // get info
      const { name, email, gender, password, username, faculty, degree, specialization , batch , description, interestedTopics} = req.body;

      // if (role=="student") {
      //   const {  } = req.body;
      // }

      // if (role=="supervisor" || role=="coSupervisor") {
      //   const {  } = req.body;
      // }

      // check fields
      if (!name || !email || !password ||!username)
        return res.status(400).json({ message: "Please fill in all fields." });

      // check email
      if (!validateEmail(email))
        return res
          .status(400)
          .json({ message: "Please enter a valid email address." });

      // check user
      const user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ message: "This email is already registered in our system." });

      // check password
      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters." });

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      // create token
      const newUser = { name, email, gender, password: hashPassword, role , username, faculty, batch , degree, specialization, description, interestedTopics} ;
      const activation_token = createToken.activation(newUser);
           

      // send email
       const url = `http://localhost:3000/api/auth/activate/${activation_token}`;
       sendMail.sendEmailRegister(email, url, "Verify your email");


    res.status(200).json({ 
      message: "Welcome! Please check your email.",
      success: true,  
    });
     } catch (err) {
     res.status(500).json({ message: err.message,
      success: false });
   }
  },
  panalMemberRegister: async (req, role, res) => {
    try {
      // get info
      const { name, email, password, username } = req.body;

      // check fields
      if (!name || !email || !password ||!username)
        return res.status(400).json({ message: "Please fill in all fields." });

      // check email
      if (!validateEmail(email))
        return res
          .status(400)
          .json({ message: "Please enter a valid email address." });

      // check user
      const user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ message: "This email is already registered in our system." });

      // check password
      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters." });

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      
      const newUser = new User ({ name, email, password: hashPassword, role , username}) ;
      await newUser.save();
           

      // send email
      //  const url = `http://localhost:5000/api/auth/activate/${activation_token}`;
      //  sendMail.sendEmailRegister(email, url, "Verify your email");


    res.status(200).json({ 
      message: "Welcome! Please check your email.",
      success: true,  
    });
     } catch (err) {
     res.status(500).json({
      message: err.message,
      success: false });
   }
  },
  activate: async (req, res) => {
    try {
      // get token
      const { activation_token } = req.body;

      // verify token
      const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN);
      const { name, email, gender, password, role , username, faculty, batch , degree, specialization, description, interestedTopics } = user;

      // check user
      const check = await User.findOne({ email });
      if (check)
        return res
          .status(400)
          .json({
             message: "This email is already registered.",
             success: false
         });

      // add user
      const newUser = new User({
        name,
        email,
        gender,
        password,
        role , 
        username,
        
      });
      const saveduser = await newUser.save();

      if(role == "student"){
        const usersave = await User.findById(saveduser._id);
        if (usersave) {
          usersave.student.faculty = faculty ;
          usersave.student.degree =degree;
          usersave.student.specialization = specialization;
          usersave.student.batch = batch;

         await usersave.save();
          //console.log(usersaveupdated);
          
        }
      }

      if(role=="supervisor" || role=="coSupervisor"){
        const usersave = await User.findById(saveduser._id);
        if (usersave) {
          usersave.staff.description = description ;
          usersave.staff.interestedTopics =interestedTopics;
          
         await usersave.save();
          //console.log(usersaveupdated);
          
        }
      }

      

      // activation success
      res
        .status(200)
        .json({ 
          message: "Your account has been activated, you can now sign in.",
          success: true
        
        });
    } catch (err) {
      res.status(500).json({ 
        message: err.message ,
        success: false
    });
    }
  },
  signing: async (req, res) => {
    try {
      // get cred
      const { email, password } = req.body;

      // check email
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "This email is not registered in our system." });

      // check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "This password is incorrect." });

      // refresh token
      const rf_token = createToken.refresh({ id: user._id });
      res.cookie("_apprftoken", rf_token, {
        httpOnly: true,
        path: "/api/auth/access",
        maxAage: 24 * 60 * 60 * 1000, // 24h
      });

      // signing success
      res.status(200).json({ msg: "Signing success" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  access: async (req, res) => {
    try {
      // rf token
      const rf_token = req.cookies._apprftoken;
      if (!rf_token) return res.status(400).json({ msg: "Please sign in." });

      // validate
      jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please sign in again." });
        // create access token
        const ac_token = createToken.access({ id: user.id });
        // access success
        return res.status(200).json({ ac_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgot: async (req, res) => {
    try {
      // get email
      const { email } = req.body;

      // check email
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "This email is not registered in our system." });

      // create ac token
      const ac_token = createToken.access({ id: user.id });

      // send email
      const url = `http://localhost:3000/auth/reset-password/${ac_token}`;
      const name = user.name;
      sendMail.sendEmailReset(email, url, "Reset your password", name);

      // success
      res
        .status(200)
        .json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  reset: async (req, res) => {
    try {
      // get password
      const { password } = req.body;

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      // update password
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { password: hashPassword }
      );

      // reset success
      res.status(200).json({ msg: "Password was updated successfully." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  info: async (req, res) => {
    try {
        // get info -password
        const user = await User.findById(req.user.id).select("-password");
        // return user
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
  },
  update: async (req, res) => {
    try {
      // get info
      const { name, avatar } = req.body;

      // update
      await User.findOneAndUpdate({ _id: req.user.id }, { name, logo:avatar });
      // success
      res.status(200).json({ msg: "Update success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  signout: async (req, res) => {
    try {
      // clear cookie
      res.clearCookie("_apprftoken", { path: "/api/auth/access" });
      // success
      return res.status(200).json({ msg: "Signout success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
 
};

module.exports = userController;