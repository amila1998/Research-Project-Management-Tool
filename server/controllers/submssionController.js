const Submssion = require("../models/submssionModel");


const submssionController ={
    addSubmssion:async(req,res)=>{
        try {
            const {studentId,url,comments,groupID} = req.body;
            // let date_ob = new Date();
            const newTem = new Submssion({
                studentId,url,comments,groupID
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
            const {studentId,url,comments,groupID} = req.body;
            if (!studentId||!url||!comments||!groupID) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            await Submssion.findByIdAndUpdate({_id:req.params.id},{
                studentId,url,comments,groupID
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

    }
}
    module.exports = submssionController;