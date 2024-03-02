const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { userRegistration } =require('../controllers/userRegistration')
const { userLogin } = require('../controllers/userLogin')

router.get('/ping', ping);
router.get('/userRegistration', userRegistration);
router.get('/userLogin', userLogin);

module.exports = router;