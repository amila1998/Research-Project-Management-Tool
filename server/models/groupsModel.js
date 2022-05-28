const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    groupName:{
        type:String,
        required:true,
        unique:true
    },
    haveTopic:{
        type:Boolean,
        default:false
    },
    members: [
        {
            name: String,
            user_id:String,
            isLeader:false
        }
    ],
    supervisor:{
        name:String,
        user_id:String,
        isAccept:{
            type:Boolean,
            default:null
        }
    },
    coSupervisor:{
        name:String,
        user_id:String,
        isAccept:{
            type:Boolean,
            default:null
        }
    },
    panelMember:{
        name:String,
        user_id:String
    },
    level:{
        type:Number,
        default:0
    }



    
  
},
{ timestamps: true }
);

const Groups = model("Groups", groupSchema);

module.exports = Groups;