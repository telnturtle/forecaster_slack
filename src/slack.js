const axios = require('axios');
const { slack } = require('./_key');

const curl = async payload => {
  return axios({
    url: `https://hooks.slack.com/services/${slack}`,
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    data: { text: payload }
  });
};

module.exports = { curl };
