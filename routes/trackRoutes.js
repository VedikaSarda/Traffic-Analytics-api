const express = require('express');
const router = express.Router();
const { trackVisit } = require('../controllers/trackController');
const rateLimit = require('../middleware/rateLimiter');
const validateInput = require('../middleware/validateInput');

router.post('/', rateLimit, validateInput, trackVisit);

module.exports = router;
