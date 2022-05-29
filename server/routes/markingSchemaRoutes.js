const { Router } = require("express");
const route = Router();
const markingSchemaController = require("../controllers/markingSchemaController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post('/api/schema/add', auth, admin, markingSchemaController.addSchema);
route.get('/api/schema/getAll', auth, admin, markingSchemaController.getAll);
route.get('/api/schema/get/:id', auth, admin, markingSchemaController.getOne);
route.post('/api/schema/update/:id', auth, admin, markingSchemaController.updateSchema);
route.delete('/api/schema/delete/:id', auth, admin, markingSchemaController.deleteSchema);

module.exports = route;