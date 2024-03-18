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
const { uploadUserSkills } = require('../controllers/uploadUserSkills')
const { getUserProfile } = require('../controllers/getUserProfile')
const { updateUserTempData } = require('../controllers/updateUserTempData')

router.get('/userRegistration', userRegistration);
router.get('/userLogin', userLogin);
router.get('/sendResetMail', sendResetMail);
router.get('/resetPassword', resetPassword);
router.get('/createJobOffer', createJobOffer);
router.get('/modifyUserInfo', modifyUserInfo);
router.get('/getJobCategories', getJobCategories);
router.get('/getUserProfile', getUserProfile);
router.get('/updateUserTempData', updateUserTempData);

router.post('/createLaboralUserResume', createLaboralUserResume);
router.post('/getLaborsPerCategories', getLaborsPerCategories);
router.post('/uploadUserSkills', uploadUserSkills);

module.exports = router;