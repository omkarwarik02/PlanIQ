const express =require('express');
const {subjectController,getSubjectController,deleteSubjectController} = require("../Controllers/subjectController");


const router =express.Router();

router.post('/add',subjectController);
router.get('/get',getSubjectController);
router.delete('/delete/:id',deleteSubjectController);

module.exports = router;