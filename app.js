const { weather_emoji } = require('./src/wunderground');
const { curl } = require('./src/slack');
const schedule = require('node-schedule');

const job = async () => {
  const p = await weather_emoji('seoul');
  curl(p).then(res => {
    console.log(p);
  });
};

cron.schedule('0 21 * * 0-4', job); // GMT
// cron.schedule('0 6 * * 1-5', job); // KST
