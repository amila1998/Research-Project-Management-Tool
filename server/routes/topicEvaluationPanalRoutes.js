const { Router } = require("express");
const route = Router();
const topicEvaluationPanelController = require("../controllers/topicEvaluationPanelManagementController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const panalMember = require("../middlewares/panalMember");

route.post('/api/topicEvPanlMem/add',auth,admin,topicEvaluationPanelController.add);
route.get('/api/topicEvPanlMem/check/:uid',auth,panalMember,topicEvaluationPanelController.check);
route.delete('/api/topicEvPanlMem/delete/:id',auth,admin,topicEvaluationPanelController.delete);
route.get('/api/topicEvPanlMem/getAll',auth,admin,topicEvaluationPanelController.getAll);
route.get('/api/topicEvPanlMem/getAllPanaleMem',auth,admin,topicEvaluationPanelController.getAllPanalMem);



module.exports = route;