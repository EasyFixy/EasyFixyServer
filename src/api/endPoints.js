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
const { getBestWorkersForLabors } = require('../controllers/getBestWorkersForLabors')
const { insertUserSkills } = require('../controllers/insertUserSkills')
const { getJobOffertedOffersByEmployer } = require('../controllers/getJobOffertedOffersByEmployer') 
const { getJobPendingOffersByEmployer } = require('../controllers/getJobPendingOffersByEmployer')
const { getJobDoneByEmployer } = require('../controllers/getJobDoneByEmployer')

router.get('/userRegistration', userRegistration);
router.get('/userLogin', userLogin);
router.get('/sendResetMail', sendResetMail);
router.get('/resetPassword', resetPassword);
router.get('/createJobOffer', createJobOffer);
router.get('/modifyUserInfo', modifyUserInfo);
router.get('/getJobCategories', getJobCategories);
router.get('/getUserProfile', getUserProfile);
router.get('/updateUserTempData', updateUserTempData);
router.get('/getJobOffertedOffersByEmployer', getJobOffertedOffersByEmployer);
router.get('/getJobPendingOffersByEmployer', getJobPendingOffersByEmployer);
router.get('/getJobDoneByEmployer', getJobDoneByEmployer);

router.post('/createLaboralUserResume', createLaboralUserResume);
router.post('/getLaborsPerCategories', getLaborsPerCategories);
router.post('/uploadUserSkills', uploadUserSkills);
router.post('/getBestWorkersForLabors', getBestWorkersForLabors);
router.post('/insertUserSkills', insertUserSkills);

module.exports = router;