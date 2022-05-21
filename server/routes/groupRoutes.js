const { Router } = require("express");
const route = Router();
const groupController = require("../controllers/groupController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post("/api/group/groupRegister", auth,groupController.groupRegister);

module.exports = route;