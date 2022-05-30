const { Router } = require("express");
const route = Router();
const requestSupervisor = require("../controllers/requestSupervisor");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.get('/api/supervisor/getsupervisortoreq/:tid/:gid',auth,requestSupervisor.getSupervisors)


module.exports = route;