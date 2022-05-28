const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
    topicname:{
        type:String,
        required:true
    },
    group_id:{
        type:String,
        required:true
    },
    topicDescribe:{
        type:String,
        required:true
    },
    interestedTopics:[String],
    panalMemberAcception:{
        type:Boolean,
        default:null
    },
    feedBack:{
        type:String
    }

    },
    { timestamps: true }
    );
    
    const Topic = model("Topics", topicSchema);
    
    module.exports = Topic;