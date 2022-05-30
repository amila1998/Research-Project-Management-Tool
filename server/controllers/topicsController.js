const Topic = require('../models/topicsModel')
const Group = require('../models/groupsModel')

const topicController = {
    topicRegistration:async(req,res)=>{
        try {
                const data=req.body;
                //console.log(data);
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
                await Group.findByIdAndUpdate(group_id,{"haveTopic":true,'level':1});
                return res.status(200).json({ msg: "Registration Successfull ! " });
            
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
            
        }

    },
    getMyTopic:async(req,res)=>{
        try {
            const groupId = req.params.id;
            const group = await Group.findById(groupId);
            if(!group){
                return res.status(400).json({ msg: "Can't Find your Group" });
            }

            const myTopic = await Topic.findOne({'group_id':groupId})
            return res.status(200).json(myTopic);
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    },
    getATopic:async(req,res)=>{
        try {
            const group_id = req.params.groupId
            const topic = await Topic.findOne({'group_id':group_id})
            res.status(200).json(topic);
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    }


}

module.exports = topicController;