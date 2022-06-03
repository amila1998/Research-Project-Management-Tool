const sendMail = require("../helpers/sendMail");
const createToken = require("../helpers/createToken");
const validateEmail = require("../helpers/validateEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Group = require("../models/groupsModel")



const userController = {
  register: async (req, res) => {
    try {
      // get info
      const { name, email, gender, password, username, faculty, degree, specialization, role, batch, description, interestedTopics } = req.body;

      // check fields
      if (!name || !email || !password || !username || !gender || !role)
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
      const newUser = { name, email, gender, password: hashPassword, role, username, faculty, batch, degree, specialization, description, interestedTopics };
      const activation_token = createToken.activation(newUser);


      // send email
      const url = `http://localhost:3000/auth/activate/${activation_token}`;
      sendMail.sendEmailRegister(email, url, "Verify your email");


      res.status(200).json({
        message: "Welcome! Please check your email.",
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
        success: false
      });
    }
  },
  // panalMemberRegister: async (req, role, res) => {
  //   try {
  //     // get info
  //     const { name, email, password, username } = req.body;

  //     // check fields
  //     if (!name || !email || !password ||!username)
  //       return res.status(400).json({ message: "Please fill in all fields." });

  //     // check email
  //     if (!validateEmail(email))
  //       return res
  //         .status(400)
  //         .json({ message: "Please enter a valid email address." });

  //     // check user
  //     const user = await User.findOne({ email });
  //     if (user)
  //       return res
  //         .status(400)
  //         .json({ message: "This email is already registered in our system." });

  //     // check password
  //     if (password.length < 6)
  //       return res
  //         .status(400)
  //         .json({ message: "Password must be at least 6 characters." });

  //     // hash password
  //     const salt = await bcrypt.genSalt();
  //     const hashPassword = await bcrypt.hash(password, salt);


  //     const newUser = new User ({ name, email, password: hashPassword, role , username}) ;
  //     await newUser.save();


  //     // send email
  //     //  const url = `http://localhost:5000/api/auth/activate/${activation_token}`;
  //     //  sendMail.sendEmailRegister(email, url, "Verify your email");


  //   res.status(200).json({ 
  //     message: "Welcome! Please check your email.",
  //     success: true,  
  //   });
  //    } catch (err) {
  //    res.status(500).json({
  //     message: err.message,
  //     success: false });
  //  }
  // },
  activate: async (req, res) => {
    try {
      // get token
      const { activation_token } = req.body;

      // verify token
      const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN);
      const { name, email, gender, password, role, username, faculty, batch, degree, specialization, description, interestedTopics } = user;

      // check user
      const check = await User.findOne({ email });
      if (check)
        return res
          .status(400)
          .json({
            msg: "This email is already registered.",
            success: false
          });

      // add user
      const newUser = new User({
        name,
        email,
        gender,
        password,
        role,
        username,

      });
      const saveduser = await newUser.save();

      if (role == "student") {
        const usersave = await User.findById(saveduser._id);
        if (usersave) {
          usersave.student.faculty = faculty;
          usersave.student.degree = degree;
          usersave.student.specialization = specialization;
          usersave.student.batch = batch;

          await usersave.save();
          //console.log(usersaveupdated);

        }
      }

      if (role == "supervisor" || role == "coSupervisor") {
        const usersave = await User.findById(saveduser._id);
        if (usersave) {
          usersave.staff.description = description;
          usersave.staff.interestedTopics = interestedTopics;

          await usersave.save();
          //console.log(usersaveupdated);

        }
      }



      // activation success
      res
        .status(200)
        .json({
          msg: "Your account has been activated, you can now sign in.",
          success: true

        });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
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

      // create a cookie
      const rf_token = createToken.access({ id: user._id });
      res.cookie("_apprftoken", rf_token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        expires: new Date(Date.now() + 1000 * 60 * 60), //1h
      });

      // signing success
      res.status(200).json({ msg: "Signing success" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  refresh: async (req, res) => {
    try {
      // rf token
      const rf_token = req.cookies._apprftoken;
      if (!rf_token) return res.status(400).json({ msg: "Please sign in." });

      // validate
      jwt.verify(rf_token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please sign in again." });

        //clear cookie
        res.clearCookie("_apprftoken", { path: "/" });

        // create access token
        const ac_token = createToken.access({ id: user.id });
        //create new cookie
        res.cookie("_apprftoken", ac_token, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          expires: new Date(Date.now() + 1000 * 60 * 60), //1h
        });

        // access success
        return res.status(200).json({ msg: "Token Refreshed" });
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
      await User.findOneAndUpdate({ _id: req.user.id }, { name, logo: avatar });
      // success
      res.status(200).json({ msg: "Update success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  verify: async (req, res) => {
    try {
      // get info
      const { isverify } = req.body;

      // update
      await User.findOneAndUpdate({ _id: req.params.id }, { isverify: isverify });
      // success
      res.status(200).json({ msg: "Verification Update success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  signout: async (req, res) => {
    try {
      // clear cookie
      res.clearCookie("_apprftoken", { path: "/" });
      // success
      return res.status(200).json({ msg: "Signout success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllUsers: async (req, res) => {
    const query = {};
    const sort = {};

    if (req.query.keyword) {
      query.$or = [
        { "username": { $regex: req.query.keyword, $options: 'i' } },
        { "email": { $regex: req.query.keyword, $options: 'i' } }
      ];
    }
    if (req.query.isVerify) {
      query.isverify = req.query.isVerify;
    }
    if (req.query.role) {
      query.role = req.query.role;
    }
    if (req.query.createdAt) {
      //desc
      //aces
      const str = req.query.createdAt.split('=')
      sort['createdAt'] = str == 'desc' ? -1 : 1
    }


    try {
      const users = await User.find(query)
        .select("-password")
        .sort(sort);

      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  delete: async (req, res) => {

    try {
      const id = req.params.id
      const admin = await User.findById(id);
      if (admin.role === 'admin') {
        console.log("🚀 ~~ delete if : ~ id", id)
        return res
          .status(400)
          .json({ msg: "Admin cannot be deleted!" });
      }
      else {
        await User.findOneAndDelete({ '_id': id })
        console.log("🚀 ~~ delete else: ~ id", id)
        res.status(200).json({
          msg: "Delete Successful!",
          success: true
        })
      }
    } catch (error) {
      res.status(500).json({
        msg: error.message,
        success: false
      });
    }
  },
  getuserDedails: async (req, res) => {
    try {
      const userID = req.params.id;
      const userDetails = await User.findById(userID);
      res.status(200).json(userDetails);
    } catch (error) {
      res.status(500).json({
        msg: error.message,
        success: false
      });
    }
  },

  getGroupUsers: async (req, res) => {

    try {

      let users = [];

      const myGroup = await Group.findOne({ 'members.user_id': req.user.id });
      if (!myGroup) {
        return res.status(400).json({
          msg: "Group Not Found!!!",
          success: false
        });
      }

      for (const m of myGroup.members) {
        const userData = await User.findById(m.user_id).select('-password');

        if (userData) {
          if (userData._id != req.user.id) {
            users.push(userData);

          }
        }
      }
      if (myGroup.supervisor.user_id) {
        const userData = await User.findById(myGroup.supervisor.user_id).select('-password');

        if (userData) {
          users.push(userData);
        }
      }

      if (myGroup.coSupervisor.user_id) {
        const userData = await User.findById(myGroup.coSupervisor.user_id).select('-password');

        if (userData) {
          users.push(userData);
        }
      }

      console.log(users);
      res.status(200).json(users);

    } catch (error) {
      res.status(500).json({
        msg: error.message,
        success: false
      });
    }
  },

  getallsupervisorgroupusers: async (req, res) => {
    try {
      let users = [];

      const myGroups = await Group.find({ 'supervisor.user_id': req.user.id });
      
      if (myGroups) {
        if (myGroups.length > 0) {

          for (const g of myGroups) {
            for (const m of g.members) {
              const user = await User.findById(m.user_id)

              console.log(user);
              
              if (user) {
                users.push(user);
              }
            }
          }
        }
      }
      
      console.log(users);

      res.status(200).json(users);

    } catch (error) {
      res.status(500).json({
        msg: error.message,
        success: false
      });
    }

  },

 getallcosupervisorgroupusers: async (req, res) => {
    try {
      let users = [];

      const myGroups = await Group.find({ 'coSupervisor.user_id': req.user.id });

      if (myGroups) {
        if (myGroups.length > 0) {

          for (const g of myGroups) {
            for (const m of g.members) {
              const user = await User.findById(m.user_id)

              console.log(user);

              if (user) {
                users.push(user);
              }
            }
          }
        }
      }

      console.log(users);

      res.status(200).json(users);

    } catch (error) {
      res.status(500).json({
        msg: error.message,
        success: false
      });
    }

  }

};

module.exports = userController;