# 小程序脚手架
## 决解的问题
- 多次造轮子，项目升级
- 代码规范，无法统一
- 组件、业务组件，无法统一等等
- 重复性工作，繁琐而且浪费时间
- copy过来的模板容易存在无关的代码
- 项目中有很多需要配置的地方，容易忽略一些配置点，进而埋坑
- 人工操作永远都有可能犯错，建新项目时，总要花时间去排错
- 内部框架也在不停的迭代，人工建项目往往不知道框架最新的版本号是多少，使用旧版本的框架可能会重新引入一些bug

## 必备模块
以vue-cli为例：
- commamder: 参数解析
- inquirer: 交互式命令行工具
- download-git-repo: 在git中下载模版
- chalk: 粉笔帮我们在控制台画出各种各样的颜色
- metalsmith: 遍历读取所有文件，实现模版渲染, 类似的工具包还有Wintersmith、Assemble、Hexo
- consolidate: 统一模版引擎
- ora: 请求进度
- ncp: 拷贝文件
