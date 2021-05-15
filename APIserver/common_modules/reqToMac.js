'use strict';
const { default: axios } = require('axios');
const self = {};

self.req = async (hostname, port, source, body) => {
  try {
    let url = `http://${hostname}:${port}/${source}?${getQueryStr(body)}`;
    let response = {};
    response = await axios.get(url, {
      withCredentials: true,
    });
    return response;
  } catch (ex) {
    let response = {};
    response.data = 'disconnect';
    return response;
  }
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
