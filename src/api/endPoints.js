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
const { insertMessage } = require('../controllers/insertComment')
const { getMessagesByConversation } = require('../controllers/gerMessagesByConversation')
const { getConversations } = require('../controllers/getConversations')

router.get('/userRegistration', userRegistration);
router.get('/userLogin', userLogin);
router.get('/sendResetMail', sendResetMail);
router.get('/resetPassword', resetPassword);
router.get('/modifyUserInfo', modifyUserInfo);
router.get('/getJobCategories', getJobCategories);
router.get('/getUserProfile', getUserProfile);
router.get('/updateUserTempData', updateUserTempData);
router.get('/getJobOffertedOffersByEmployer', getJobOffertedOffersByEmployer);
router.get('/getJobPendingOffersByEmployer', getJobPendingOffersByEmployer);
router.get('/getJobDoneByEmployer', getJobDoneByEmployer);
router.get('/getMessagesByConversation', getMessagesByConversation);
router.get('/getConversations', getConversations);

router.post('/createLaboralUserResume', createLaboralUserResume);
router.post('/getLaborsPerCategories', getLaborsPerCategories);
router.post('/uploadUserSkills', uploadUserSkills);
router.post('/getBestWorkersForLabors', getBestWorkersForLabors);
router.post('/insertUserSkills', insertUserSkills);
router.post('/createJobOffer', createJobOffer);
router.post('/insertMessage', insertMessage);

module.exports = router;