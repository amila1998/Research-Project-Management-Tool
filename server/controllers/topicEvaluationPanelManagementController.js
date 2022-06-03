const TopicEvPanel =require('../models/topicEvaluationPanelManagementModel')
const User =require('../models/userModel')
const sendMail = require("../helpers/sendMail");


const topicEvaluationPanelController ={
    add:async(req,res)=>{
        try {
            const { user_id }= req.body;
            
            const exituser = await User.findById(user_id);
            if (!exituser) {
                return res.status(400).json({ msg: "Can't Find User" });
            }
            const exitTEvPanlMem = await TopicEvPanel.findOne({'user_id':user_id});
            if (exitTEvPanlMem) {
                return res.status(400).json({ msg: "Already Added to the This Panel" });
            }

            const tEvaPanMem = new TopicEvPanel({
                user_id
            })
            await tEvaPanMem.save();

            //send Email
            const to = exituser.email;
            sendMail.sendEmailtoPanalMemforAddEve(to);

            return res.status(200).json({ msg: "Successfully Added !!" });

        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
        
    },
    delete:async(req,res)=>{
        try {
            const id = req.params.id
            const exitTEvPanlMem = await TopicEvPanel.findOne({'_id':id});
            if (!exitTEvPanlMem) {
                return res.status(400).json({ msg: "No Topic Evaluvater can Found" });
            }

            await TopicEvPanel.findOneAndDelete({'_id':id})
            return res.status(200).json({ msg: "Successfully Deleted !!" });

        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    },
    check:async(req,res)=>{
        try {
            const user_id = req.params.uid;
            const exitTEvPanlMem = await TopicEvPanel.findOne({'user_id':user_id});
            if (exitTEvPanlMem) {
                return res.status(200).json({ success:true });
            }
             return res.status(400).json({ success:false });
            
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    },
    getAll:async(req,res)=>{
        try {
            const TEvPanlMem = await TopicEvPanel.find();
            return res.status(200).json(TEvPanlMem);
            
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    },

    getAllPanalMem:async(req,res)=>{
        try {
            const users = await User.find({'role':'panelMember'});
            return res.status(200).json(users);
            
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    }
    

}

module.exports = topicEvaluationPanelController;