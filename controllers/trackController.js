const Visit = require('../models/Visit');
const { getGeoData } = require('../utils/geoLookup');
const useragent = require('useragent');

exports.trackVisit = async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const { url, referrer, sessionId, customTags } = req.body;
    const geo = await getGeoData(ip);
    const agent = useragent.parse(req.headers['user-agent']);

    const visit = new Visit({
      url,
      referrer,
      userAgent: req.headers['user-agent'],
      ip,
      geo,
      device: agent.device.toString(),
      os: agent.os.toString(),
      browser: agent.toAgent(),
      sessionId,
      customTags
    });

    await visit.save();
    res.status(201).json({ message: "Visit tracked." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
