'use strict';
const random = require('randomstring');
//인증코드 발급
class authCode {
  static code = null;
  static createCode() {
    authCode.code = random.generate({
      length: 6,
      charset: 'numeric',
    });
    setTimeout(this.initCode, 380000); //인증유효시간 3분
    return authCode.code;
  }
  static getCode() {
    return authCode.code;
  }
  static initCode() {
    authCode.code = null; //코드만료시 null
  }
}

module.exports = authCode;
