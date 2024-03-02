const express = require('express');
const router = express.Router();

const { userRegistration } =require('../controllers/userRegistration')
const { userLogin } = require('../controllers/userLogin')

router.get('/userRegistration', userRegistration);
router.get('/userLogin', userLogin);

module.exports = router;