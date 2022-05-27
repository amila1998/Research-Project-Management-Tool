const { Router } = require("express");
const route = Router();
const  submssionController= require("../controllers/submssionController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

route.post('/api/submssion/add',submssionController.addSubmssion);
route.get('/api/submssion/getAll',submssionController.getAll);
route.get('/api/submssion/getOne/:id',submssionController.getOne);
route.put('/api/submssion/updateSubmssion/:id',submssionController.updateSubmssion);
module.exports = route;