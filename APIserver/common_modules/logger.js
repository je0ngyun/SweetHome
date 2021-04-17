const appRoot = require('app-root-path'); // root 경로를 가져오기 위해 사용
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const util = require('util');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

const self = {};

self.readLog = async function (date) {
  const logPath = path.join(__dirname, `../logs/device-${date}.log`);
  const readFile = util.promisify(fs.readFile);
  let ret = await readFile(logPath, 'utf-8');
  return ret.slice(0, -2);
};
self.writeLog = async function (obj) {
  const date = moment().format('YYYY-MM-DD');
  const logPath = path.join(__dirname, `../logs/device-${date}.log`);
  const appendFile = util.promisify(fs.appendFile);
  await appendFile(logPath, `${JSON.stringify(obj)},\n`, 'utf-8');
};

module.exports = self;
