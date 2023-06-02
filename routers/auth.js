const express = require('express');
const signupHandler = require('../api/auth/signup');
const signinHandler = require('../api/auth/signin');

const router = express.Router();

router.post('/signup', signupHandler);
router.post('/signin', signinHandler);

module.exports = router;
