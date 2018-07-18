var axios = require('axios');

const { wunderground } = require('./_key');
const _key = wunderground;

// url functions
const url_conditions_korea = loc =>
  `http://api.wunderground.com/api/${_key}/conditions/q/KR/${loc}.json`;
const url_conditions_not_korea = loc =>
  `http://api.wunderground.com/api/${_key}/conditions/q/${loc}.json`;
const url_hourly = loc =>
  `http://api.wunderground.com/api/${_key}/hourly/q/${loc}.json`;
const url_forecast = loc =>
  `http://api.wunderground.com/api/${_key}/forecast/q/${loc}.json`;

// query functions
/**
 *
 * @param {string} loc
 */
const condition = (loc = '') => {
  const url = url_conditions_korea(loc);
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(res);
      });
  });
};

/**
 *
 * @param {string} loc
 */
const hourly = (loc = '') => {
  const url = url_hourly(loc);
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(res);
      });
  });
};

// export { condition };
module.exports = { condition, hourly };
