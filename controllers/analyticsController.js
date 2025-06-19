const Visit = require('../models/Visit');
const { exportToCSV } = require('../utils/csvExport');

// 1. Summary
exports.getSummary = async (req, res) => {
  const totalHits = await Visit.countDocuments();
  const uniqueVisitors = await Visit.distinct('ip').then(ips => ips.length);
  const bounceRate = 0; // Placeholder
  const avgSessionDuration = 0; // Placeholder
  res.json({ totalHits, uniqueVisitors, avgSessionDuration, bounceRate });
};

// 2. Top visited pages
exports.getPages = async (req, res) => {
  const topPages = await Visit.aggregate([
    { $group: { _id: "$url", hits: { $sum: 1 } } },
    { $sort: { hits: -1 } }
  ]);
  res.json(topPages);
};

// 3. Referrer breakdown
exports.getReferrers = async (req, res) => {
  const referrers = await Visit.aggregate([
    {
      $group: {
        _id: {
          $cond: [
            { $or: [{ $eq: ["$referrer", null] }, { $eq: ["$referrer", ""] }] },
            "direct",
            "$referrer"
          ]
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
  res.json(referrers);
};

// 4. Timeline (by day)
exports.getTimeline = async (req, res) => {
  const timeline = await Visit.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
          day: { $dayOfMonth: "$timestamp" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
  ]);
  res.json(timeline);
};

// 5. Devices breakdown
exports.getDevices = async (req, res) => {
  const result = await Visit.aggregate([
    {
      $group: {
        _id: {
          device: "$device",
          os: "$os",
          browser: "$browser"
        },
        count: { $sum: 1 }
      }
    }
  ]);
  res.json(result);
};

// 6. Geo breakdown
exports.getGeo = async (req, res) => {
  const geo = await Visit.aggregate([
    {
      $group: {
        _id: {
          country: "$geo.country",
          region: "$geo.region",
          city: "$geo.city"
        },
        count: { $sum: 1 }
      }
    }
  ]);
  res.json(geo);
};

// 7. Export
exports.exportData = async (req, res) => {
  try {
    const visits = await Visit.find({});
    const csv = await exportToCSV(visits);
    res.header('Content-Type', 'text/csv');
    res.attachment('analytics_export.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export data' });
  }
};
