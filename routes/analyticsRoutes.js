const express = require('express');
const router = express.Router();
const analytics = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

router.get('/summary', analytics.getSummary);
router.get('/pages', analytics.getPages);
router.get('/referrers', analytics.getReferrers);
router.get('/export', analytics.exportData);
router.get('/timeline', analytics.getTimeline);
router.get('/devices', analytics.getDevices);
router.get('/geo', analytics.getGeo);
module.exports = router;


// console.log('auth is:', typeof auth); // should be 'function'
// console.log('analytics.getSummary is:', typeof analytics.getSummary); // should be 'function'
// console.log('analytics.getPages is:', typeof analytics.getPages); // should be 'function'
// console.log('analytics.getReferrers is:', typeof analytics.getReferrers); // should be 'function'

