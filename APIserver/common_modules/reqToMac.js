'use strict';
const { default: axios } = require('axios');
const self = {};

self.req = async (hostname, port, mid) => {
  let response = {};
  try {
    let url = 'http://' + hostname + ':' + port + '/' + mid;
    response = await axios.get(url);
  } catch (ex) {
    response.data = '404';
    console.log(response.data);
    return response;
  }
  return response;
};

module.exports = self;
