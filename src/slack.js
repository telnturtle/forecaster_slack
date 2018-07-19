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

// for test
curl(
  '안녕하세요 js 입니다. 윈도우 로컬에 있습니다. url 입력 테스트. ' + Date()
).then(res => {
  console.log(res.data);
});
