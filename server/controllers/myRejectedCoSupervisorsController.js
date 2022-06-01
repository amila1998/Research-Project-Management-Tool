const User = require('../models/userModel')
const Topic = require('../models/topicsModel')
const MyRejectedCoSupervisors = require('../models/myRejectedCoSupervisorsModel')
const Group = require('../models/groupsModel')

const myRejectedCoSupervisorsController = {
 getall:async(req,res)=>{
     try {
         const group_id = req.params.gid;
         const prevCoSupervisors = await MyRejectedCoSupervisors.findOne({'group_id':group_id});
         res.status(200).json(prevCoSupervisors);
         
     } catch (error) {
        res.status(500).json({
            msg: error.message,
            success: false
          });
     }
 }
}

module.exports=myRejectedCoSupervisorsController;