const express = require('express');
const router = express.Router();

const collegeController=require('../controllers/collegeController')
const internController=require('../controllers/internController')




router.post('/functionup/createCollege', collegeController.createCollege)

router.post('/functionup/createIntern', internController.createIntern)
router.get('/getCollegeDetails', internController.getCollegeDetails)


module.exports=router;