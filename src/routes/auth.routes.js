const { Router } = require("express");
const router = Router();
const { verifySignUp } = require("../middlewares");

const controller = require("../controllers/auth.controller");

router.post("/signin", controller.signIn);
router.post(
  "/signup",
  [verifySignUp.checkUsernameOrEmailDuplicated, verifySignUp.checkRolesExists],
  controller.signUp
);

module.exports = router;
