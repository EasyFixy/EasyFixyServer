const express = require('express');
const router = express.Router();

const { userRegistration } =require('../controllers/userRegistration')
const { userLogin } = require('../controllers/userLogin')
const { sendResetMail } = require('../controllers/sendResetMail')
const { resetPassword } = require('../controllers/resetPassword')
const { createJobOffer } = require('../controllers/createJobOffer')
const { createLaboralUserResume } = require('../controllers/createLaboralUserResume')
const { modifyUserInfo } = require('../controllers/modifyUserInfo')
const { getJobCategories } = require('../controllers/getJobCategories')
const { getLaborsPerCategories } = require('../controllers/getLaborsPerCategories')

router.get('/userRegistration', userRegistration);
router.get('/userLogin', userLogin);
router.get('/sendResetMail', sendResetMail);
router.get('/resetPassword', resetPassword);
router.get('/createJobOffer', createJobOffer);
router.get('/createLaboralUserResume', createLaboralUserResume);
router.get('/modifyUserInfo', modifyUserInfo);
router.get('/getJobCategories', getJobCategories);

router.post('/getLaborsPerCategories', getLaborsPerCategories);


module.exports = router;