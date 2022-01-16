const { Router } = require("express");
const router = Router();

const controller = require("../controllers/user.controller");

router.get("/", controller.getAll);

module.exports = router;
