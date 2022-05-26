const Template = require("../models/templateModel");


const templateController ={
    addTemplate:async(req,res)=>{
        try {
            const {title,url,description,filename} = req.body;
            if (!title||!url||!description||!filename) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }
            const exitTemp = await Template.findOne({title}) ;
            if (exitTemp) {
                return res.status(400).json({ message: title+" already taken." });
                
            }
            const newTem = new Template({
                title,url,description,filename
            })
            await newTem.save();  
            res.status(200).json({ 
                msg:"Template Added Successfull ;)" ,
                success: true
            })     
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            });
        }
    },
    getAll:async(req,res)=>{
        try {
            const templates = await Template.find();
            res.status(200).json({ 
                templates,
                success: true
            })                
        } catch (error) {
            res.status(500).json({ 
                msg: error.message ,
                success: false
            }); 
        }
    },
    updateTemplate:async(req,res)=>{
        try {
            const {title,url,description,filename}=req.body;
            if (!title||!url||!description||!filename) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            await Template.findByIdAndUpdate({_id:req.params.id},{
                title,url,description,filename
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
    deleteTemp:async(req,res)=>{
        try {
            await Template.findOneAndDelete(req.params.id)
            res.status(200).json({ 
                msg:"Delete Successfull !",
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

module.exports = templateController;