const { Schema, model } = require("mongoose");

const rejectedTopicSchema = new Schema(
  {
    group_id:String,  
    topic:[{
          topic_id:String,
          status:String
      }]
  },
  { timestamps: true }
  );
  
  const RejectedTopics = model("RejectedTopics",rejectedTopicSchema);
  
  module.exports = RejectedTopics;