const express = require("express");
const router = express.Router();
const aiController = require("../Controllers/aiController");

router.post("/generate-plan",aiController.generatePlan);


module.exports = router;