const Template = require("../models/templateModel");


const templateController ={
    addTemplate:async(req,res)=>{
        try {
            const {title,url,description} = req.body;
            if (!title||!url||!description) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }
            const exitTemp = await Template.findOne({title}) ;
            if (exitTemp) {
                return res.status(400).json({ message: title+" already taken." });
                
            }
            const newTem = new Template({
                title,url,description
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
    }

}

module.exports = templateController;