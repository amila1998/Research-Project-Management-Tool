const User = require('../models/userModel')
const Topic = require('../models/topicsModel')
const MyRejectedSupervisors = require('../models/myRejectedSupervisorsModel')
const Group = require('../models/groupsModel')

const requestSupervisorController={
    sendARequest:async(req,res)=>{
        try {
            
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
    }
}

module.exports =requestSupervisorController;