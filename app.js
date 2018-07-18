const { condition, hourly } = require('./src/wunderground');

// console.log(condition('seoul'));
hourly('seoul').then(data => {
  console.log('data: ', data);
});
