const { condition, hourly, weather } = require('./src/wunderground');

// console.log(condition('seoul'));
// hourly('seoul').then(data => {
//   console.log('data: ', data);
// });
weather('seoul').then(result => console.log(result));
