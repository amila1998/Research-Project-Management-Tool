const { Schema, model } = require("mongoose");

const myRejectedSupervisorsSchema = new Schema(
  {
    group_id:String,  
    supervisor:[{
          user_id:String,
          status:String
      }]
  },
  { timestamps: true }
  );
  
  const MyRejectedSupervisors = model("MyRejectedSupervisors", myRejectedSupervisorsSchema);
  
  module.exports = MyRejectedSupervisors;