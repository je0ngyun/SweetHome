'use strict';
const { default: axios } = require('axios');
const self = {};

self.req = async (hostname, port, source, body) => {
  let url = `http://${hostname}:${port}/${source}?${getQueryStr(body)}`;
  let response = {};
  try {
    response = await axios.get(url, {
      withCredentials: true,
    });
  } catch (ex) {
    response.data = 'disconnect';
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
