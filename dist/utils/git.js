"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLoacal = exports.repoList = exports.tagList = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _rc = require("./rc");

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

var _util = require("util");

var _constants = require("./constants");

var _del = _interopRequireDefault(require("del"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadGit = (0, _util.promisify)(_downloadGitRepo.default);

let fetch = async uri => {
  let config = {
    uri,
    methods: 'get',
    headers: {
      'user-agent': 'xxxx'
    }
  };

  try {
    let res = await (0, _requestPromise.default)(config);
    return JSON.parse(res);
  } catch (error) {
    console.log(error);
  }
}; // 获取版本号列表


let tagList = async repo => {
  let config = await (0, _rc.getAll)();
  let api = `https://api.github.com/repos/${config.registry}/${repo}/tags`;
  return await fetch(api);
}; // 获取仓库列表


exports.tagList = tagList;

let repoList = async () => {
  let config = await (0, _rc.getAll)();
  let api = `https://api.github.com/${config.type}/${config.registry}/repos`;
  return await fetch(api);
}; // 下载模版


exports.repoList = repoList;

let downloadLoacal = async (project, version) => {
  let config = await (0, _rc.getAll)();
  let api = `${config.registry}/${project}`;
  let dest = _constants.DOWNLOAD + '/' + project;

  if (version) {
    api += `#${version}`;
  }

  _del.default.sync([_constants.DOWNLOAD + '/'], {
    force: true
  });

  await downloadGit(api, dest);
  return dest;
};

exports.downloadLoacal = downloadLoacal;