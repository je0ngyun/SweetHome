'use strict';
const random = require('randomstring');
//인증코드 발급
class authCode {
  static code = null;
  static createCode() {
    authCode.code = random.generate({
      length: 7,
      capitalization: 'lowercase',
    });
    setTimeout(this.initCode, 5000);
    return authCode.code;
  }
  static getCode() {
    return authCode.code;
  }
  static initCode() {
    authCode.code = '222';
  }
}

module.exports = authCode;
