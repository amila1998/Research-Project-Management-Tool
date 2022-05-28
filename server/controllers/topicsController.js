const Topic = require('../models/topicsModel')
const Group = require('../models/groupsModel')

const topicController = {
    topicRegistration:async(req,res)=>{
        try {
                const data=req.body;
                console.log(data);
                const {topicname,group_id,topicDescribe,interestedTopics}=data
                if(!topicname||!group_id||!topicDescribe){
                    return res.status(400).json({ msg: "Fill All Fields" });

                }
                const group = await Group.findById(group_id);
                if(!group){
                    return res.status(400).json({ msg: "Can't Find your Group" });
                }
                const newTopic =new Topic({
                    topicname,group_id,topicDescribe,interestedTopics
                })

                await newTopic.save();
                await Group.findByIdAndUpdate(group_id,{"haveTopic":true});
                return res.status(200).json({ msg: "Registration Successfull ! " });
            
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
            
        }

    },


}

module.exports = topicController;