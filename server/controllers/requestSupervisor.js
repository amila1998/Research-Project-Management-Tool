const User = require('../models/userModel')
const Topic = require('../models/topicsModel')
const MyRejectedSupervisors = require('../models/myRejectedSupervisorsModel')
const Group = require('../models/groupsModel')

const requestSupervisorController={
    sendARequest:async(req,res)=>{
        try {
            const group_id = req.params.gid;
            const {supervisor} = req.body
            const myGroup =await Group.findById(group_id);
            if(!myGroup){
                return res.status(400).json({msg:"Can't find your Group"});
            }
            await Group.findByIdAndUpdate(group_id,{
                'supervisor.name':supervisor.name,
                'supervisor.user_id':supervisor._id,
                'level':2
            });
            //TO DO: Send a mail to supervisor
            res.status(200).json({
                msg: "Request Successfull !",
                success: true
              });

            
        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
              });
        }
    },
    getSupervisors:async(req,res)=>{
        try {
            const group_id = req.params.gid;
            const topic_id = req.params.tid;

            const myGroup =await Group.findById(group_id);
            if(!myGroup){
                return res.status(400).json({msg:"Can't find your Group"});
            }
            const oldSupervisors = await MyRejectedSupervisors.find({'group_id':group_id})
            if (oldSupervisors) {
                
            }
                const supervisors = await User.find({'role':'supervisor'}).select("-password");
                const myTopicDetails = await Topic.findById(topic_id);
                if(!myTopicDetails){
                    return res.status(400).json({msg:"Can't find your topic"});
                }

                let relatedSupervisors=[];
                
                for(const s of supervisors){
                            for(const i of s.staff.interestedTopics){
                                for(const t of myTopicDetails.interestedTopics){
                                        if (i===t) {
                                            if (relatedSupervisors.length===0) {
                                                relatedSupervisors.push(s);
                                                    
                                                }else{
                                                    for(const ex of relatedSupervisors){
                                                        if (s.email===ex.email) {
                                                            break;
                                                        }else{
                                                            relatedSupervisors.push(s);
                                                            continue;
                                                        }
                                                    }
                                                }
                                            
                                        }
                                    }
                            }
                        //}
                   // }
                }
                
                res.status(200).json(relatedSupervisors);

           
        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
              });
        }
    },
    getMyGroupRequests:async(req,res)=>{
        try {
          const groupsRq =   await Group.find({
              'supervisor.user_id':req.user.id,
              'supervisor.isAccept':null
          })
          res.status(200).json(groupsRq);
            
        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
              });
        }
    }
}

module.exports =requestSupervisorController;