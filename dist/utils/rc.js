"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = exports.remove = exports.set = exports.get = void 0;

var _constants = require("./constants");

var _ini = require("ini");

var _util = require("util");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// RC是配置文件, DEFAULTS是默认的配置
// 转码解码工具
let exists = (0, _util.promisify)(_fs.default.exists);
let readFile = (0, _util.promisify)(_fs.default.readFile);
let writeFile = (0, _util.promisify)(_fs.default.writeFile);

let get = async k => {
  let has = await exists(_constants.RC);
  let opts;

  if (has) {
    opts = await readFile(_constants.RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    return opts[k];
  }

  return '';
};

exports.get = get;

let set = async (k, v) => {
  let has = await exists(_constants.RC);
  let opts;

  if (has) {
    opts = await readFile(_constants.RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    Object.assign(opts, {
      [k]: v
    });
  } else {
    opts = Object.assign(_constants.DEFAULTS, {
      [k]: v
    });
  }

  await writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
};

exports.set = set;

let remove = async k => {
  let has = await exists(_constants.RC);
  let opts;

  if (has) {
    opts = await readFile(_constants.RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    delete opts[k];
    await writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
  }
};

exports.remove = remove;

let getAll = async () => {
  let has = await exists(_constants.RC);
  let opts;

  if (has) {
    opts = await readFile(_constants.RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    return opts;
  }

  return {};
};

exports.getAll = getAll;