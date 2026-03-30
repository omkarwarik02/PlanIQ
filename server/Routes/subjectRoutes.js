const express =require('express');
const {subjectController} = require("../Controllers/subjectController");


const router =express.Router();

router.post('/add',subjectController);

module.exports = router;