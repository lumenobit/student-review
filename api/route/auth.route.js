const express = require('express');
const { attemptLogin } = require('../controller/auth.controller');
const router = express.Router();

router.post('/login', attemptLogin);

module.exports = router;
