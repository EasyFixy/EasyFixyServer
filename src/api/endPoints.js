const express = require('express');
const router = express.Router();

const { userRegistration } =require('../controllers/userRegistration')
const { userLogin } = require('../controllers/userLogin')
const { sendResetMail } = require('../controllers/sendResetMail')
const { resetPassword } = require('../controllers/resetPassword')
const { createJobOffer } = require('../controllers/createJobOffer')
const { createLaboralUserResume } = require('../controllers/createLaboralUserResume')

router.get('/userRegistration', userRegistration);
router.get('/userLogin', userLogin);
router.get('/sendResetMail', sendResetMail);
router.get('/resetPassword', resetPassword);
router.get('/createJobOffer', createJobOffer);
router.get('/createLaboralUserResume', createLaboralUserResume);

module.exports = router;