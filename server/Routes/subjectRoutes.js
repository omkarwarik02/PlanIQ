const express =require('express');
const {addSubject} = require("../Controllers/subjectController");


const router =express.Router();

router.post('/add',addSubject);

export default router;