const { Router } = require("express");
const route = Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const verifyToken = require("../middlewares/verifyToken");

// route.post("/register-student", userController.register);
// route.post("/register-admin", userController.register);
// route.post("/register-supervisor", userController.register);
// route.post("/register-coSupervisor", userController.register);

// Students Registeration Route
route.post("/api/register-student", async (req, res) => {
    await userController.register(req, res);
  });
  
 
  // Staff Registration Route
  route.post("/api/register-staff", async (req, res) => {
    await userController.register(req, res);
  });



route.post("/api/auth/activation", userController.activate);
route.post("/api/auth/signing", userController.signing);
route.post("/api/auth/refresh", auth, userController.refresh);
route.post("/api/auth/forgot_pass", userController.forgot);
route.post("/api/auth/reset_pass", verifyToken, userController.reset);
route.get("/api/auth/user", auth, userController.info);
route.patch("/api/auth/user_update", auth, userController.update);
route.get("/api/auth/signout", userController.signout);
route.get("/api/admin/getallUsers",auth,admin, userController.getAllUsers);





module.exports = route;