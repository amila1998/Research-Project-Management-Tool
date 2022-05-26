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

router.post("/api/fileupload",upload.single("myFile"),async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({msg: "Loacl File not Provided !"})
        }
         // get file
        const file = req.file;
        
        const exec = file.originalname.split('.')[1];
         
          // upload to cloudinary
        cloudinary.v2.uploader.upload(
            file.path,
            {
            folder: "templates",
            resource_type: "auto",
            format:exec,
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




//for other uses 

// const mime = file.mimetype.split('/')[1];
         
       
//         switch (mime) {
            
//             case "octet-stream":
//                 exe = "accdb";
//               break;
//             case 'msword':
//                 exe = "doc";
//               break;
//             case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
//                 exe = "docx";
//               break;
//             case 'vnd.openxmlformats-officedocument.wordprocessingml.template':
//                 exe = "docx";
//               break;
//             case 'vnd.ms-word.document.macroEnabled.12':
//                 exe = "docm";
//               break;
//             case 'vnd.ms-word.template.macroEnabled.12':
//                 exe = "docm";
//               break;
//             case 'vnd.ms-excel':
//                 exe = "xls";
//               break;
//             case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
//                 exe = "xlsx";
//               break;
//             case 'vnd.openxmlformats-officedocument.spreadsheetml.template':
//                 exe = "xltx";
//               break;
//             case 'vnd.ms-excel.sheet.macroEnabled.12':
//                 exe = "xlsm";
//               break;
//             case 'vnd.ms-excel.template.macroEnabled.12':
//                 exe = "xltm";
//               break;
//             case 'vnd.ms-excel.addin.macroEnabled.12':
//                 exe = "xlam";
//               break;
//             case 'vnd.ms-excel.sheet.binary.macroEnabled.12':
//                 exe = "xlsb";
//               break;
//             case 'vnd.ms-powerpoint':
//                 exe = "ppt";
//               break;
//             case 'vnd.ms-powerpoint':
//                 exe = "pot";
//               break;
//             case 'vnd.ms-powerpoint':
//                 exe = "pps";
//               break;
//             case 'vnd.ms-powerpoint':
//                 exe = "ppa";
//               break;
//             case 'vnd.openxmlformats-officedocument.presentationml.presentation':
//                 exe = "pptx";
//               break;
//             case 'vnd.openxmlformats-officedocument.presentationml.template':
//                 exe = "potx";
//               break;
//             case 'vnd.openxmlformats-officedocument.presentationml.slideshow':
//                 exe = "ppsx";
//               break;
//             case 'vnd.ms-powerpoint.addin.macroEnabled.12':
//                 exe = "ppam";
//               break;
//             default:
//                 exe = mime;
//           }
          