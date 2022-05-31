const User = require('../models/userModel')
const Topic = require('../models/topicsModel')
const MyRejectedSupervisors = require('../models/myRejectedSupervisorsModel')
const Group = require('../models/groupsModel')

const myRejectedSupervisorsController = {
 getall:async(req,res)=>{
     try {
         const group_id = req.params.gid;
         const prevSupervisors = await MyRejectedSupervisors.findOne({'group_id':group_id});
         res.status(200).json(prevSupervisors);
         
     } catch (error) {
        res.status(500).json({
            msg: error.message,
            success: false
          });
     }
 }
}

module.exports=myRejectedSupervisorsController;