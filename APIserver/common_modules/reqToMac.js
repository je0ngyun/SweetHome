'use strict';
const { default: axios } = require('axios');
const self = {};

self.req = async (hostname, port, mid, body) => {
  let url =
    'http://' + hostname + ':' + port + '/' + mid + '?' + getQueryStr(body);
  let response = {};
  try {
    response = await axios.get(url, {
      withCredentials: true,
    });
  } catch (ex) {
    response.data = '404';
    console.log(response.data);
    return response;
  }
  return response;
};

function getQueryStr(body) {
  let ret = '';
  for (let i in body) {
    ret += i + '=' + body[i];
    ret += '&';
  }
  return ret.slice(0, ret.length - 1);
}

module.exports = self;
