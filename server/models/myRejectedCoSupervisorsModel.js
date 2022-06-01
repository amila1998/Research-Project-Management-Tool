const { Schema, model } = require("mongoose");

const myRejectedCoSupervisorsSchema = new Schema(
  {
    group_id:String,  
    cosupervisor:[{
          user_id:String,
          status:String
      }]
  },
  { timestamps: true }
  );
  
  const MyRejectedCoSupervisors = model("MyRejectedCoSupervisors", myRejectedCoSupervisorsSchema);
  
  module.exports = MyRejectedCoSupervisors;