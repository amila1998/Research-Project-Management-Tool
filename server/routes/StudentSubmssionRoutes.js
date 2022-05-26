const { Router } = require("express");
const router = Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const storage = multer.diskStorage({});
let upload = multer({
    storage
})

router.post("/api/addsubmission",upload.single("studentSubmssion"),async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({msg: "Loacl File not Provided !"})
        }
         // get file
        const file = req.file;
          // upload to cloudinary
        cloudinary.v2.uploader.upload(
            file.path,
            {
            folder: "submssion",
            resource_type: "auto"
            },
            (err, result) => {
            
            if (err) throw err;
            fs.unlinkSync(file.path);
            res.status(200).json({
                msg: "Uploaded successfully.",
                url: result.secure_url,
                bytes: result.bytes,
                format:result.format,
                name:file.originalname
            }
            );
            }
        );

        
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
})

module.exports = router;