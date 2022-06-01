const { Router } = require("express");
const route = Router();
const topicsController = require("../controllers/topicsController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const panalMember = require("../middlewares/panalMember");

route.post('/api/topics/addTopic',auth,topicsController.topicRegistration);
route.get('/api/topics/getmyTopicDetails/:id',auth,topicsController.getMyTopic);

route.get('/api/topics/getTopicDetails/:groupId',auth,topicsController.getATopic);
route.get('/api/topics/getall',auth,panalMember,topicsController.getAllTopics);
route.get('/api/topics/getalltoResponce',auth,panalMember,topicsController.getTopicsToResponce);
route.post('/api/topics/panalMemResponse/:gid/:tid',auth,panalMember,topicsController.panalMemberResponse);
route.get('/api/topics/getMyRejectTopics/:gid',auth,topicsController.getMyRejectedTopics);

module.exports = route;