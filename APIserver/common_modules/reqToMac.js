'use strict';
const { default: axios } = require('axios');
const self = {};

self.req = async (hostname, port, mid) => {
  let response = {};
  try {
    let url = 'http://' + hostname + ':' + port + '/' + mid;
    response = await axios.get(url);
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      response.data = '404';
      return response;
    } else {
      // unexpected
      console.log(ex);
      return;
    }
  }
  return response;
};

module.exports = self;
