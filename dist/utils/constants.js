"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOWNLOAD = exports.DEFAULTS = exports.RC = exports.VERSION = void 0;

var _package = require("../../package.json");

const VERSION = _package.version; // 用户的根目录

exports.VERSION = VERSION;
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
const RC = `${HOME}/.wdclirc`; // RC配置下载(模版)的地方 给github的api来用的

exports.RC = RC;
const DEFAULTS = {
  registry: 'wd-cli',
  type: 'orgs'
}; // 下载模版的位置

exports.DEFAULTS = DEFAULTS;
const DOWNLOAD = `${HOME}/.templaterc`;
exports.DOWNLOAD = DOWNLOAD;