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
        if (!('error' in res)) {
          console.log('resolve in condition');
          resolve(res.data);
        } else {
          console.log('reject in condition');
          reject(res);
        }
      })
      .catch(err => {
        console.log('reject in condition');
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
        if (!('error' in res)) {
          console.log('resolve in hourly');
          resolve(res.data);
        } else {
          console.log('reject in hourly');
          reject(res);
        }
      })
      .catch(err => {
        console.log('reject in hourly');
        reject(res);
      });
  });
};

/**
 *
 * @param {string} loc
 */
const weather = async (loc = '') => {
  // get condition data
  let maybe_new_location = '';
  let cd = 'error';
  try {
    res = await condition(loc);
    if ('error' in res) {
      // 에러 결과
      1 / 0;
    } else if ('results' in res['response']) {
      // 리스트 결과
      maybe_new_location = 'zmw:' + res['response']['results'][0]['zmw'];
      condition(maybe_new_location)
        .then(res_ => {
          if ('error' in res_) {
            1 / 0;
          } else {
            cd = res_.data;
          }
        })
        .catch(err => {
          1 / 0;
        });
    } else {
      // 정상 결과
      cd = res.data;
    }
  } catch (exc) {
    cd = 'error';
  }

  // get hourly data
  maybe_new_location = maybe_new_location === '' ? loc : maybe_new_location;
  let hd = 'error';
  try {
    res = await hourly(loc);

    if ('error' in res) {
      // 에러 결과
      1 / 0;
    } else {
      // 정상 결과
      hd = res.data;
    }
  } catch (exc) {
    hd = 'error';
  }

  // assemble
  let ret = '';

  if (cd === 'error') {
    ret += `${null}, ${null}, ${null}\n${null} ${null}°C ${null} rh ${null}\n`;
  } else {
    const cdco = cd['current_observation'];
    ret += `${cdco['observation_time_rfc822']
      .split(' ')[0]
      .substring(-1)}, ${null}, ${
      cdco['display_location']['full']
    }\n${null} ${null}°C ${null} rh ${null}\n`;
  }

  if (hd === 'error') {
    ret += '{} {}°C{}\n';
  } else {
    ret += 'LOGIC\n';
  }

  return ret;
};

// export { condition };
module.exports = { condition, hourly, weather };
