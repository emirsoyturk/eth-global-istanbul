const express = require("express");
const router = express.Router();
const noirController = require("../controllers/noir.controller");

router.post("/prove/location", noirController.proveLocation);
router.post("/prove/inside", noirController.proveInside);
module.exports = router;
