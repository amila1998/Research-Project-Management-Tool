const { Router } = require("express");
const route = Router();
const topicsController = require("../controllers/topicsController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post('/api/topics/addTopic',auth,topicsController.topicRegistration);


module.exports = route;