const express = require("express");
const router = express.Router();
const pushController = require("../controllers/push.controller");

router.get(
  "/:param1/:param2/:param3/:param4/:param5/:param6/:param7/:param8/:user_address/checkAccess",
  pushController.checkAccess
);
module.exports = router;
