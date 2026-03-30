const express =require('express');
const {subjectController,getSubjectController} = require("../Controllers/subjectController");


const router =express.Router();

router.post('/add',subjectController);
router.get('/get',getSubjectController);

module.exports = router;