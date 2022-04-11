const { Router } = require("express");
const route = Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// route.post("/register-student", userController.register);
// route.post("/register-admin", userController.register);
// route.post("/register-supervisor", userController.register);
// route.post("/register-coSupervisor", userController.register);

// Students Registeration Route
route.post("/register-student", async (req, res) => {
    await userController.register(req, "student", res);
  });
  
  // Admin Registration Route
  route.post("/register-admin", async (req, res) => {
    await userController.register(req, "admin", res);
  });
  
  // Supervisor Registration Route
  route.post("/register-supervisor", async (req, res) => {
    await userController.register(req, "supervisor", res);
  });
  
  // Co-Supervisor Registration Route
  route.post("/register-coSupervisor", async (req, res) => {
      await userController.register(req, "coSupervisor", res);
    });
  
  // PanelMember Registration Route
  // TO DO : Add Permission to only Admin
  route.post("/register-panelMember",admin, async (req, res) => {
      await userController.panalMemberRegister(req, "panelMember", res);
    });


route.post("/api/auth/activation", userController.activate);
route.post("/api/auth/signing", userController.signing);
route.post("/api/auth/access", userController.access);
route.post("/api/auth/forgot_pass", userController.forgot);
route.post("/api/auth/reset_pass", auth, userController.reset);
route.get("/api/auth/user", auth, userController.info);
route.patch("/api/auth/user_update", auth, userController.update);
route.get("/api/auth/signout", userController.signout);



module.exports = route;