const express = require('express');
const router = express.Router();
const analytics = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

router.get('/summary',auth, analytics.getSummary);
router.get('/pages',auth, analytics.getPages);
router.get('/referrers',auth, analytics.getReferrers);
router.get('/export',auth, analytics.exportData);
router.get('/timeline',auth, analytics.getTimeline);
router.get('/devices',auth, analytics.getDevices);
router.get('/geo',auth, analytics.getGeo);
module.exports = router;

// File: middleware/rateLimiter.js
//const rateLimit = require("express-rate-limit");
// console.log('auth is:', typeof auth); // should be 'function'
// console.log('analytics.getSummary is:', typeof analytics.getSummary); // should be 'function'
// console.log('analytics.getPages is:', typeof analytics.getPages); // should be 'function'
// console.log('analytics.getReferrers is:', typeof analytics.getReferrers); // should be 'function'

