const express = require("express");
const router = express.Router();
const aiController = require("../Controllers/aiController");
const {protect} = require("../Middlewares/authMiddleware");



router.post("/generate-plan",protect,aiController.generatePlan);
router.post("/generate-tasks",protect,aiController.generateTasks);

module.exports = router;