'use strict';

const db = require('../common_modules/dbConn');
const self = {};

self.addUser = async function (info) {
  try {
    await db('user')
      .insert({
        id: info.userid,
        username: info.username,
        password: info.password, //추후 암호화
        mail: info.mail,
        phone_os: info.phone_os,
        phone_model: info.phone_model,
      })
      .then();
    return {
      result: true,
      response: { success: true, message: '회원가입 완료' },
    };
  } catch (ex) {
    console.log(ex);
    return {
      result: false,
      response: {
        success: false,
        message: '예상치 못한이유로 작업을 완료하지 못하였습니다',
        err: ex,
      },
    };
  }
};

self.delUser = async function (info) {
  try {
    let dbResult = await this.signin(info); //아이디 비번 검사를 위해 signin 선수행
    if (!dbResult.result) {
      return dbResult;
    }
    await db('device_log').where({ userid: info.userid }).delete().then();
    await db('user_log').where({ userid: info.userid }).delete().then();
    await db('reg_device').where({ userid: info.userid }).delete().then();
    await db('user')
      .where({
        id: info.userid,
      })
      .delete()
      .then();
    return {
      result: true,
      response: { success: true, message: '회원탈퇴 완료' },
    };
  } catch (ex) {
    console.log(ex);
    return {
      result: false,
      response: {
        success: false,
        message: '예상치 못한이유로 작업을 완료하지 못하였습니다',
        err: ex,
      },
    };
  }
};

self.idchecking = async function (info) {
  try {
    let dbResult = await db('user')
      .select('id')
      .where('id', info.userid)
      .first()
      .then();
    if (dbResult == undefined) {
      //동일아이디 없을때
      return {
        result: true,
        response: { success: true, message: '사용할 수 있는 아이디입니다' },
      };
    }
    return {
      result: false,
      response: { success: false, message: '사용할 수 없는 아이디입니다' },
    };
  } catch (ex) {
    console.log(ex);
    return {
      result: false,
      response: {
        success: false,
        message: '예상치 못한이유로 작업을 완료하지 못하였습니다',
        err: ex,
      },
    };
  }
};

self.signin = async function (info) {
  try {
    let dbResult = await db('user')
      .select('password')
      .where('id', info.userid)
      .first()
      .then();
    if (dbResult == undefined) {
      return {
        result: false,
        response: {
          success: false,
          message: '아이디나 비밀번호를 확인해주세요',
        },
      };
    }
    if (dbResult.password == info.password) {
      return {
        result: true,
        response: { success: true, message: '로그인 성공' },
      };
    }
    return {
      result: false,
      response: { success: false, message: '아이디나 비밀번호를 확인해주세요' },
    };
  } catch (ex) {
    console.log(ex);
    return {
      result: false,
      response: {
        success: false,
        message: '예상치 못한이유로 작업을 완료하지 못하였습니다',
        err: ex,
      },
    };
  }
};

self.getUserInfo = async function (info) {
  try {
    let dbResult = await db('user')
      .select('*')
      .where('id', info.userid)
      .first()
      .then();
    if (dbResult == undefined) {
      return {
        result: false,
        response: {
          success: false,
          message: '회원 정보가 없습니다',
        },
      };
    }
    return {
      result: false,
      response: {
        success: false,
        message: '회원정보 조회 성공',
        info: dbResult,
      },
    };
  } catch (ex) {
    console.log(ex);
    return {
      result: false,
      response: {
        success: false,
        message: '예상치 못한이유로 작업을 완료하지 못하였습니다',
        err: ex,
      },
    };
  }
};

self.getUserLog = async function (info) {
  try {
    let dbResult = await db('user_log')
      .select('*')
      .where('userid', info.userid)
      .first()
      .then();
    if (dbResult == undefined) {
      return {
        result: false,
        response: {
          success: false,
          message: '회원 로그가 없습니다',
        },
      };
    }
    return {
      result: false,
      response: {
        success: false,
        message: '회원로그 조회 성공',
        log: dbResult,
      },
    };
  } catch (ex) {
    console.log(ex);
    return {
      result: false,
      response: {
        success: false,
        message: '예상치 못한이유로 작업을 완료하지 못하였습니다',
        err: ex,
      },
    };
  }
};

self.setUserLog = async function (info) {
  try {
    await db('user_log')
      .insert({
        userid: info.userid,
        history: info.history,
      })
      .then();
  } catch (ex) {
    console.log(ex);
  }
};

self.setDeviceLog = async function (info) {
  try {
    await db('device_log')
      .insert({
        userid: info.userid,
        deviceid: info.deviceid,
        history: info.history,
      })
      .then();
  } catch (ex) {
    console.log(ex);
  }
};

self.addDevice = async function (info) {
  try {
    await db('reg_device')
      .insert({
        deviceid: info.deviceid,
        userid: info.userid,
        host: info.host,
        mac: info.mac,
      })
      .then();
    return true;
  } catch (ex) {
    console.log(ex);
    return false;
  }
};

self.delDevice = async function (info) {
  try {
    await db('device_log')
      .where({
        userid: info.userid,
        deviceid: info.deviceid,
      })
      .delete()
      .then();
    await db('reg_device')
      .where({
        userid: info.userid,
        deviceid: info.deviceid,
      })
      .delete()
      .then();
    return true;
  } catch (ex) {
    console.log(ex);
    return false;
  }
};

self.idToMac = async function (info) {
  try {
    let result = await db('reg_device')
      .select('mac', 'host')
      .where({
        userid: info.userid,
        deviceid: info.deviceid,
      })
      .first()
      .then();
    if (result == undefined) {
      //탐색 실패시
      return { result: false };
    }
    return { result: true, mac: result.mac, host: result.host };
  } catch (ex) {
    console.log(ex);
    return;
  }
};

self.getDeviceLog = async function (info) {
  try {
    let result = await db('device_log')
      .select('*')
      .where({
        userid: info.userid,
        deviceid: info.deviceid,
      })
      .first()
      .then();
    if (result == undefined) {
      console.log('시발');
      return { result: true, log: {} };
    }
    return { result: true, log: result };
  } catch (ex) {
    console.log(ex);
    return { result: false };
  }
};

module.exports = self;
