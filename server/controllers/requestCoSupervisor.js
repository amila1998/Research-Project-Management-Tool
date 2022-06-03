const User = require('../models/userModel')
const Topic = require('../models/topicsModel')
const MyRejectedCoSupervisors = require('../models/myRejectedCoSupervisorsModel')
const Group = require('../models/groupsModel')
const sendMail = require("../helpers/sendMail");


const requestCoSupervisorController={
    sendARequest:async(req,res)=>{
        try {
            const group_id = req.params.gid;
            const {coSupervisor} = req.body
            const myGroup =await Group.findById(group_id);
            if(!myGroup){
                return res.status(400).json({msg:"Can't find your Group"});
            }
            if (myGroup.level===-3) {
                await Group.findByIdAndUpdate(group_id,{
                    'coSupervisor.isAccept':null,
                    'coSupervisor.name':coSupervisor.name,
                    'coSupervisor.user_id':coSupervisor._id,
                    'level':5
                });
            }else{
                await Group.findByIdAndUpdate(group_id,{
                    'coSupervisor.name':coSupervisor.name,
                    'coSupervisor.user_id':coSupervisor._id,
                    'level':5
                });
            }
            
            //TO DO: Send a mail to supervisor
            const to = coSupervisor.email;
            sendMail.sendEmailtoCoSupervisorReq(to,group_id)

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
    getCoSupervisors:async(req,res)=>{
        try {
            const group_id = req.params.gid;
            const topic_id = req.params.tid;

            const myGroup = await Group.findById(group_id);
            if (!myGroup) {
                return res.status(400).json({ msg: "Can't find your Group" });
            }
            const oldCoSupervisors = await MyRejectedCoSupervisors.find({ 'group_id': group_id })
            console.log("🚀 ~ file: requestCoSupervisor.js ~ line 54 ~ getCoSupervisors:async ~ oldCoSupervisors", oldCoSupervisors)

            if (oldCoSupervisors.length > 0) {

                const coSupervisor = await User.find({ 'role': 'coSupervisor' }).select("-password");
                const myTopicDetails = await Topic.findById(topic_id);
                if (!myTopicDetails) {
                    return res.status(400).json({ msg: "Can't find your topic" });
                }

                let relatedCoSupervisors = [];
                let back = false;

                for (const s of coSupervisor) {

                    for (const i of s.staff.interestedTopics) {

                        for (const t of myTopicDetails.interestedTopics) {
                            if (back === true) {
                                break;
                            }
                            if (i === t) {
                                if (relatedCoSupervisors.length === 0) {

                                    for (const os of oldCoSupervisors) {
                                        if (back === true) {
                                            break;
                                        }
                                        for (const oss of os.cosupervisor) {
                                            if (back === true) {
                                                break;
                                            }
                                            if (oss.user_id === s._id) {
                                                back = true;
                                                break;
                                            } else if (oss.user_id != s._id) {
                                                relatedCoSupervisors.push(s);
                                                back = true;
                                                break;
                                            }

                                        }

                                    }


                                } else {
                                    for (const ex of relatedCoSupervisors) {

                                        if (back === true) {
                                            break;
                                        }
                                        if (s.email === ex.email) {
                                            break;
                                        } else if (ex.email != s.email) {
                                            for (const os of oldCoSupervisors) {
                                                if (back === true) {
                                                    break;
                                                }
                                                for (const oss of os.cosupervisor) {
                                                    if (back === true) {
                                                        break;
                                                    }
                                                    if (oss.user_id === s._id) {
                                                        console.log('hiiiiiiiii');
                                                        back = true;
                                                        break;
                                                    } else {
                                                        relatedCoSupervisors.push(s);
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
                console.log("🚀 ~ file: requestSupervisor.js ~ line 141 ~ getSupervisors:async ~ relatedCoSupervisors", relatedCoSupervisors)
                return res.status(200).json(relatedCoSupervisors);



            } else {
                const coSupervisors = await User.find({ 'role': 'coSupervisor' }).select("-password");
                const myTopicDetails = await Topic.findById(topic_id);
                if (!myTopicDetails) {
                    return res.status(400).json({ msg: "Can't find your topic" });
                }

                let relatedCoSupervisors = [];
                let back = false;

                for (const s of coSupervisors) {
                    if (back === true) {
                        back === false;
                    }
                    for (const i of s.staff.interestedTopics) {
                        for (const t of myTopicDetails.interestedTopics) {
                            if (back === true) {
                                break;
                            }
                            if (i === t) {

                                if (relatedCoSupervisors.length === 0) {
                                    // for(const os of oldSupervisors){
                                    relatedCoSupervisors.push(s);
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
                                    for (const ex of relatedCoSupervisors) {
                                        if (back === true) {
                                            break;
                                        }
                                        if (s.email === ex.email) {
                                            break;
                                        } else if (ex.email != s.email) {
                                            relatedCoSupervisors.push(s);
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
                                            //         relatedCoSupervisors.push(s);
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

                 // send email
 

                return res.status(200).json(relatedCoSupervisors);

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
          const groupsRq =   await Group.find({
              'coSupervisor.user_id':req.user.id,
              'coSupervisor.isAccept':null
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
            const {cosupervisorResponse,level}=req.body;
            const user = await User.findById(req.user.id);
            if(!cosupervisorResponse){
                const myRejCoSupervisors = await MyRejectedCoSupervisors.findOne({group_id})
                              
                if (myRejCoSupervisors) {                  
                     let newCoSupervisor = [];
                     newCoSupervisor=myRejCoSupervisors.cosupervisor
                    const newCoSup ={'user_id':user._id,'status':cosupervisorResponse};
                    newCoSupervisor.push(newCoSup);
                    await MyRejectedCoSupervisors.findOneAndUpdate(group_id,{'cosupervisor':newCoSupervisor})
                }else{
                    let cosupervisor = [{'user_id':user._id,'status':cosupervisorResponse}]
                    const newRejCoSup = new MyRejectedCoSupervisors({
                        group_id,  
                        cosupervisor
                            
                    })
                    await newRejCoSup.save();
                }  
            }
            await Group.findByIdAndUpdate(group_id,{
                'coSupervisor.isAccept':cosupervisorResponse,
                'level':level
            })

            //send mail
            const subject="ADDED A PANAL MEMBER";
            const text=`requested Co supervisor ${cosupervisorResponse===false?"Rejected":"Accepted"}`;
            
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

module.exports =requestCoSupervisorController;