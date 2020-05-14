"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _git = require("./utils/git");

var _ora = _interopRequireDefault(require("ora"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _ncp = _interopRequireDefault(require("ncp"));

var _util = require("util");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ncpPromisify = (0, _util.promisify)(_ncp.default);

let install = async () => {
  try {
    let waitFnLoading = (fn, message) => async (...args) => {
      let loading = (0, _ora.default)(message);
      loading.start();
      let res = await fn(...args);
      loading.succeed('下载完成');
      return res;
    }; // 选择下载模版
    // 获取模版信息（有哪些模版）


    let list = await waitFnLoading(_git.repoList, '下载魔棒列表。。。')();
    list = list && list.map(({
      name
    }) => name);
    let answer = await _inquirer.default.prompt([{
      type: 'list',
      name: 'project',
      choices: list,
      message: '请选择一个模版'
    }]); // // 项目名

    let project = answer.project; // 版本列表
    // list = await waitFnLoading(tagList, '下载标签列表中。。。')(project);
    // list = list.map(({name})=> name);
    // answer = await inquirer.prompt([
    //     {
    //         type: 'list',
    //         name: 'tag',
    //         choices: list,
    //         message: '请选择一个版本',
    //     }
    // ])
    // let tag = answer.tag;

    let dest = await waitFnLoading(_git.downloadLoacal, '下载模版中。。。')(project);
    console.log('下载地址:', dest); // 拿到了下载的目录，直接拷贝到当前执行的目录下即可

    await (0, _ncp.default)(dest, _path.default.resolve(project));
  } catch (error) {
    console.log(error);
    loading.fail('下载失败');
  }
};

var _default = install;
exports.default = _default;