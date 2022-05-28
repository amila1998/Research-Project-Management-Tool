const { Router } = require("express");
const route = Router();
const groupController = require("../controllers/groupController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post("/api/group/groupRegister",groupController.groupRegister);
route.post("/api/group/getMutualStudents", auth,groupController.getMutualStudents);
route.get('/api/group/getmygroup/:id',auth,groupController.getMyGroupDetails);

module.exports = route;