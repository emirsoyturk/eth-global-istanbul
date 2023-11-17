const express = require("express");
const router = express.Router();
const noirController = require("../controllers/noir.controller");

router.post("/artifacts", testController.artifacts);

module.exports = router;
