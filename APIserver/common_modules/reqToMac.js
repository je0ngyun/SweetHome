'use strict';
const { default: axios } = require('axios');
const self = {};

self.req = async (hostname, port, url) => {
  let response = {};
  try {
    response = await axios.get('http://' + hostname + ':' + port + url);
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
