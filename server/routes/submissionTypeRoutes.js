const router = require("express").Router();
const SubmissionType = require("../models/submissionType");
const handleError = require("../helpers/submissionTypeErrors")
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", auth, admin, async(req, res)=>{

    const events = await SubmissionType.find({});
 
    try{
       
       res.status(200).json(events)

      
    }catch(err){
        handleError(err, res)
    }
});
router.get("/got", auth,async(req, res)=>{

    const events = await SubmissionType.find({});
 
    try{
       
       res.status(200).json(events)

      
    }catch(err){
        handleError(err, res)
    }
});

router.get("/:id/show",auth, admin, async(req, res)=>{
    const id =   req.params.id
    const event = await SubmissionType.findById(id);
 
    try{
       res.status(200).json(event)

      
    }catch(err){
        handleError(err, res)
    }
});



router.post("/",auth, admin, async(req, res)=>{
   
        const newEvent = await new SubmissionType(req.body)
     
        try{
           await newEvent.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
            })
        }catch(err){
            handleError(err, res)
        }
    }
)



router.put("/:id/update",auth, admin, async (req, res)=>{
    const id = req.params.id
     try{
        const event = await SubmissionType.findOne({_id : id})
        if(event){
            Object.assign(event, req.body);
             event.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
        })
    }   
        if(!event){
            res.status(404).json({error: "event is not found"})
        }
     }catch (err){
       console.log(err)
       handleError(err,res)
     }
 



//   const result = await SubmissionType.findOneAndUpdate(req.params.id,
//         {
//         $set: req.body,
//     }
//     , {new: true, runValidators: true}).clone()

//     try{
//         res.status(200).json(result)
//     }catch(err){
//         // res.status(500).json(Object.keys(result.errors)[0])
//         console.log(err)
//         res.status(400).json(err)
//     }
    // .then((docs, err)=>{
    //     if(docs){
    //         res.status(200).json(docs)
    //     }else{
    //         console.log(err.errors.path)
    //         handleError(err, res)
    //     }
    // })
})

router.delete("/:id/delete",auth, admin, async(req, res)=>{
    const id = req.params.id;
    try{
        await SubmissionType.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    }catch(err){
        handleError(err, res)
    }

})




module.exports = router