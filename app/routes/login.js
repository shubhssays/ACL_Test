const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
// const { check, validationResult } = require("express-validator");

router.post("/create-user", loginController.createUser);

router.post("/login", loginController.login);

module.exports = router;
