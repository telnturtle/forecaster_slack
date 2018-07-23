const { weather_emoji } = require('./src/wunderground');
const { curl } = require('./src/slack');
const schedule = require('node-schedule');

const job = async () => {
  const payload = await weather_emoji('seoul');
  curl(payload).then(res => {
    console.log(payload, '\n');
  });
};

console.log('Forecaster\n', Date(), '\n');

const ssj = schedule.scheduleJob('0 21 * * 0-4', job); // GMT
// const ssj = schedule.scheduleJob('0 6 * * 1-5', job); // KST
