const { weather_emoji } = require('./src/wunderground');
const cron = require('node-cron');

const job = async () => {
  const p = await weather_emoji('seoul');
  console.log(p);
};

cron.schedule('0 21 * * 0-4', job); // cron.schedule('0 6 * * 1-5', job);
