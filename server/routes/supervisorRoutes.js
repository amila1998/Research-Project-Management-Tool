const { Router } = require("express");
const route = Router();
const requestSupervisor = require("../controllers/requestSupervisor");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const supervisor = require("../middlewares/supervisor");

route.get('/api/supervisor/getsupervisortoreq/:tid/:gid',auth,requestSupervisor.getSupervisors)
route.post('/api/supervisor/sendRequest/:gid',auth,requestSupervisor.sendARequest)

route.get('/api/supervisor/getmygrouprequests',auth,supervisor,requestSupervisor.getMyGroupRequests)
route.post('/api/supervisor/giveResponse/:gid',auth,supervisor,requestSupervisor.giveResponse)

module.exports = route;