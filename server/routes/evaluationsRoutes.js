const { Router } = require("express");
const route = Router();
const evaluationController = require("../controllers/evaluationsController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const supervisor = require("../middlewares/supervisor");

route.post('/api/evaluation/add', auth, supervisor, evaluationController.addEvaluation);
route.get('/api/evaluation/getAll', auth, supervisor, evaluationController.getAll);
route.get('/api/evaluation/get/:id', auth, supervisor, evaluationController.getOne);
route.post('/api/evaluation/getLevel', auth, supervisor, evaluationController.getLevel);
route.post('/api/evaluation/update/:id', auth, supervisor, evaluationController.updateEvaluation);
route.delete('/api/evaluation/delete/:id', auth, supervisor, evaluationController.deleteEvaluation);

module.exports = route;