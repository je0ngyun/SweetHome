const appRoot = require('app-root-path'); // root 경로를 가져오기 위해 사용
const winston = require('winston'); // log 파일 작성
require('winston-daily-rotate-file');
const time = require('timers');

var transport = new winston.transports.DailyRotateFile({
  filename: `${appRoot}/logs/device-%DATE%.log`,
  maxsize: 1024,
  datePatten: 'YYYY-MM-DD-HH',
  timestamp: function () {
    var timezone = time.currentTimezone;
    var now = new time.Date();
    now.setTimezone(timezone);
    return now.toString();
  },
});

var logger = winston.createLogger({
  transports: [transport],
});

module.exports = logger;
