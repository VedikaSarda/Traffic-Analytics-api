const { createObjectCsvStringifier } = require('csv-writer');

exports.exportToCSV = async (data) => {
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'url', title: 'URL' },
      { id: 'referrer', title: 'Referrer' },
      { id: 'userAgent', title: 'User Agent' },
      { id: 'timestamp', title: 'Timestamp' },
      { id: 'ip', title: 'IP' },
      { id: 'country', title: 'Country' },
      { id: 'region', title: 'Region' },
      { id: 'city', title: 'City' },
      { id: 'device', title: 'Device' },
      { id: 'os', title: 'OS' },
      { id: 'browser', title: 'Browser' },
      { id: 'sessionId', title: 'Session ID' },
      { id: 'customTags', title: 'Custom Tags' },
    ]
  });

  const records = data.map(v => ({
    url: v.url,
    referrer: v.referrer,
    userAgent: v.userAgent,
    timestamp: v.timestamp,
    ip: v.ip,
    country: v.geo?.country || '',
    region: v.geo?.region || '',
    city: v.geo?.city || '',
    device: v.device,
    os: v.os,
    browser: v.browser,
    sessionId: v.sessionId,
    customTags: v.customTags?.join(',') || ''
  }));

  return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
};
