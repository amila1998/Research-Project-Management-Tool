const { Router } = require("express");
const route = Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const myRejectedCoSupervisorsController = require("../controllers/myRejectedCoSupervisorsController");

route.get('/api/prevCoSupervisors/getAll/:gid',auth,myRejectedCoSupervisorsController.getall)

module.exports =route;