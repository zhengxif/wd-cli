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

var _metalsmith = _interopRequireDefault(require("metalsmith"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ncpPromisify = (0, _util.promisify)(_ncp.default);

let {
  render
} = require('consolidate').ejs;

render = (0, _util.promisify)(render);

let create = async projectName => {
  try {
    let waitFnLoading = (fn, message) => async (...args) => {
      let loading = (0, _ora.default)(message);
      loading.start();
      let res = await fn(...args);
      loading.succeed('下载完成');
      return res;
    }; // 选择下载模版
    // 获取模版信息（有哪些模版）
    // 1）选择模版


    let list = await waitFnLoading(_git.repoList, '下载模版列表。。。')();

    if (!list) {
      console.log('下载模版出问题了');
      return;
    }

    list = list && list.map(({
      name
    }) => name);
    let answer = await _inquirer.default.prompt([{
      type: 'list',
      name: 'project',
      choices: list,
      message: '请选择一个模版'
    }]); // // 项目名

    let project = answer.project; // 2）选择版本
    // 版本列表
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
    // 3）下载模版存到临时目录

    let dest = await waitFnLoading(_git.downloadLoacal, '下载模版中。。。')(project); // 判断是否有询问文件ask.js

    if (!_fs.default.existsSync(_path.default.join(dest, 'ask.js'))) {
      // 简单模版
      // 4）拷贝操作
      await ncpPromisify(dest, _path.default.resolve(projectName));
    } else {
      // 复杂模版
      // 1）让用户填写信息
      await new Promise((resolve, reject) => {
        (0, _metalsmith.default)(__dirname) // 如果你传入路径，会默认遍历当前路径下的src文件夹
        .source(dest) // 传入了该参数，会导致__dirname路径失效
        .destination(_path.default.resolve(projectName)) // 到该模版编译
        .use(async (files, metal, done) => {
          // 使用中间件
          let args = require(_path.default.join(dest, 'ask.js'));

          let res = await _inquirer.default.prompt(args); // 用户填写的结果

          let meta = metal.metadata();
          Object.assign(meta, res);
          delete files['ask.js'];
          done();
        }).use((files, metal, done) => {
          let obj = metal.metadata();
          let {
            eslint,
            typescript
          } = obj;
          Object.keys(files).forEach(async file => {
            // 处理有模版的文件
            if (file.includes('js') || file.includes('json')) {
              let content = files[file].contents.toString();

              if (content.includes('<%')) {
                content = await render(content, obj);
                files[file].contents = Buffer.from(content); // 渲染完模版重新赋值，会自动输出到path.resolve(projectName)

                if (file === 'package-template.json') {
                  files['package.json'].content = Buffer.from(content);
                  delete files['package-template.json'];
                }
              }
            }
          });

          if (!eslint) {
            delete files['.eslintignore'];
            delete files['.eslintrc.json'];
            files['lint-result.html'] && delete files['lint-result.html'];
          }

          if (!typescript) {
            delete files['tsconfig.json'];
          }

          done();
        }).build(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }); // 2）用用户填写的信息去渲染模版
    }
  } catch (error) {
    console.log(error);
    loading.fail('下载失败');
  }
};

var _default = create;
exports.default = _default;