const { Router } = require("express");
const route = Router();
const topicsController = require("../controllers/topicsController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const panalMember = require("../middlewares/panalMember");

route.post('/api/topics/addTopic',auth,topicsController.topicRegistration);
route.get('/api/topics/getmyTopicDetails/:id',auth,topicsController.getMyTopic);

route.get('/api/topics/getTopicDetails/:groupId',auth,topicsController.getATopic);
route.get('/api/topics/getall',auth,panalMember,topicsController.getAllTopics)
module.exports = route;