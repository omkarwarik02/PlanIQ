const express =require('express');
const {subjectController,getSubjectController,deleteSubjectController} = require("../Controllers/subjectController");
const {protect} =require("../Middlewares/authMiddleware");

const router =express.Router();

router.post('/add',protect,subjectController);
router.get('/get',protect,getSubjectController);
router.delete('/delete/:id',protect,deleteSubjectController);

module.exports = router;