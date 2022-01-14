const { Router } = require("express");
const controller = require("../controllers/products.controller");
const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getProductById);
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
