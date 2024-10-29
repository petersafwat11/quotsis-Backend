const express = require("express");
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.use(authController.restrictTo("Admin"));
router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);
//   .delete(usersController.deleteManyUsers);

// router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/logout", authController.logout);

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
// router.use(authController.protect);

// router.patch("/updateMyPassword", authController.updatePassword);
// router
//   .route("/:id")
//   .get(usersController.getUser)
//   .patch(authController.adminProtection, authController.updateUser);
module.exports = router;
