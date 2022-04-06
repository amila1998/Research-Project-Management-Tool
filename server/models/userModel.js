const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    logo: {
        type: String, 
        required: true, 
        default:"https://res.cloudinary.com/afassignment/image/upload/v1649107395/Default%20User%20Logo/user-circle_xkddog.png"
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
        type: String,
        required: true
      },
    password: { type: String, required: true },
    role: {
        type: String,
        default: "student",
        enum: ["student", "admin", "supervisor","coSupervisor","panelMember"]
      },
     
    
  },
  { timestamps: true }
);

const User = mongoose.model("user",userSchema);
module.exports = User;