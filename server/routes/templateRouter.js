const { Router } = require("express");
const route = Router();
const templateController = require("../controllers/templateController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post('/api/template/add',auth,admin,templateController.addTemplate);
route.get('/api/template/getAll',auth,templateController.getAll);
route.post('/api/template/update/:id',auth,admin,templateController.updateTemplate);
route.post('/api/template/delete/:id',auth,admin,templateController.deleteTemp);

module.exports = route;