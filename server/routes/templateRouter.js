const { Router } = require("express");
const route = Router();
const templateController = require("../controllers/templateController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post('/api/template/add',auth,admin,templateController.addTemplate);
route.post('/api/template/getAll',auth,admin,templateController.getAll);

module.exports = route;