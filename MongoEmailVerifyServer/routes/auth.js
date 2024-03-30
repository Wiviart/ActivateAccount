// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, activate } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/account-activation', activate);
module.exports = router;