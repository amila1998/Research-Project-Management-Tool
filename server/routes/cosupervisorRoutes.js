const { Router } = require("express");
const route = Router();
const requestCoSupervisor = require("../controllers/requestCoSupervisor");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const coSupervisor = require("../middlewares/coSupervisor");

route.get('/api/cosupervisor/getcosupervisortoreq/:tid/:gid',auth,requestCoSupervisor.getCoSupervisors)
route.post('/api/cosupervisor/sendRequest/:gid',auth,requestCoSupervisor.sendARequest)

route.get('/api/cosupervisor/getmygrouprequests',auth,coSupervisor,requestCoSupervisor.getMyGroupRequests)
route.post('/api/cosupervisor/giveResponse/:gid',auth,coSupervisor,requestCoSupervisor.giveResponse)

module.exports = route;