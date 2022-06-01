const Topic = require('../models/topicsModel')
const Group = require('../models/groupsModel')
const RejectedTopics= require('../models/myRejectionTopicsModel')
const MyRejectedSupervisors = require('../models/myRejectedSupervisorsModel')

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
    },
    getAllTopics:async(req,res)=>{
        try {
            const topics = await Topic.find();
            res.status(200).json(topics);
            
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    },
    getTopicsToResponce:async(req,res)=>{
        try {
            let toResTopics =[];
            const groups = await Group.find().select('supervisor.isAccept'===true);
            for(const g of groups){
                const topic = await Topic.findOne({'group_id':g._id});
                toResTopics.push(topic)
            }
            res.status(200).json(toResTopics);
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    },
    panalMemberResponse:async(req,res)=>{
        try {
            const group_id = req.params.gid;
            const topic_id = req.params.tid;
            const {panalmemberResponse,level}=req.body;
            
            if(!panalmemberResponse){
                const myRejTopics = await RejectedTopics.findOne({group_id})
                              
                if (myRejTopics) {                  
                     let newTopic = [];
                     newTopic=myRejTopics.topic
                    const newTop ={'topic_id':topic_id,'status':panalmemberResponse};
                    newTopic.push(newTop);
                    await RejectedTopics.findOneAndUpdate(group_id,{'topic':newTopic})
                    await Topic.findByIdAndUpdate(topic_id,{
                        'group_id':group_id+"REJECT",
                        'panalMemberAcception':panalmemberResponse
                    })
                }else{
                    let topic = [{'topic_id':topic_id,'status':panalmemberResponse}]
                    const newRejTop = new RejectedTopics({
                        group_id,  
                        topic
                            
                    })
                    await Topic.findByIdAndUpdate(topic_id,{
                        'group_id':group_id+"REJECT",
                        'panalMemberAcception':panalmemberResponse
                    })
                    await newRejTop.save();
                }  
            }
            if (panalmemberResponse) {
                await Group.findByIdAndUpdate(group_id,{
                    'level':level
                })
                await Topic.findByIdAndUpdate(topic_id,{
                    'panalMemberAcception':panalmemberResponse
                })
            } else {
                await Group.findByIdAndUpdate(group_id,{
                    'level':level,
                    'supervisor.isAccept':null,
                    'supervisor.user_id':"",
                    'supervisor.name':"",

                })
                await Topic.findByIdAndUpdate(topic_id,{
                    'panalMemberAcception':panalmemberResponse
                })
                await MyRejectedSupervisors.findOneAndDelete(group_id);
               
            }
            
             res.status(200).json({msg: 'Your Response is Successfully Send !'});
            
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    },
    getMyRejectedTopics:async(req,res)=>{
        try {
           const group_id=req.params.gid;
           const rejTopics=await Topic.find({'group_id':group_id+"REJECT"});
           res.status(200).json(rejTopics);
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    }


}

module.exports = topicController;