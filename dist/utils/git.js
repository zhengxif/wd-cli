"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLoacal = exports.download = exports.repoList = exports.tagList = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _rc = require("./rc");

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

let download = async (src, dest) => {
  // 仓库地址  存放地址
  return new Promise((resolve, reject) => {
    (0, _downloadGitRepo.default)(src, dest, err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

exports.download = download;

let downloadLoacal = async (project, version) => {
  let config = await (0, _rc.getAll)();
  let api = `${config.registry}/${project}`;

  if (version) {
    api += `#${version}`;
  }

  return await download(api, _constants.DOWNLOAD + '/' + project);
};

exports.downloadLoacal = downloadLoacal;