const { Router } = require("express");
const route = Router();
// Bring in the User Registration function
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");


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
route.post("/register-panelMember", async (req, res) => {
    await userController.register(req, "panelMember", res);
  });

// Activation  Route
route.post("/api/auth/activation", userController.activate);

// TO DO : create the panal member activation route including the extended token expire hour
//route.post("/api/auth/panalMemberactivation", userController.activatePanalmember);

//User Registration
route.post("/api/auth/signing", userController.signing);

// Get Access Token
route.post("/api/auth/access", userController.access);

//get user data by id
route.get("/api/auth/user", auth, userController.info);

//get user data by id
route.get("/api/auth/users", admin, userController.allinfo);

//LogOut
route.get("/api/auth/signout", userController.signout);

module.exports = route;