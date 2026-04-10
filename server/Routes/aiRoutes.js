const express = require("express");
const router = express.Router();
const aiController = require("../Controllers/aiController");
const {protect} = require("../Middlewares/authMiddleware");
const aiLimiter = require("../Middlewares/aiLimiter")


router.post("/generate-plan",protect,aiLimiter,aiController.generatePlan);
router.post("/generate-tasks",protect,aiController.generateTasks);
router.post("/chat",protect,aiController.chat);

module.exports = router;