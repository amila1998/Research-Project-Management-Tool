const TopicEvPanel =require('../models/topicEvaluationPanelManagementModel')
const User =require('../models/userModel')


const topicEvaluationPanelController ={
    add:async(req,res)=>{
        try {
            const user_id = req.body
            const exituser = await User.findById(user_id);
            if (exituser) {
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
            const user_id = req.body
            const exituser = await User.findById(user_id);
            if (exituser) {
                return res.status(400).json({ msg: "Can't Find User" });
            }
            const exitTEvPanlMem = await TopicEvPanel.findOne({'user_id':user_id});
            if (exitTEvPanlMem) {
                return res.status(400).json({ msg: "Already Added to the This Panel" });
            }

            await TopicEvPanel.findOneAndDelete({'user_id':user_id})
            return res.status(200).json({ msg: "Successfully Deleted !!" });

        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    }

}

module.exports = topicEvaluationPanelController;