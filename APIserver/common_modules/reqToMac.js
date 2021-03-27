'use strict';
const { default: axios } = require('axios');
const self = {};

self.req = async () => {
  try {
    return await axios.get('http://localhost:3000/arduino/11');
  } catch (error) {
    console.error(error);
  }
};

module.exports = self;
