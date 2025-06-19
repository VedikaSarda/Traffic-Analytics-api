const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const Visit = require('./models/Visit');
const { getGeoData } = require('./utils/geoLookup');

const NUM_RECORDS = 500;

const generateFakeVisits = async () => {
  const visits = [];

  for (let i = 0; i < NUM_RECORDS; i++) {
    const ip = faker.internet.ip();
    const userAgent = faker.internet.userAgent();
    const referrer = faker.helpers.arrayElement([
      '',
      'https://google.com',
      'https://facebook.com',
      'https://linkedin.com'
    ]);
    const url = faker.helpers.arrayElement([
      '/home', '/about', '/contact', '/pricing'
    ]);
    const customTags = faker.helpers.arrayElements(['signup', 'conversion', 'click'], faker.number.int({ min: 0, max: 2 }));
    const sessionId = faker.string.uuid();
    const timestamp = faker.date.recent(10);

    let geo = { country: '', region: '', city: '' };
    try {
      geo = await getGeoData(ip);
    } catch (err) {}

    visits.push({
      url,
      referrer,
      userAgent,
      timestamp,
      ip,
      geo,
      device: faker.helpers.arrayElement(['Desktop', 'Mobile']),
      os: faker.helpers.arrayElement(['Windows', 'macOS', 'Linux']),
      browser: faker.helpers.arrayElement(['Chrome', 'Firefox', 'Safari']),
      sessionId,
      customTags,
    });
  }

  return visits;
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Visit.deleteMany({});
    console.log('Old data cleared');

    const fakeVisits = await generateFakeVisits();
    await Visit.insertMany(fakeVisits);
    console.log(`${NUM_RECORDS} mock visits inserted.`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
