const Groups = require("../models/groupsModel");
const Submssion = require("../models/submssionModel");


const submssionController ={
    addSubmssion:async(req,res)=>{
        try {
            const {studentId,url,comments,groupID,eventId,isSubmitted,groupName,eventName,eventType} = req.body;
            // let date_ob = new Date();
            const newTem = new Submssion({
                studentId,url,comments,groupID,eventId,isSubmitted,groupName,eventName,eventType
            })
           const submitNew = await newTem.save();  
            res.status(200).json({ 
                submitid:submitNew._id,
                msg:"Submssion Added Successfull ;)" ,
                success: true
            })     
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    }, getAll:async(req,res)=>{
        try {
            const submssion = await Submssion.find();
            res.status(200).json({ 
                submssion,
                success: true
            })                
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            }); 
        }
    },
    getOne:async(req,res)=>{
        try {
            const submssion = await Submssion.findById({_id:req.params.id});
            res.status(200).json({ 
                submssion,
                success: true
            })                
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            }); 
        }
    },
    updateSubmssion:async(req,res)=>{
        try {
            const {studentId,url,comments,groupID,eventId,isSubmitted,groupName,eventName,eventType} = req.body;
            if (!studentId||!url||!comments||!groupID) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            await Submssion.findByIdAndUpdate({_id:req.params.id},{
                studentId,url,comments,groupID,eventId,isSubmitted,groupName,eventName,eventType
            })
            res.status(200).json({ 
                msg:"Update Successfull !",
                success: true
            }) 
            
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }

    }, 
    getSubmitted:async(req,res)=>{
           
        try {
            const groupId=req.params.groupId
            const eventId=req.params.eventId
            const submssion = await Submssion.findOne({'groupID':groupId,'eventId':eventId});
            res.status(200).json( 
                submssion
            )                
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            }); 
        }
    },
   getSupervisorsSub:async(req,res)=>{
       try {
           const groups = await Groups.find({'supervisor.user_id':req.user.id});
           const eventType="document"
           let submissions=[]
           for (const g of groups) {
               const submssion =await Submssion.find({'groupID':g._id ,"eventType":"document"});
               if(submssion){
                   submissions.push(submssion)
                }
            }
           res.status(200).json(
            submissions
           )
       } catch (error) {
        res.status(500).json({ 
            msg: error.message ,
            success: false
        }); 
       }
   },
   getCoSupervisorsSub:async(req,res)=>{
    try {
        const groups = await Groups.find({'coSupervisor.user_id':req.user.id});
        const eventType="document"
        let submissions=[]
        for (const g of groups) {
            const submssion =await Submssion.find({'groupID':g._id ,"eventType":"document"});
            if(submssion){
                submissions.push(submssion)
             }
         }
        res.status(200).json(
         submissions
        )
    } catch (error) {
     res.status(500).json({ 
         msg: error.message ,
         success: false
     }); 
    }
}, 
getPanalMemberSub:async(req,res)=>{
    try {
        const groups = await Groups.find({'panelMember.user_id':req.user.id});
        const eventType="document"
        let submissions=[]
        for (const g of groups) {
            const submssion =await Submssion.find({'groupID':g._id ,"eventType":"presentation"});
            if(submssion){
                submissions.push(submssion)
             }
         }
        res.status(200).json(
         submissions
        )
    } catch (error) {
     res.status(500).json({ 
         msg: error.message ,
         success: false
     }); 
    }
}  

}
    module.exports = submssionController;