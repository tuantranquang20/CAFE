const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userModels = require('./../models/userModels')
const authController = require("./../controllers/authControllers");
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/changePassword/", authController.changePassword);

router.use(authController.protected);
router
  .route("/")
  .patch(
    userControllers.uploadUserPhoto,
    userControllers.resizeUserPhoto,
    userControllers.getMe,
    userControllers.updateUser
  ); //userControllers.getMe,  userControllers.updateUser
router.post("/", userControllers.createUser);
//tạo middle ware check role
// router.use(authController.protected, authController.checkRole);
router.route("/").get(userControllers.getUserInfo);
//authController.protected, 
router
  .route("/:id")
  .post(userControllers.findUser)
  .delete(userControllers.deleteUser);
module.exports = router;
