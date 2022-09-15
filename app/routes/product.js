const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { validate } = require("../helpers/validation");

router.get("/", validate, productController.products);

router.post("/", validate, productController.products);

router.put("/", validate, productController.products);

router.delete("/", validate, productController.products);

module.exports = router;
