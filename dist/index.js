"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("./utils/common");

var _path = require("path");

// 命令行命名拿到后，控制主流程
let apply = (action, ...args) => {
  (0, _common.betterRequire)((0, _path.resolve)(__dirname, `./${action}`))(...args);
};

var _default = apply;
exports.default = _default;