const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userModels = require('./../models/userModels')
const authController = require("./../controllers/authControllers");
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/changePassword/", authController.changePassword);
router.post("/", userControllers.createUser);

router.use(authController.protected);
router
  .route("/")
  .patch(
    userControllers.uploadUserPhoto,
    userControllers.resizeUserPhoto,
    userControllers.getMe,
    userControllers.updateUser
  ); //userControllers.getMe,  userControllers.updateUser
//tạo middle ware check role
// router.use(authController.protected, authController.checkRole);
router.route("/").get(userControllers.getUserInfo);
//authController.protected, 
router
  .route("/:id")
  .post(userControllers.findUser)
  .delete(userControllers.deleteUser);
module.exports = router;
//đầu tiên phải gọi đến hàm upload, sau đó resize, resize xong có path thì mới update dc 