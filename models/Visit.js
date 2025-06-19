const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  url: String,
  referrer: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now },
  ip: String,
  geo: {
    country: String,
    region: String,
    city: String
  },
  device: String,
  os: String,
  browser: String,
  sessionId: String,
  customTags: [String]
});

module.exports = mongoose.model('Visit', visitSchema);