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
 * @param {string} weekday
 */
const trans_weekday = weekday => {
  if (weekday === 'Sun') {
    return '일요일';
  } else if (weekday === 'Mon') {
    return '월요일';
  } else if (weekday === 'Tue') {
    return '화요일';
  } else if (weekday === 'Wed') {
    return '수요일';
  } else if (weekday === 'Thu') {
    return '목요일';
  } else if (weekday === 'Fri') {
    return '금요일';
  } else if (weekday === 'Sat') {
    return '토요일';
  } else {
    return '요일';
  }
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
    const res = await condition(loc);
    // console.log('res: ', res); // ok
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
            cd = res_;
          }
        })
        .catch(err => {
          1 / 0;
        });
    } else {
      // 정상 결과
      cd = res;
      // console.log('cd, res:', cd, res); // DEBUG
    }
  } catch (exc) {
    cd = 'error';
  }

  // get hourly data
  maybe_new_location = maybe_new_location === '' ? loc : maybe_new_location;
  let hd = 'error';
  try {
    const res = await hourly(loc);

    if ('error' in res) {
      // 에러 결과
      1 / 0;
    } else {
      // 정상 결과
      hd = res;
    }
  } catch (exc) {
    hd = 'error';
  }

  // assemble
  let ret = '';
  let prev_cond = '';

  // console.log('cd, hd: ', cd, hd);

  if (cd === 'error') {
    ret += `${null}, ${null}, ${null}\n${null} ${null}°C ${null} rh ${null}\n`;
  } else {
    const cdco = cd['current_observation'];
    const cdotrs = cdco['observation_time_rfc822'].split(' ');

    const wd = trans_weekday(cdotrs[0].slice(0, -1));
    const d = cdotrs[1];
    const city = cdco['display_location']['city'] === 'Seoul' ? '서울' : cdco['display_location']['city'];
    const time = cdotrs[4].slice(0, 5);
    const temp_c = parseInt(cdco['temp_c']);
    const cond = cdco['weather'];
    const rh = cdco['relative_humidity'];

    ret += `${wd}, ${d}, ${city}\n${time} ${temp_c}°C ${cond} rh ${rh}\n`;
    prev_cond = cdco['weather'];
  }

  if (hd === 'error') {
    ret += `${null} ${null}°C${null}\n`;
  } else {
    let temp = '';
    for (let hf of hd['hourly_forecast']) {
      const hffct = hf['FCTTIME'];
      const h = ('0' + hffct['hour']).slice(-2);
      if (!(parseInt(h) % 2 === 0 && h > 6)) {
        continue;
      }
      if (h > 20) {
        break;
      }
      // const _d = hffct['mday'];
      // const _w = hffct['weekday_name_abbrev'];
      // const _e = parseInt(hffct['epoch']);
      const temp_metric = parseInt(hf['temp']['metric']);
      let cond = hf['condition'];

      temp = cond;
      cond = cond !== prev_cond ? ' ' + cond : '';
      prev_cond = temp;

      ret += `${h} ${temp_metric}°c${cond}\n`;
    }
  }

  return ret;
};

// export { condition };
module.exports = { condition, hourly, weather };
