const { Router } = require("express");
const route = Router();
const groupController = require("../controllers/groupController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post("/api/group/groupRegister",groupController.groupRegister);
route.post("/api/group/getMutualStudents", auth,groupController.getMutualStudents);
route.get("/api/group/getStutendGroup/:user_id",groupController.getStutendGroup);
route.get("/api/group/supervisorAllGroup",auth,groupController.supervisorAllGroup);
route.get('/api/group/getmygroup/:id',auth,groupController.getMyGroupDetails);
route.get('/api/group/getgroup/:gid',auth,groupController.getAGroup);
route.get('/api/admin/getallGroups',auth,admin,groupController.getAllGroups);
route.post('/api/admin/addPanalMem/:gid',auth,admin,groupController.addPanalMember);

module.exports = route;