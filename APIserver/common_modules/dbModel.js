'use strict';

const db = require('../common_modules/dbConn');
const self = {};

self.errtest = async function (info) {
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
};

self.addUser = async function (info) {
  let dbResult = await db('user')
    .insert({
      id: info.userid,
      username: info.username,
      password: info.password, //추후 암호화
      mail: info.mail,
      phone_os: info.phone_os,
      phone_model: info.phone_model,
    })
    .then();
  return dbResult;
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
  let dbResult = await db('user')
    .select('id')
    .where('id', info.userid)
    .first()
    .then();
  return dbResult;
};

self.signin = async function (info) {
  let dbResult = await db('user')
    .select('password')
    .where('id', info.userid)
    .where('password', info.password)
    .first()
    .then();
  return dbResult;
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
      result: true,
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
      result: true,
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
    return {
      result: true,
      response: {
        success: true,
        message: '디바이스 등록 성공',
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

self.delDevice = async function (info) {
  try {
    await db('device_log')
      .where({
        userid: info.userid,
        deviceid: info.deviceid,
      })
      .delete()
      .then();
    let dbResult = await db('reg_device')
      .where({
        userid: info.userid,
        deviceid: info.deviceid,
      })
      .delete()
      .then();
    if (!dbResult) {
      return {
        result: false,
        response: {
          success: false,
          message: '디바이스 정보가 없습니다',
        },
      };
    }
    return {
      result: true,
      response: {
        success: true,
        message: '디바이스 삭제 성공',
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

self.idToMac = async function (info) {
  try {
    let dbResult = await db('reg_device')
      .select('mac', 'host')
      .where({
        userid: info.userid,
        deviceid: info.deviceid,
      })
      .first()
      .then();
    if (dbResult == undefined) {
      //탐색 실패시
      return {
        result: false,
        response: {
          success: false,
          message: '디바이스 정보가 없습니다',
        },
      };
    }
    return {
      result: true,
      response: { mac: dbResult.mac, host: dbResult.host },
    };
  } catch (ex) {
    console.log(ex);
  }
};

self.getDevices = async function (info) {
  try {
    let dbResult = await db('reg_device')
      .select('*')
      .where({
        userid: info.userid,
      })
      .then();
    if (dbResult == undefined) {
      return {
        result: false,
        response: {
          success: false,
          message: '등록된 디바이스가 없습니다',
        },
      };
    }
    return {
      result: true,
      response: {
        success: true,
        message: '등록된 디바이스 조회 성공',
        devices: dbResult,
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

self.getDeviceLog = async function (info) {
  try {
    let dbResult = await db('device_log')
      .select('*')
      .where({
        userid: info.userid,
        deviceid: info.deviceid,
      })
      .then();
    if (dbResult == undefined) {
      return {
        result: false,
        response: {
          success: false,
          message: '디바이스 로그가 없습니다',
        },
      };
    }
    return {
      result: true,
      response: {
        success: true,
        message: '디바이스 로그조회 성공',
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

module.exports = self;
