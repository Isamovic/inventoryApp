const productController = require("../controllers/productController");
const modelesController = require("../controllers/modelesController");

var express = require("express");
var router = express.Router();

router.get("/modeles/create/", productController.createMarqueForm_get);
router.post("/modeles/create/", productController.createMarqueForm_post);

router.get("/modeles/", modelesController.displayAllModels);

router.get("/:id", productController.displayProduct);
router.get("/modeles/:id", modelesController.displayOneModel);

module.exports = router;
