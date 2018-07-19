const { weather_emoji } = require('./src/wunderground');
const { curl } = require('./src/slack');
const cron = require('node-cron');

const job = async () => {
  const p = await weather_emoji('seoul');
  curl('날씨 발송 테스트입니다.\n' + p);
};

cron.schedule('0 21 * * 0-4', job); // cron.schedule('0 6 * * 1-5', job);
