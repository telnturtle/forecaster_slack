const { weather_emoji } = require('./src/wunderground');
const { curl } = require('./src/slack');
const cron = require('node-cron');

const job = async () => {
  const payload = await weather_emoji('seoul');
  curl(payload);
};

cron.schedule('0 21 * * 0-4', job); // server's time zone: UTC+00:00
// cron.schedule('0 6 * * 1-5', job); // KST ( UTC+09:00 )
