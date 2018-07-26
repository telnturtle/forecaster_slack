const { weather_emoji } = require('./src/wunderground');
const { curl } = require('./src/slack');
const schedule = require('node-schedule');

const job = async () => {
  try {
    const payload = await weather_emoji('seoul');
    curl(payload).then(res => {
      console.log(payload, '\n');
    });
  } catch (e) {
    console.log('in app: ', e);
  }
};

console.log('Forecaster\n', Date(), '\n');

try {
  const ssj = schedule.scheduleJob('0 21 * * 0-4', job); // GMT
  // const ssj = schedule.scheduleJob('0 6 * * 1-5', job); // KST
  // const ssj2 = schedule.scheduleJob('*/1 * * * *', () => {
  //   console.log(Date());
  // }); // KST
} catch (e) {
  console.log('in loop: ', e);
}
