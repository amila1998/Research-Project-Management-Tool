const { Router } = require("express");
const route = Router();
const  submssionController= require("../controllers/submssionController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const supervisor = require("../middlewares/supervisor");
const coSupervisor= require("../middlewares/coSupervisor");
const panalMember=require("../middlewares/panalMember");

route.post('/api/submssion/add',auth,submssionController.addSubmssion);
route.get('/api/submssion/getAll',submssionController.getAll);
route.get('/api/submssion/getOne/:id',submssionController.getOne);
route.get('/api/submssion/getSupervisorsSub',auth,supervisor,submssionController.getSupervisorsSub);
route.get('/api/submssion/getCoSupervisorsSub',auth,coSupervisor,submssionController.getCoSupervisorsSub);
route.get('/api/submssion/getPanalMemberSub',auth,panalMember,submssionController.getPanalMemberSub);
route.get('/api/submssion/getSubmitted/:groupId/:eventId',submssionController.getSubmitted);
route.put('/api/submssion/updateSubmssion/:id',submssionController.updateSubmssion);
module.exports = route;