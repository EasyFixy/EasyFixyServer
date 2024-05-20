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
const { insertComment } = require('../controllers/insertComment')
const { getMessagesByConversation } = require('../controllers/gerMessagesByConversation')
const { getConversations } = require('../controllers/getConversations')
const { getBasicUserInfo } = require('../controllers/getBasicUserInfo')
const { notificationMercadoPago } = require('../controllers/notificationMercadopago')
const { createJob } = require('../controllers/createJob')
const { updateJobStatus } = require('../controllers/updateJobStatus')
const { createDispatch } = require('../controllers/createDispatch')
const { getUserSkills } = require('../controllers/getUserSkills')
const { deleteSkill } = require('../controllers/deleteSkill')
const { getUserProfit } = require('../controllers/getUserProfit')
const { getJobsPendingOfWorker } = require('../controllers/getJobsPendingOfWorker')
const { getJobsDoneByWorker } = require('../controllers/getJobsDoneByWorker')
const { getUserStatus } = require('../controllers/getUserStatus')
const { getEmployerProfile } = require('../controllers/getEmployerProfile')
const { getJobOffer } = require('../controllers/getJobOffer')
const { getPaymentInfoPerReference } = require('../controllers/getPaymentInfoPerReference')

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
router.get('/getBasicUserInfo', getBasicUserInfo);
router.get('/getUserSkills', getUserSkills);
router.get('/deleteSkill', deleteSkill);
router.get('/getUserProfit', getUserProfit);
router.get('/getJobsPendingOfWorker', getJobsPendingOfWorker);
router.get('/getJobsDoneByWorker', getJobsDoneByWorker);
router.get('/getUserStatus', getUserStatus);
router.get('/getEmployerProfile', getEmployerProfile);
router.get('/getJobOffer', getJobOffer);
router.get('/getPaymentInfoPerReference', getPaymentInfoPerReference);

router.post('/createLaboralUserResume', createLaboralUserResume);
router.post('/getLaborsPerCategories', getLaborsPerCategories);
router.post('/uploadUserSkills', uploadUserSkills);
router.post('/getBestWorkersForLabors', getBestWorkersForLabors);
router.post('/insertUserSkills', insertUserSkills);
router.post('/createJobOffer', createJobOffer);
router.post('/insertComment', insertComment);
router.post('/notificationMercadoPago', notificationMercadoPago);
router.post('/createJob', createJob);
router.post('/updateJobStatus', updateJobStatus);
router.post('/createDispatch', createDispatch);

module.exports = router;