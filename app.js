const { weather_emoji } = require('./src/wunderground');
const { curl } = require('./src/slack');
const schedule = require('node-schedule');

const job = async () => {
  const payload = await weather_emoji('seoul');
  curl(payload).then(res => {
    console.log(payload);
  });
};

cron.schedule('0 21 * * 0-4', job); // GMT
// cron.schedule('0 6 * * 1-5', job); // KST
