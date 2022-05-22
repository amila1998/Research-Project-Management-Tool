const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
  },
  logo: {
      type: String, 
      required: true, 
      default:"https://res.cloudinary.com/afassignment/image/upload/v1649107395/Default%20User%20Logo/user-circle_xkddog.png"
  },
  gender:{ 
    type: String, 
    required: true,
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
      required: true,
      default: "student",
      enum: ["student", "admin", "supervisor","coSupervisor","panelMember"]
    },
  student:{
    faculty:String,
    batch:String,
    degree:String,
    specialization:String,
    haveAGroup:{type: Boolean, default: false},

  },
  staff:{
    description:String,
    interestedTopics:[String]
  },
 
  isverify:{type: Boolean, default: false},

},
{ timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;