const route = require("express").Router();
const upload = require("../middlewares/upload");
const uploadImage = require("../middlewares/uploadImage");
const auth = require("../middlewares/auth");
const uploadController = require("../controllers/uploadController");

const fileUploadController = require("../controllers/fileUploadController");


route.post(
  "/api/upload",
  uploadImage,
  upload,
  auth,
  uploadController.uploadAvar
);

route.post(
  "/api/fileupload",
  fileUploadController.uploadFile
);


module.exports = route;