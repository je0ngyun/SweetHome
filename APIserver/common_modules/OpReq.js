'use strict';
class OpReq {
  //아두이노 동작 요청 클래스
  constructor(param) {
    this.mid = param;
  }
  getmid() {
    return this.mid;
  }
}

module.exports = OpReq;
