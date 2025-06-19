const axios = require('axios');

exports.getGeoData = async (ip) => {
  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
    return {
      country: data.country,
      region: data.regionName,
      city: data.city
    };
  } catch (err) {
    return { country: "Unknown", region: "", city: "" };
  }
};