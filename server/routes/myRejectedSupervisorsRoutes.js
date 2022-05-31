const { Router } = require("express");
const route = Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const myRejectedSupervisorsController = require("../controllers/myRejectedSupervisorsController");

route.get('/api/prevSupervisors/getAll/:gid',auth,myRejectedSupervisorsController.getall)

module.exports =route;