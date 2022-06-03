const User = require('../models/userModel')
const Topic = require('../models/topicsModel')
const MyRejectedSupervisors = require('../models/myRejectedSupervisorsModel')
const Group = require('../models/groupsModel')
const sendMail = require("../helpers/sendMail");

const requestSupervisorController={
    sendARequest:async(req,res)=>{
        try {
            const group_id = req.params.gid;
            const {supervisor} = req.body
            const myGroup =await Group.findById(group_id);
            if(!myGroup){
                return res.status(400).json({msg:"Can't find your Group"});
            }
            if (myGroup.level===-1) {
                await Group.findByIdAndUpdate(group_id,{
                    'supervisor.isAccept':null,
                    'supervisor.name':supervisor.name,
                    'supervisor.user_id':supervisor._id,
                    'level':2
                });
            }else{
                await Group.findByIdAndUpdate(group_id,{
                    'supervisor.name':supervisor.name,
                    'supervisor.user_id':supervisor._id,
                    'level':2
                });
            }
            
            //TO DO: Send a mail to supervisor

             //TO DO: Send a mail to supervisor
             const to = supervisor.email;
             sendMail.sendEmailtoSupervisorReq(to,group_id)

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

            const myGroup = await Group.findById(group_id);
            if (!myGroup) {
                return res.status(400).json({ msg: "Can't find your Group" });
            }
            const oldSupervisors = await MyRejectedSupervisors.find({ 'group_id': group_id })
            console.log("🚀 ~ file: requestSupervisor.js ~ line 54 ~ getSupervisors:async ~ oldSupervisors", oldSupervisors)
            if (oldSupervisors.length > 0) {

                const supervisors = await User.find({ 'role': 'supervisor' }).select("-password");
                const myTopicDetails = await Topic.findById(topic_id);
                if (!myTopicDetails) {
                    return res.status(400).json({ msg: "Can't find your topic" });
                }

                let relatedSupervisors = [];
                let back = false;

                for (const s of supervisors) {

                    for (const i of s.staff.interestedTopics) {

                        for (const t of myTopicDetails.interestedTopics) {
                            if (back === true) {
                                break;
                            }
                            if (i === t) {
                                if (relatedSupervisors.length === 0) {

                                    for (const os of oldSupervisors) {
                                        if (back === true) {
                                            break;
                                        }
                                        for (const oss of os.supervisor) {
                                            if (back === true) {
                                                break;
                                            }
                                            if (oss.user_id === s._id) {
                                                back = true;
                                                break;
                                            }
                                            if (oss.user_id != s._id) {
                                                relatedSupervisors.push(s);
                                                back = true;
                                                break;
                                            }

                                        }

                                    }


                                } else {
                                    for (const ex of relatedSupervisors) {

                                        if (back === true) {
                                            break;
                                        }
                                        if (s.email === ex.email) {
                                            break;
                                        } else if (ex.email != s.email) {
                                            for (const os of oldSupervisors) {
                                                if (back === true) {
                                                    break;
                                                }
                                                for (const oss of os.supervisor) {
                                                    if (back === true) {
                                                        break;
                                                    }
                                                    if (oss.user_id === s._id) {
                                                        //console.log('hiiiiiiiii');
                                                        back = true;
                                                        break;
                                                    } 
                                                    if (oss.user_id != s._id){
                                                        relatedSupervisors.push(s);
                                                        back = true;
                                                        break;
                                                    }

                                                }

                                            }
                                            back = true;
                                            break;
                                        }
                                    }
                                }

                            }
                        }
                    }
                    //}
                    // }
                }
                console.log("🚀 ~ file: requestSupervisor.js ~ line 141 ~ getSupervisors:async ~ relatedSupervisors", relatedSupervisors)
                return res.status(200).json(relatedSupervisors);



            } else {
                const supervisors = await User.find({ 'role': 'supervisor' }).select("-password");
                const myTopicDetails = await Topic.findById(topic_id);
                if (!myTopicDetails) {
                    return res.status(400).json({ msg: "Can't find your topic" });
                }

                let relatedSupervisors = [];
                let back = false;

                for (const s of supervisors) {
                    if (back === true) {
                        back === false;
                    }
                    for (const i of s.staff.interestedTopics) {
                        for (const t of myTopicDetails.interestedTopics) {
                            if (back === true) {
                                break;
                            }
                            if (i === t) {

                                if (relatedSupervisors.length === 0) {
                                    // for(const os of oldSupervisors){
                                    relatedSupervisors.push(s);
                                    //     if(back===true){
                                    //         break;
                                    //     }
                                    //     for (const oss of os.supervisor) {
                                    //         if(back===true){
                                    //             break;
                                    //         }
                                    //        if (oss.user_id===s._id) {
                                    //            console.log('hiiiiiiiii');
                                    //             back=true;
                                    //             break;
                                    //        }else{

                                    //             back=true;
                                    //             break;
                                    //        }

                                    //     }

                                    // }

                                } else {
                                    for (const ex of relatedSupervisors) {
                                        if (back === true) {
                                            break;
                                        }
                                        if (s.email === ex.email) {
                                            break;
                                        } else if (ex.email != s.email) {
                                            relatedSupervisors.push(s);
                                            // for(const os of oldSupervisors){
                                            //     if(back===true){
                                            //         break;
                                            //     }
                                            //     for (const oss of os.supervisor) {
                                            //         if(back===true){
                                            //             break;
                                            //         }
                                            //        if (oss.user_id===s._id) {
                                            //             back=true;
                                            //             break;
                                            //        }else{
                                            //         relatedSupervisors.push(s);
                                            //         back=true;
                                            //         break;
                                            //        }

                                            //     }

                                            // }
                                            back = true;
                                            break;
                                        }
                                    }
                                }

                            }
                        }
                    }
                    //}
                    // }
                }

                return res.status(200).json(relatedSupervisors);

            }


        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },
    getMyGroupRequests:async(req,res)=>{
        try {
            const groupsRq = await Group.find({
                'supervisor.user_id': req.user.id,
                'supervisor.isAccept': null
            })
            res.status(200).json(groupsRq);

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },
    giveResponse:async(req,res)=>{
        try {
            const group_id = req.params.gid;
            const {supervisorResponse,level}=req.body;
            const user = await User.findById(req.user.id);
            if(!supervisorResponse){
                const myRejSupervisors = await MyRejectedSupervisors.findOne({group_id})
                              
                if (myRejSupervisors) {                  
                     let newSupervisor = [];
                     newSupervisor=myRejSupervisors.supervisor
                    const newSup ={'user_id':user._id,'status':supervisorResponse};
                    newSupervisor.push(newSup);
                    await MyRejectedSupervisors.findOneAndUpdate(group_id,{'supervisor':newSupervisor})
                }else{
                    let supervisor = [{'user_id':user._id,'status':supervisorResponse}]
                    const newRejSup = new MyRejectedSupervisors({
                        group_id,  
                        supervisor
                            
                    })
                    await newRejSup.save();
                }  
            }
            await Group.findByIdAndUpdate(group_id,{
                'supervisor.isAccept':supervisorResponse,
                'level':level
            })

            //send mail
            const subject="ADDED A PANAL MEMBER";
            const text=`requested Supervisor ${supervisorResponse===false?"Rejected":"Accepted"}`;
            
            const groupDetails = await Group.findById(group_id)
            if(groupDetails){
              for(const m of groupDetails.members){
                const userDetails = await User.findById(m.user_id);
                if(userDetails){
                  const to = userDetails.email;
                  sendMail.sendEmailtoGroupStudents(to,text,subject);
                }
                
              }
            }

             res.status(200).json({msg: 'Your Response is Successfully Send !'});
        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
              });
        }
    }
}

module.exports =requestSupervisorController;