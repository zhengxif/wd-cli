"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rc = require("./utils/rc");

// 专门管理.wdclirc文件 （当前用户的目录下）
let config = async (action, k, v) => {
  switch (action) {
    case 'get':
      if (k) {
        let key = await (0, _rc.get)(k);
        console.log(key);
      } else {
        let obj = await (0, _rc.getAll)();
        Object.keys(obj).forEach(key => {
          console.log(`${key}=${obj[key]}`);
        });
      }

      break;

    case 'set':
      await (0, _rc.set)(k, v);
      break;

    case 'remove':
      await (0, _rc.remove)(k);
      break;
  }
};

var _default = config;
exports.default = _default;