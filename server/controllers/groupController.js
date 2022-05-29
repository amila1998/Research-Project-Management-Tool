const sendMail = require("../helpers/sendMail");
const Groups = require("../models/groupsModel");
const User = require("../models/userModel");


const groupController ={
    groupRegister:async (req, res) => {
            try {
              // get info
              const { groupName,members } = req.body;
        
              // check fields
              if (!groupName,!members)
                return res.status(400).json({ message: "Please fill in all fields." });
        
            
        
              // check Group
              const group = await Groups.findOne({ groupName });
              if (group)
                return res
                  .status(400)
                  .json({ msg: "This group Name is already registered in our system." });
        
              // check members length
              if (members.length > 4)
                return res
                  .status(400)
                  .json({ message: "Only four members allowed to added to a one single Group." });
            
                //check members alredy have a group
                for (const member of members) {
                    console.log(member);
                    const user = await User.findById(member.user_id);
                    if(user.student.haveAGroup){
                        return res
                        .status(400)
                        .json({ msg: member.name + "  already have a group." });
                    }

                  }

                  const newGroup = new Groups({
                      groupName,
                      members,
                  })

                  const savedGroup = await newGroup.save();
                  
                  for (const member of savedGroup.members) {
                    console.log(member);
                    await User.findOneAndUpdate(
                      { _id: member.user_id },
                      { 'student.haveAGroup': true }
                    );

                  }
                // send email
                // const url = `http://localhost:3000/group/groupDashBoard/${savedGroup._id}`;
                // sendMail.sendEmailGroupRegister(members, url, "You Have a successfully Completed Group Registration");
                
            res.status(200).json({ 
              msg: "You Have a successfully Completed Group Registration",
              success: true,  
            });

           
             } catch (err) {
             res.status(500).json({ message: err.message,
              success: false });
              
           }
          },
  getMutualStudents: async (req, res) => {
    const { degree, faculty } = req.body;
    try {
      const users = await User.find({ 'student.degree': degree, 'student.faculty': faculty, 'role': 'student', 'student.haveAGroup': false  });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getStutendGroup:async(req,res)=>{
    try {
        let studentId=req.params.user_id;
        const submssion = await Groups.findOne({'members.user_id':studentId});
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
  getMyGroupDetails:async(req,res)=>{
    try {
      const userID=req.params.id;
      const myGroup = await Groups.findOne({'members.user_id':userID})
      res.status(200).json(myGroup);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
   


  }

}

module.exports = groupController;