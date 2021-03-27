'use strict';
const { default: axios } = require('axios');
const self = {};

self.req = async (hostname, port, url) => {
  try {
    // return await axios.get('http://localhost:3000/arduino/11');
    return await axios.get('http://' + hostname + ':' + port + url);
  } catch (error) {
    console.error(error);
  }
};

module.exports = self;
