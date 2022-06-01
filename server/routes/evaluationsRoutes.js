const { Router } = require("express");
const route = Router();
const evaluationController = require("../controllers/evaluationsController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post('/api/evaluation/add', auth, admin, evaluationController.addEvaluation);
route.get('/api/evaluation/getAll', auth, admin, evaluationController.getAll);
route.get('/api/evaluation/get/:id', auth, admin, evaluationController.getOne);
route.post('/api/evaluation/getLevel', auth, admin, evaluationController.getLevel);
route.post('/api/evaluation/update/:id', auth, admin, evaluationController.updateEvaluation);
route.delete('/api/evaluation/delete/:id', auth, admin, evaluationController.deleteEvaluation);

module.exports = route;