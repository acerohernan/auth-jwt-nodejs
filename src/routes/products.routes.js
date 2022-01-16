const { Router } = require("express");
const controller = require("../controllers/products.controller");
const router = Router();

const { authJwt } = require("../middlewares");

router.get("/", controller.getAllProducts);

router.get("/:id", controller.getProductById);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.createProduct
);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.updateProduct
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteProduct
);

module.exports = router;
