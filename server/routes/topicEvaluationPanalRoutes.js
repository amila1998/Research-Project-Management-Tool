const { Router } = require("express");
const route = Router();
const topicEvaluationPanelController = require("../controllers/topicEvaluationPanelManagementController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post('/api/topicEvPanlMem/add',auth,admin,topicEvaluationPanelController.add);

module.exports = route;